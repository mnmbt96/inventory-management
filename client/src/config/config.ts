import axios from "axios";

export const API = axios.create({
  baseURL: "https://inventory-management-server-delta.vercel.app/",
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});
