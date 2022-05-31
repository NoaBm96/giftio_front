import * as type from "../types";

const friendReducer = (friends = [], action) => {
  switch (action.type) {
    case type.CREATE_FRIEND:
      return [action.payload, ...friends];
    case type.GET_FRIENDS:
      return action.payload;
    case type.DELETE_FRIEND:
      return friends.filter((friend) => friend._id !== action.payload);
    default:
      return friends;
  }
};

export default friendReducer;
