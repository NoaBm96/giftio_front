import { failure, success } from "../../utils/notification";
import * as api from "../api";
import * as type from "../types";

export const getPaymentMethods = () => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.getPaymentMethods();
    if (status === 200) {
      dispatch({ type: type.GET_PAYMENTMETHODS, payload: data });
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};

export const createPaymentMethod = (paymentMethod) => async (dispatch) => {
  try {
    dispatch({ type: type.LOADER, payload: true });
    const { data, status } = await api.createPaymentMethod(paymentMethod);
    if (status === 200) {
      dispatch({ type: type.CREATE_PAYMENTMETHOD, payload: data });
      success("Saved");
      dispatch({ type: type.LOADER, payload: false });
    }
  } catch (error) {
    failure(error.message);
    dispatch({ type: type.LOADER, payload: false });
  }
};
