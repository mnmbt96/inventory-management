import mongoose from "mongoose";

const cashSchema = new mongoose.Schema({
  dollars: { type: Array, required: true },
  cents: { type: Array, required: true },
  customers: { type: Number, required: true },
  total: { type: Number, required: true },
  create: { type: Object, required: true },
  update: { type: Object, required: false },
});

export default mongoose.model("Cash", cashSchema);
