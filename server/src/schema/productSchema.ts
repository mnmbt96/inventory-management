import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categories: { type: Array, required: true },
  date: { type: String, required: false },
  memo: { type: String, required: false },
  image: { type: String, required: false },
  status: { type: String, required: false },
  discount: { type: Number, required: false },
});

export default mongoose.model("Product", productSchema);
