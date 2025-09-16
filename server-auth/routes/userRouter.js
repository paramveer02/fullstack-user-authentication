import Router from "express";
import { updateMe } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

export const userRouter = Router();

userRouter.patch("/update/me", protect, upload, updateMe);
