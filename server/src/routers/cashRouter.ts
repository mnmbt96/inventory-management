import express from "express";
import {
  confirmCash,
  editCash,
  getCashHistory,
  registerCash,
  deleteCash,
} from "../controller/cashController";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/history", auth, getCashHistory);
router.post("/register", auth, registerCash);
router.put("/update", auth, confirmCash);
router.put("/edit", auth, editCash);
router.delete("/delete/:id", auth, deleteCash);

export default router;
