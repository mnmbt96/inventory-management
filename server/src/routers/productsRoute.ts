import express from "express";
import {
  registerProduct,
  getProductList,
  editProduct,
  deleteProduct,
  getProductBySearch,
} from "../controller/productsController";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/list", auth, getProductList);
router.get("/search", auth, getProductBySearch);
router.post("/register", auth, registerProduct);
router.put("/edit", auth, editProduct);
router.delete("/delete/:id", auth, deleteProduct);

export default router;
