const asyncHandler = require("../utils/asyncHandler");
const sensorService = require("../services/sensorService");
const aiService = require("../services/aiService");
const ApiResponse = require("../utils/ApiResponse");

const predictDisease = asyncHandler(async (req, res) => {
  const latestSensor = await sensorService.getLatestSensorData();

  const prediction = await aiService.predictDisease(latestSensor);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Disease prediction generated successfully.",
      prediction
    )
  );
});

module.exports = {
  predictDisease,
};