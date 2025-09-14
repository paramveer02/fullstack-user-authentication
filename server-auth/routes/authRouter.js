import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.js";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
