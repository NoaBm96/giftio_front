import * as type from "../types";

const wishListCategoryReducer = (wishListCategories = [], action) => {
  switch (action.type) {
    case type.CREATE_WISHLISTCATEGORY:
      return [action.payload, ...wishListCategories];
    case type.GET_WISHLISTCATEGORIES:
      return action.payload;
    case type.DELETE_WISHLISTCATEGORY:
      return wishListCategories.filter(
        (wishListCategory) => wishListCategory._id !== action.payload
      );
    case type.UPDATE_WISHLISTCATEGORY:
      return wishListCategories.map((wishListCategory) =>
        wishListCategory._id === action.payload._id
          ? action.payload
          : wishListCategory
      );
    default:
      return wishListCategories;
  }
};

export default wishListCategoryReducer;
