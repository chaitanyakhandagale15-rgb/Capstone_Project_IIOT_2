const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  getCurrentWeather,
} = require("../services/weatherService");

exports.getWeather = asyncHandler(async (req, res) => {
  const weather = await getCurrentWeather();

  res.status(200).json(
new ApiResponse(
    200,
    "Weather fetched successfully",
    weather
  )  );
});