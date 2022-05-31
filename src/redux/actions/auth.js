import { failure, loginSuccess, warning } from "../../utils/notification";
import * as api from "../api";
import * as type from "../types";

export const signin = (user, navigate) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.signin(user);
    if (status === 200) {
      dispatch({ type: type.AUTH, payload: data });
      navigate("/");
      loginSuccess();
    } else {
      warning(data.message);
    }
    dispatch({ type: type.LOADER, payload: false });
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};

export const signup = (user, navigate) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.signup(user);
    if (status === 200) {
      dispatch({ type: type.AUTH, payload: data });
      navigate("/");
      loginSuccess();
    } else {
      warning(data.message);
    }
    dispatch({ type: type.LOADER, payload: false });
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};
