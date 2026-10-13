const express = require("express");

const {
  receiveESP32Data,
  createSensorData,
  getLatestSensorData,
  getSensorHistory,
} = require("../controllers/sensorController");

const validate = require("../middlewares/validate");
const sensorSchema = require("../validators/sensorValidator");

const router = express.Router();

/**
 * POST /api/v1/sensor
 */
router.post(
  "/",
  validate(sensorSchema),
  createSensorData
);
router.post(
  "/esp32",
  validate(sensorSchema),
  receiveESP32Data
);
/**
 * GET /api/v1/sensor/latest
 */
router.get("/latest", getLatestSensorData);

/**
 * GET /api/v1/sensor/history
 */
router.get("/history", getSensorHistory);

module.exports = router;