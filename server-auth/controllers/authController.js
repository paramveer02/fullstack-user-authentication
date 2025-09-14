import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { createSendToken } from "../utils/createSendToken.js";
import { BadRequestError } from "../errors/customErrors.js";

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

export const login = asyncWrapper(async function (req, res) {});
export const logout = asyncWrapper(async function (req, res) {});
