import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permission: [],
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setPermissions: (state, action) => {
      state.permission = action.payload;
    },
    removePermissions: (state) => {
      state.permission = [];
    },
  },
});

export const { setPermissions, removePermissions } = permissionSlice.actions;
export default permissionSlice.reducer;
