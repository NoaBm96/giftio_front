import * as type from "../types";

const loaderReducer = (loader = false, action) => {
  switch (action.type) {
    case type.LOADER:
      return action.payload;
    default:
      return loader;
  }
};

export default loaderReducer;
