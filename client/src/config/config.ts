import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000",
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});
