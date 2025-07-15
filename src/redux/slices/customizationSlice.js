export const initialState = {
  isOpen: "dashboard",
  navType: "",
};

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const MENU_OPEN = "@customization/MENU_OPEN";
export const MENU_TYPE = "@customization/MENU_TYPE";

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_OPEN:
      return {
        ...state,
        isOpen: action.isOpen,
      };
    case MENU_TYPE:
      return {
        ...state,
        navType: action.navType,
      };
    default:
      return state;
  }
};

export default customizationReducer;
