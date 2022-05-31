import * as type from "../types";

const authReducer = (state = [], action) => {
  switch (action.type) {
    case type.AUTH: {
      sessionStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...action.payload };
    }
    case type.LOGOUT: {
      sessionStorage.removeItem("profile");
      return [];
    }
    default:
      return state;
  }
};

export default authReducer;
