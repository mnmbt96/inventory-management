import { AUTH } from "../constants/actionType";
import { LOGOUT } from "../constants/actionType";
import { UserType, ActionType } from "../types/types";

const initialState: UserType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  _id: "",
};

const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
      return { ...state, ...action?.payload };

    case LOGOUT:
      localStorage.clear();
      return { initialState };

    default:
      return state;
  }
};

export default authReducer;
