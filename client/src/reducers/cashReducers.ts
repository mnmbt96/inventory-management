import {
  GET_CASH_HISTORIES,
  REGISTER_CASH_AMOUNT,
  CONFIRM_CASH_AMOUNT,
  EDIT_CASH_AMOUNT,
  DELETE_CASH,
} from "../constants/actionType";
import { ActionType, SavedMoneyHistoryType } from "../types/types";

const initialState: SavedMoneyHistoryType[] = [];

const cashReducers = (state = initialState, action: ActionType) => {
  let newCashArray = [];

  switch (action.type) {
    case GET_CASH_HISTORIES:
      return [...action?.payload];

    case REGISTER_CASH_AMOUNT:
      return [...state, action.payload];

    case CONFIRM_CASH_AMOUNT:
      newCashArray = state.map((item) =>
        item._id === action.payload._id
          ? { ...item, update: action.payload.update }
          : item
      );
      return newCashArray;

    case EDIT_CASH_AMOUNT:
      newCashArray = state.map((item) =>
        item._id === action.payload._id
          ? {
              ...item,
              dollars: action.payload.dollars,
              cents: action.payload.cents,
              customers: action.payload.customers,
              total: action.payload.total,
            }
          : item
      );
      return newCashArray;

    case DELETE_CASH:
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};

export default cashReducers;
