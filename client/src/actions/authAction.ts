import { SavedMoneyHistoryType, UserType } from "../types/types.ts";
import {
  AUTH,
  GET_CASH_HISTORIES,
  REGISTER_CASH_AMOUNT,
  CONFIRM_CASH_AMOUNT,
  EDIT_CASH_AMOUNT,
  DELETE_CASH,
} from "../constants/actionType.ts";

export const auth = (data: UserType) => {
  return { type: AUTH, payload: data };
};

export const getCashHistories = (data: SavedMoneyHistoryType) => {
  return { type: GET_CASH_HISTORIES, payload: data };
};

export const registerCashAmount = (data: SavedMoneyHistoryType) => {
  return { type: REGISTER_CASH_AMOUNT, payload: data };
};

export const confirmCashAmount = (data: SavedMoneyHistoryType) => {
  return { type: CONFIRM_CASH_AMOUNT, payload: data };
};

export const editCashAmount = (data: SavedMoneyHistoryType) => {
  return { type: EDIT_CASH_AMOUNT, payload: data };
};

export const deleteCash = (id: string) => {
  return { type: DELETE_CASH, payload: id };
};
