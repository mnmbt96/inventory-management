import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "./componetnts/Products/Products.tsx";
import Cash from "./componetnts/Cash/Cash.tsx";
import Auth from "./componetnts/Auth/Auth.tsx";
import Shift from "./componetnts/Shift/Shift.tsx";
import { DecodedToken } from "./types/types.ts";
import decode from "jwt-decode";

const localStorageUser = localStorage.getItem("user");
const user = localStorageUser !== null ? JSON.parse(localStorageUser) : "";

const HomeRedirect = () => {
  return user ? <Navigate to="/products" /> : <Navigate to="/auth" />;
};

const App = () => {
  useEffect(() => {
    if (user.token) {
      try {
        const decodedToken: DecodedToken = decode(user.token);
        const currentTime = new Date().getTime() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.clear();
        }
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
  }, [user.token, Navigate]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/search" element={<Products />} />
        <Route path="/cash" element={<Cash />} />
        <Route path="/shift" element={<Shift />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
