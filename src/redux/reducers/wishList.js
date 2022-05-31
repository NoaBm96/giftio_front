import * as type from "../types";

const wishListReducer = (wishLists = [], action) => {
  switch (action.type) {
    case type.CREATE_WISHLIST:
      return [action.payload, ...wishLists];
    case type.GET_WISHLISTS:
      return action.payload;
    case type.DELETE_WISHLIST:
      return wishLists.filter((wishList) => wishList._id !== action.payload);
    case type.UPDATE_WISHLIST:
      return wishLists.map((wishList) =>
        wishList._id === action.payload._id ? action.payload : wishList
      );
    default:
      return wishLists;
  }
};

export default wishListReducer;
