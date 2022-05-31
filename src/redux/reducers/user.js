import * as type from "../types";

const userReducer = (users = [], action) => {
  switch (action.type) {
    case type.GET_USERS:
      return action.payload;
    default:
      return users;
  }
};

export default userReducer;
