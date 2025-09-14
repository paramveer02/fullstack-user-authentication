import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { createSendToken } from "../utils/createSendToken.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/customErrors.js";

export const signup = asyncWrapper(async function (req, res) {
  const { firstName, lastName, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) throw new BadRequestError("Email already exists");

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: "user",
  });
  createSendToken(user, StatusCodes.CREATED, res);
});

export const login = asyncWrapper(async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide your email and password");

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    throw new UnauthenticatedError("Incorrect Credentials");

  createSendToken(user, StatusCodes.OK, res);
});

export const logout = asyncWrapper(async function (req, res) {
  const isProd = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    // expires: new Date(0),
  });
  res.status(StatusCodes.OK).json({ message: "User logged out!" });
});
