const ApiError = require("../utils/ApiError");

/**
 * Generic Validation Middleware
 *
 * Usage:
 *
 * router.post(
 *    "/",
 *    validate(sensorSchema),
 *    controller
 * );
 */

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false, // Return all validation errors
      allowUnknown: false, // Don't allow unknown fields
      stripUnknown: true, // Remove unknown fields
    });

    if (!error) {
      return next();
    }

    const errors = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    return next(
      new ApiError(
        400,
        "Validation failed.",
        errors
      )
    );
  };
};

module.exports = validate;