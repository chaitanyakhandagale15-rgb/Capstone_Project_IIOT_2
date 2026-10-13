const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  getWarnings,
} = require("../services/warningService");

exports.getWarnings = asyncHandler(async (req, res) => {
  const warnings = await getWarnings();

  res.status(200).json(
    new ApiResponse(
      200,
      "Warnings fetched successfully",
      warnings
    )
  );
});