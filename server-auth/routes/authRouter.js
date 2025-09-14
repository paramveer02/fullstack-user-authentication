import { Router } from "express";
import { login, logout, signup } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { userCreateSchema } from "../schemas/userSchema.js";

export const authRouter = Router();

authRouter.post("/signup", validate(userCreateSchema), signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
