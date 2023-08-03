import { UserType } from "../types/types.ts";
import { AUTH } from "../constants/actionType.ts";

export const auth = (data: UserType) => {
  return { type: AUTH, payload: data };
};
