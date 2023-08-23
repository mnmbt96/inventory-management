export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  initials: string;
  color: string;
  _id: string;
};

export const initialUserState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  initials: "",
  color: "",
  _id: "",
};

export interface DecodedToken {
  exp: number;
}

export interface ActionType {
  data: any;
  type: string;
  payload?: any;
}

export interface MoneyType {
  name: any;
  value: number;
  quantity: number;
  totalAmount: number;
}

export const initialDollars: MoneyType[] = [
  { name: "$100", value: 100, quantity: 0, totalAmount: 0 },
  { name: "$50", value: 50, quantity: 0, totalAmount: 0 },
  { name: "$20", value: 20, quantity: 0, totalAmount: 0 },
  { name: "$10", value: 10, quantity: 0, totalAmount: 0 },
  { name: "$5", value: 5, quantity: 0, totalAmount: 0 },
  { name: "$2", value: 2, quantity: 0, totalAmount: 0 },
  { name: "$1", value: 1, quantity: 0, totalAmount: 0 },
];

export const initialCents: MoneyType[] = [
  { name: "$0.25", value: 0.25, quantity: 0, totalAmount: 0 },
  { name: "$0.10", value: 0.1, quantity: 0, totalAmount: 0 },
  { name: "$0.05", value: 0.05, quantity: 0, totalAmount: 0 },
];

export interface SavedMoneyHistoryType {
  _id: string;
  customers: number;
  dollars: MoneyType[];
  cents: MoneyType[];
  total: number;
  create: { date: string; time: string; user: UserType };
  update: { date: string; time: string; user: UserType };
}

export const initialCashState: SavedMoneyHistoryType = {
  _id: "",
  customers: 0,
  dollars: initialDollars,
  cents: initialCents,
  total: 0,
  create: {
    date: "",
    time: "",
    user: initialUserState,
  },
  update: {
    date: "",
    time: "",
    user: initialUserState,
  },
};

export interface ProductType {
  _id: string;
  name: string;
  categories: string[];
  date: string;
  memo: string;
  image: string;
  status: string;
  discount: number;
}

export const initialProductState: ProductType = {
  _id: "",
  name: "",
  categories: [],
  date: "",
  memo: "",
  image: "",
  status: "",
  discount: 0,
};

export const categories = [
  { name: "Snack", value: "snack" },
  { name: "Candy", value: "candy" },
  { name: "Gummies", value: "gummies" },
  { name: "Gum", value: "gum" },
  { name: "Cookies & Buiscuits", value: "cookiesBuiscuits" },
  { name: "Chocolate", value: "chocolate" },
  { name: "Instant Noodle", value: "instantNoodle" },
  { name: "Cosmetics", value: "cosmetics" },
  { name: "Daily Use", value: "dailyUse" },
  { name: "Miscellaneous", value: "miscellaneous" },
];
