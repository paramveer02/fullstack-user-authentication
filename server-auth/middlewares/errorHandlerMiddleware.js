import StatusCodes from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({ message });
};

export default errorHandler;
