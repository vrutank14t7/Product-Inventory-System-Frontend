import { Navigate, Outlet } from "react-router-dom";
import { AppConfig } from "../../config/AppConfig";

const AuthLayout = () => {
  const isAuthenticated = localStorage.getItem(
    AppConfig.localStorageKeys.token
  );
  if (!isAuthenticated) {
    return <Navigate to="/authentication/login" />;
  } else {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default AuthLayout;
