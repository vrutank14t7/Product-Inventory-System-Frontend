import { AppConfig } from "../config/AppConfig";

export const createProductOptions = (products = [], name = "product_name") => {
  return products.map((product) => ({
    value: product._id,
    label: product[name],
  }));
};
export const createGeneralOptions = (
  products = [],
  name = "product_name",
  value = "_id"
) => {
  return products.map((product) => ({
    value: product[value],
    label: product[name],
  }));
};

export const objectToFormData = (formData, data, parentKey = null) => {
  if (data instanceof FileList) {
    // Handle FileList
    for (let i = 0; i < data.length; i++) {
      const key = parentKey ? `${parentKey}[${i}]` : `${i}`;
      formData.append(key, data[i]);
    }
  } else if (Array.isArray(data)) {
    // Handle arrays
    for (let i = 0; i < data.length; i++) {
      const key = parentKey ? `${parentKey}[${i}]` : `${i}`;
      objectToFormData(formData, data[i], key);
    }
  } else if (typeof data === "object" && data !== null) {
    // Check if the object is a file
    if (data instanceof File) {
      formData.append(parentKey, data);
    } else {
      // Handle nested objects
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const newKey = parentKey ? `${parentKey}.${key}` : key;
          objectToFormData(formData, data[key], newKey);
        }
      }
    }
  } else {
    // Handle normal data
    formData.append(parentKey, data);
  }
};

export const saveLoginData = (
  permissions,
  refresh_token,
  token,
  user,
  login_credentials = null,
  language = AppConfig.language.default
) => {
  if (login_credentials) {
    localStorage.setItem(
      AppConfig.localStorageKeys.login_credentials,
      JSON.stringify(login_credentials)
    );
  }
  if (permissions) {
    localStorage.setItem(
      AppConfig.localStorageKeys.permissions,
      JSON.stringify(permissions)
    );
  }
  if (refresh_token) {
    localStorage.setItem(
      AppConfig.localStorageKeys.refresh_token,
      refresh_token
    );
  }
  if (token) {
    localStorage.setItem(AppConfig.localStorageKeys.token, token);
  }
  if (user) {
    localStorage.setItem(AppConfig.localStorageKeys.user, JSON.stringify(user));
  }
  if (language) {
    localStorage.setItem(AppConfig.localStorageKeys.language, language);
  }
};

export const getPermission = () => {
  const permissions = localStorage.getItem(
    AppConfig.localStorageKeys.permissions
  );
  if (permissions) {
    return JSON.parse(permissions);
  }
  return null;
};

export const clearLocalStorage = (login_credentials = false) => {
  if (login_credentials) {
    localStorage.removeItem(AppConfig.localStorageKeys.login_credentials);
  }
  localStorage.removeItem(AppConfig.localStorageKeys.permissions);
  localStorage.removeItem(AppConfig.localStorageKeys.refresh_token);
  localStorage.removeItem(AppConfig.localStorageKeys.token);
  localStorage.removeItem(AppConfig.localStorageKeys.user);
  localStorage.removeItem(AppConfig.localStorageKeys.language);
};

export const formatErrorObject = (errorObj) => {
  const formattedErrors = {};

  Object.keys(errorObj).forEach((key) => {
    const parts = key.split(".");
    let currentLevel = formattedErrors;

    // Traverse or create nested objects based on the key parts
    parts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = index === parts.length - 1 ? errorObj[key] : {};
      }
      currentLevel = currentLevel[part];
    });
  });
  return formattedErrors;
};

export const hasPermission = (permissions, moduleName, permissionType) => {
  const module = permissions?.find((perm) => perm.module_name === moduleName);
  return module ? module[permissionType] : false;
};

export const hasMenuPermission = (moduleName, permissionType, permissions) => {
  const module = permissions?.find((perm) => perm.module_name === moduleName);
  return module ? module[permissionType] : false;
};

export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

export const snakeToTitleCase = (snakeCaseStr) => {
  if (!snakeCaseStr) return "";
  const words = snakeCaseStr.split("_");
  const titleCaseStr = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return titleCaseStr;
};

export const calculateStandardQty = (
  base_unit = "",
  quantity = 0,
  size = 1
) => {
  let std_qty = "";
  quantity = parseFloat(quantity);

  // Check if quantity is a valid number
  if (isNaN(quantity)) {
    return "";
  }

  // Check if base_unit is provided
  if (!base_unit) {
    return "";
  }

  switch (base_unit) {
    case "GM":
      std_qty = ((quantity * size) / 1000).toFixed(2) + " KG";
      break;
    case "ML":
      std_qty = ((quantity * size) / 1000).toFixed(2) + " LTR";
      break;
    case "KG":
      std_qty = (quantity * size).toFixed(2) + " KG";
      break;
    case "LTR":
      std_qty = (quantity * size).toFixed(2) + " LTR";
      break;
    case "EACH":
      std_qty = (quantity * size).toFixed(2) + " EACH";
      break;
    default:
      std_qty = (quantity * size).toString();
  }

  return std_qty;
};

export const capitalizeWords = (str) => {
  return str.toUpperCase(); // Convert the entire string to uppercase
};
