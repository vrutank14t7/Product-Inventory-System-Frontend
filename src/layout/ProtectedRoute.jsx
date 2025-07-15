import { Navigate } from "react-router-dom";
import { AppConfig } from "../config/AppConfig";

export const ProtectedRoute = ({
  children,
  permissions = [],
  moduleName,
  permissionType,
}) => {
  // Retrieve permissions from localStorage
  let token = localStorage.getItem(AppConfig.localStorageKeys.token);

  // Uncomment to enable protection logic
  return token ? children : <Navigate to="/authentication/login" />;
};
