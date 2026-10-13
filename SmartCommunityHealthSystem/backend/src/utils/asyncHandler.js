/**
 * Wraps async route handlers and forwards errors
 * to Express error middleware.
 *
 * Usage:
 *
 * router.get("/", asyncHandler(async (req, res) => {
 *     ...
 * }));
 */

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;