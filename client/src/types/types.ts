export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ActionType {
  data: any;
  type: string;
  payload?: any;
}

export interface MoneyType {
  name: string;
  value: number;
}
