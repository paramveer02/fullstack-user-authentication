import jwt from "jsonwebtoken";
import { NotFoundError, UnauthenticatedError } from "../errors/customErrors.js";
import User from "../models/User.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

export const protect = asyncWrapper(async function (req, res, next) {
  let token = req.cookies.token;
  if (!token) {
    const auth = req.headers?.authorization || req.headers?.Authorization;
    if (auth && auth.startsWith("Bearer ")) {
      token = auth.slice(7); // strip Bearer
    }
  }

  if (!token) throw new UnauthenticatedError("You are not Authenticated");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new UnauthenticatedError("Session expired. Please log in again.");
    }
    throw new UnauthenticatedError("Invalid token. Please log in.");
  }

  const user = await User.findById(decoded.userId);

  if (!user)
    throw new NotFoundError("User belonging to this token does not exist");

  if (user.changedPasswordAfter(decoded.iat))
    throw new UnauthenticatedError(
      "Password changed recently. Please log in again"
    );

  req.user = {
    id: user._id,
    role: user.role,
    email: user.email,
    firstName: user.firstName,
  };

  next();
});
