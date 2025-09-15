import { Router } from "express";
import { login, logout, me, signup } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { userCreateSchema } from "../schemas/userSchema.js";
import { protect } from "../middlewares/auth.js";

export const authRouter = Router();

authRouter.post("/signup", validate(userCreateSchema), signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

// protected route
authRouter.get("/me", protect, me);
