const ApiError = require("../utils/ApiError");

/**
 * Global Error Handling Middleware
 * --------------------------------
 * Handles all application errors in one place.
 */

const errorMiddleware = (err, req, res, next) => {
  // If error is not an instance of ApiError,
  // convert it into one.
  if (!(err instanceof ApiError)) {
    err = new ApiError(
      500,
      err.message || "Internal Server Error"
    );
  }

  // Log error
  console.error("========================================");
  console.error("ERROR:", err.message);
  console.error(err.stack);
  console.error("========================================");

  return res.status(err.statusCode).json({
    success: false,
    statusCode: err.statusCode,
    message: err.message,
    errors: err.errors || [],
    timestamp: err.timestamp || new Date().toISOString(),
  });
};

module.exports = errorMiddleware;