import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";

export const app = express();

app.use(helmet());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ status: "sucess" });
});
