const sensorService = require("../services/sensorService");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

/**
 * @desc    Create Sensor Reading
 * @route   POST /api/v1/sensor
 */
const createSensorData = asyncHandler(async (req, res) => {
  const sensor = await sensorService.createSensorData(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Sensor data created successfully.",
      sensor
    )
  );
});

/**
 * @desc    Get Latest Sensor Reading
 * @route   GET /api/v1/sensor/latest
 */
const getLatestSensorData = asyncHandler(async (req, res) => {
  const sensor = await sensorService.getLatestSensorData();

  if (!sensor) {
    throw new ApiError(404, "No sensor data found.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Latest sensor data fetched successfully.",
      sensor
    )
  );
});

/**
 * @desc    Get Sensor History
 * @route   GET /api/v1/sensor/history
 */
const getSensorHistory = asyncHandler(async (req, res) => {
  const result = await sensorService.getSensorHistory(req.query);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Sensor history fetched successfully.",
      result
    )
  );
});

/**
 * @desc    Receive ESP32 Sensor Reading
 * @route   POST /api/v1/sensor/esp32
 */
const receiveESP32Data = asyncHandler(async (req, res) => {

  const sensor = await sensorService.createSensorData(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "ESP32 sensor data received successfully.",
      sensor
    )
  );

});

module.exports = {
  createSensorData,
  getLatestSensorData,
  getSensorHistory,
  receiveESP32Data
};