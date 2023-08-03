import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.DB_URL ?? "default_db_url")
  .then(() => console.log("DB is connected"))
  .catch((error) => console.error("DB connection error:", error));

export default mongoose;
