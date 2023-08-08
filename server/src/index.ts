import express, { Application } from "express";
import dotenv from "dotenv";
import "./config/db";
import userRoute from "./routers/userRouter";
import cashRoute from "./routers/cashRouter";
import cors from "cors";
import bodyParser from "body-parser";

const app: Application = express();
dotenv.config();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;
app.use("/user", userRoute);
app.use("/cash", cashRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port on ${PORT}`);
});
