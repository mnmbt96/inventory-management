import { combineReducers } from "redux";
import authReducer from "./authReducer.ts";
import cashReducers from "./cashReducers.ts";
import productsReducers from "./productsReducers.ts";
import loadingReducers from "./loadingReducers.ts";

export default combineReducers({
  authReducer,
  cashReducers,
  productsReducers,
  loadingReducers,
});
