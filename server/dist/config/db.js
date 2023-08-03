"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default
    .connect((_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "default_db_url")
    .then(() => console.log("DB is connected"))
    .catch((error) => console.error("DB connection error:", error));
exports.default = mongoose_1.default;
