import { failure, success } from "../../utils/notification";
import * as api from "../api";
import * as type from "../types";

export const getWishLists = () => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.getWishLists();
    if (status === 200) {
      dispatch({ type: type.GET_WISHLISTS, payload: data });
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};

export const getFriendWishLists = (id) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.getFriendWishLists(id);
    if (status === 200) {
      dispatch({ type: type.GET_WISHLISTS, payload: data });
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};

export const createWishList = (wishList) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.createWishList(wishList);
    if (status === 200) {
      dispatch({ type: type.CREATE_WISHLIST, payload: data });
      success("Saved");
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};

export const updateWishList = (id, wishList) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.updateWishList(id, wishList);
    if (status === 200) {
      dispatch({ type: type.UPDATE_WISHLIST, payload: data });
      success("Updated");
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};

export const deleteWishList = (id) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { status } = await api.deleteWishList(id);
    if (status === 200) {
      dispatch({ type: type.DELETE_WISHLIST, payload: id });
      success("Deleted");
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};
