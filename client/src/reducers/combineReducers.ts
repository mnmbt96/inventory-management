import { combineReducers } from "redux";
import authReducer from "./authReducer.ts";
import cashReducer from "./cashReducers.ts";

export default combineReducers({ authReducer, cashReducer });
