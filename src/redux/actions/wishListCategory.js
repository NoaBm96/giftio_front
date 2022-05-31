import { failure, shipped, success } from "../../utils/notification";
import * as api from "../api";
import * as type from "../types";

export const getWishListCategories = () => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.getWishListCategories();
    if (status === 200) {
      dispatch({ type: type.GET_WISHLISTCATEGORIES, payload: data });
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};

export const getFriendWishListCategories = (id) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.getFriendWishListCategories(id);
    if (status === 200) {
      dispatch({ type: type.GET_WISHLISTCATEGORIES, payload: data });
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};

export const createWishListCategory =
  (wishListCategory) => async (dispatch) => {
    try {
      dispatch({ type: type.LOADER, payload: true });
      const { data, status } = await api.createWishListCategory(
        wishListCategory
      );
      if (status === 200) {
        dispatch({ type: type.CREATE_WISHLISTCATEGORY, payload: data });
        success("Saved");
        dispatch({ type: type.LOADER, payload: false });
      }
    } catch (error) {
      failure(error.message);
      dispatch({ type: type.LOADER, payload: false });
    }
  };

export const updateWishListCategory =
  (id, wishListCategory) => async (dispatch) => {
    try {
      dispatch({ type: type.LOADER, payload: true });
      const { data, status } = await api.updateWishListCategory(
        id,
        wishListCategory
      );
      if (status === 200) {
        dispatch({ type: type.UPDATE_WISHLISTCATEGORY, payload: data });
        success("Updated");
        dispatch({ type: type.LOADER, payload: false });
      }
    } catch (error) {
      failure(error.message);
      dispatch({ type: type.LOADER, payload: false });
    }
  };

export const deleteWishListCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { status } = await api.deleteWishListCategory(id);
    if (status === 200) {
      dispatch({ type: type.DELETE_WISHLISTCATEGORY, payload: id });
      success("Deleted");
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};

export const shipWishListCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { status } = await api.deleteWishListCategory(id);
    if (status === 200) {
      dispatch({ type: type.DELETE_WISHLISTCATEGORY, payload: id });
      shipped();
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};
