import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = {
  position: "top-center",
  closeButton: false,
  progress: false,
};

export const showSuccessMessage = (message) => {
  toast.success(message, options);
};

export const showErrorMessage = (message) => {
  toast.error(message, options);
};

export const showWarningMessage = (message) => {
  toast.warn(message, options);
};

export const showInfoMessage = (message) => {
  toast.info(message, options);
};
