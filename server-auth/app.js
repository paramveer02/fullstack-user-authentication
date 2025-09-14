import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import notFound from "./middlewares/notFoundMiddleware.js";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import { authRouter } from "./routes/authRouter.js";

export const app = express();

app.use(helmet());

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ status: "sucess" });
});

app.use(notFound);
app.use(errorHandler);
