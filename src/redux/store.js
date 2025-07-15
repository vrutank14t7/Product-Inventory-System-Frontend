import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import loadingReducer from "./slices/loadingSlice";
import themeReducer from "./slices/themeSlice";
import customizationReducer from "./slices/customizationSlice";
import permissionReducer from "./slices/permissionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    theme: themeReducer,
    customization: customizationReducer,
    permissions: permissionReducer,
  },
});
