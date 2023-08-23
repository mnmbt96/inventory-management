import { END_LOADING, START_LOADING } from "../constants/actionType";
import { ActionType } from "../types/types";

const initialState = { isLoading: false };

const loadingReducers = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case START_LOADING:
      return { isLoading: true };

    case END_LOADING:
      return { isLoading: false };

    default:
      return state;
  }
};

export default loadingReducers;
