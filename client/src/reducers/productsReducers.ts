import {
  REGISTER_PRODUCT,
  GET_PRODUCT_LIST,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CHANGE_STATUS,
  CHANGE_DISCOUNT,
} from "../constants/actionType";
import { ActionType, ProductType } from "../types/types";

const initialState: ProductType[] = [];

const productsReducers = (state = initialState, action: ActionType) => {
  let newProductArr;
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return [...action?.payload];
    case REGISTER_PRODUCT:
      return [...state, action.payload];
    case EDIT_PRODUCT:
      newProductArr = state.map((item) =>
        item._id === action.payload._id
          ? {
              ...item,
              name: action.payload.name,
              categories: action.payload.categories,
              image: action.payload.image,
              memo: action.payload.memo,
            }
          : item
      );
      return newProductArr;
    case CHANGE_STATUS:
      newProductArr = state.map((item) =>
        item._id === action.payload.id
          ? {
              ...item,
              status: action.payload.status,
            }
          : item
      );
      return newProductArr;
    case CHANGE_DISCOUNT:
      newProductArr = state.map((item) =>
        item._id === action.payload.id
          ? {
              ...item,
              status: action.payload.status,
              discount: action.payload.discount,
            }
          : item
      );
      return newProductArr;
    case DELETE_PRODUCT:
      return state.filter((product) => product._id !== action.payload);
    default:
      return state;
  }
};

export default productsReducers;
