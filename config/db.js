import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const DB = process.env.DB_URI;

mongoose
  .connect(DB)
  .then(() => console.log("DB Connection Successful"))
  .catch(() => console.log("DB Connection Failed"));
