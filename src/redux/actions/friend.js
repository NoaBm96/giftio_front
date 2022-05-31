import { failure, success } from "../../utils/notification";
import * as api from "../api";
import * as type from "../types";

export const getFriends = () => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.getFriends();
    if (status === 200) {
      dispatch({ type: type.GET_FRIENDS, payload: data });
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};

export const createFriend = (friend) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.createFriend(friend);
    if (status === 200) {
      dispatch({ type: type.CREATE_FRIEND, payload: data });
      success("Saved");
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};

export const deleteFriend = (id) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { status } = await api.deleteFriend(id);
    if (status === 200) {
      dispatch({ type: type.DELETE_FRIEND, payload: id });
      success("Deleted");
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};
