"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/db");
const userRouter_js_1 = __importDefault(require("./routers/userRouter.js"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server listening on port on ${PORT}`);
});
app.use("/user", userRouter_js_1.default);
