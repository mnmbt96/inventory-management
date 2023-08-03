import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./componetnts/Home/Home.tsx";
import Products from "./componetnts/Products/Products.tsx";
import Cash from "./componetnts/Cash/Cash.tsx";
import Auth from "./componetnts/Auth/Auth.tsx";
import Shift from "./componetnts/Shift/Shift.tsx";

interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// // TEST DATA
// const userInfo: UserType = {
//   _id: "123",
//   firstName: "Manami",
//   lastName: "Batai",
//   email: "batai@gmail.com",
//   password: "123",
// };

// localStorage.setItem("user", JSON.stringify(userInfo));

// localStorage.clear();

const user: UserType | null = JSON.parse(
  localStorage.getItem("user") ?? "null"
);

const HomeRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    user?._id ? navigate("/home") : navigate("/auth");
  }, [navigate]);
  return <div>Redirecting to home...</div>;
};

// const user = JSON.parse(localStorage.getItem("user") ?? "{}");

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cash" element={<Cash />} />
        <Route path="/shift" element={<Shift />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
