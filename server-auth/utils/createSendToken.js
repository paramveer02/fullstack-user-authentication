import jwt from "jsonwebtoken";

const signToken = function (userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createSendToken = function (user, statusCode, res) {
  const token = signToken(user._id);

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });
  user.password = undefined;

  return res.status(statusCode).json({ status: "success", token, user });
};
