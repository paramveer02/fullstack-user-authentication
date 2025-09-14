import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  // default
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong";

  // Duplicate key (Mongo E11000)
  if (err.code === 11000) {
    statusCode = StatusCodes.CONFLICT; // 409
    message = "This email is already registered.";
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = StatusCodes.BAD_REQUEST; // 400
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  return res.status(statusCode).json({ message });
};

export default errorHandler;
