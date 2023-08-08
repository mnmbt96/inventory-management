import express from "express";
import {
  confirmCash,
  editCash,
  getCashHistory,
  registerCash,
  deleteCash,
} from "../controller/cashController";

const router = express.Router();

router.get("/history", getCashHistory);
router.post("/register", registerCash);
router.put("/update", confirmCash);
router.put("/edit", editCash);
router.delete("/delete/:id", deleteCash);

export default router;
