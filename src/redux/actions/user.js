import { failure } from "../../utils/notification";
import * as api from "../api";
import * as type from "../types";

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.getUsers();
    if (status === 200) {
      dispatch({ type: type.GET_USERS, payload: data });
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};
