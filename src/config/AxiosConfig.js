import axios from "axios";
import AxiosInstancePaths from "./AxiosInstancePaths";
import { AppConfig } from "./AppConfig";
import { clearLocalStorage } from "../helpers";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: AxiosInstancePaths.base_url,
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    Accept: "application/json, application/octet-stream",
  },
  withCredentials: false,
});

// Flag to check if the token is being refreshed
let isRefreshing = false;
let refreshSubscribers = [];

// Function to subscribe to token refresh
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

// Function to notify subscribers about new token
function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add the authorization token to the request headers if available
    const token = localStorage.getItem(AppConfig.localStorageKeys.token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.withCredentials = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    return response;
  },
  (error) => {
    const { config, response } = error;
    const originalRequest = config;
    if (response.data.message === "Token has expired") {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem(
          AppConfig.localStorageKeys.refresh_token
        );

        return axiosInstance
          .post(AxiosInstancePaths.refresh_token_url, { refreshToken })
          .then(({ data }) => {
            const new_token = data?.payload?.accessToken;

            localStorage.setItem(AppConfig.localStorageKeys.token, new_token);
            isRefreshing = false;
            onRefreshed(new_token);
            originalRequest.headers["Authorization"] = `Bearer ${new_token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            console.error("Failed to refresh token:", err);
            clearLocalStorage();
            window.location.href = AxiosInstancePaths.login_path;
            return Promise.reject(error);
          });
      }

      const retryOriginalRequest = new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });
      return retryOriginalRequest;
    }

    if (response.data.message === "Token is invalid") {
      clearLocalStorage();
      window.location.href = AxiosInstancePaths.login_path;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
