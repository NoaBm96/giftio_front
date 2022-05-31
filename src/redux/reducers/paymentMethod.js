import * as type from "../types";

const paymentMethodReducer = (paymentMethods = [], action) => {
  switch (action.type) {
    case type.CREATE_PAYMENTMETHOD:
      return [action.payload, ...paymentMethods];
    case type.GET_PAYMENTMETHODS:
      return action.payload;
    default:
      return paymentMethods;
  }
};

export default paymentMethodReducer;
