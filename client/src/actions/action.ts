import {
  ProductType,
  SavedMoneyHistoryType,
  UserType,
} from "../types/types.ts";
import {
  AUTH,
  GET_CASH_HISTORIES,
  REGISTER_CASH_AMOUNT,
  CONFIRM_CASH_AMOUNT,
  EDIT_CASH_AMOUNT,
  DELETE_CASH,
  REGISTER_PRODUCT,
  GET_PRODUCT_LIST,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CHANGE_STATUS,
  CHANGE_DISCOUNT,
  GET_PRODUCT_BY_SEARCH,
  START_LOADING,
  END_LOADING,
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

export const registerProduct = (data: ProductType) => {
  return { type: REGISTER_PRODUCT, payload: data };
};

export const getProductList = (data: ProductType[]) => {
  return { type: GET_PRODUCT_LIST, payload: data };
};

export const editProduct = (data: ProductType) => {
  return { type: EDIT_PRODUCT, payload: data };
};

export const changeStatus = (id: string, status: string) => {
  return { type: CHANGE_STATUS, payload: { id, status } };
};

export const changeDiscount = (
  id: string,
  status: string,
  discount: number
) => {
  return { type: CHANGE_DISCOUNT, payload: { id, status, discount } };
};

export const deleteProduct = (id: string) => {
  return { type: DELETE_PRODUCT, payload: id };
};

export const getProductBySearch = (searchQuery: undefined) => {
  return { type: GET_PRODUCT_BY_SEARCH, payload: { searchQuery } };
};

export const startLoading = (isLoading: boolean) => {
  return { type: START_LOADING, payload: isLoading };
};

export const endLoading = (isLoading: boolean) => {
  return { type: END_LOADING, payload: isLoading };
};
