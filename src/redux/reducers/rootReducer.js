import authReducer from "./auth";
import wishListReducer from "./wishList";
import userReducer from "./user";
import friendReducer from "./friend";
import wishListCategoryReducer from "./wishListCategory";
import loaderReducer from "./loader";
import paymentMethodReducer from "./paymentMethod";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  authReducer,
  wishListReducer,
  userReducer,
  friendReducer,
  wishListCategoryReducer,
  loaderReducer,
  paymentMethodReducer,
});

export default rootReducer;
