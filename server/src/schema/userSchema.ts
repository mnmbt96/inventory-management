import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  initials: { type: String, required: false },
  color: { type: String, required: false },
});

export default mongoose.model("User", userSchema);
