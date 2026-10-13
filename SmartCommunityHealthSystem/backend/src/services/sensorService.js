const SensorData = require("../models/SensorData");
const { getIO } = require("../config/socket");
const {
  calculateWaterQuality,
} = require("./waterQualityService");

/**
 * Create Sensor Reading
 */
const createSensorData = async (data) => {

    const waterQuality = calculateWaterQuality(data);

    const sensorData = await SensorData.create({

        ...data,

        waterQuality,

    });

    getIO().emit("sensor:new", sensorData);

    return sensorData;

};

/**
 * Latest Reading
 */
const getLatestSensorData = async () => {
  return await SensorData.findOne().sort({ createdAt: -1 });
};

/**
 * Sensor History
 * Supports:
 * - Pagination
 * - Sorting
 * - Weather Filter
 * - Water Quality Filter
 * - Date Range
 */
const getSensorHistory = async (query) => {
  const {
    page = 1,
    limit = 10,
    weather,
    waterQuality,
    startDate,
    endDate,
    sort = "-createdAt",
  } = query;

  const filter = {};

  if (weather) {
    filter.weather = weather;
  }

  if (waterQuality) {
    filter.waterQuality = waterQuality;
  }

  if (startDate || endDate) {
    filter.createdAt = {};

    if (startDate) {
      filter.createdAt.$gte = new Date(startDate);
    }

    if (endDate) {
      filter.createdAt.$lte = new Date(endDate);
    }
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [sensorData, total] = await Promise.all([
    SensorData.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit)),

    SensorData.countDocuments(filter),
  ]);

  return {
    sensorData,
    pagination: {
      totalRecords: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      limit: Number(limit),
    },
  };
};

module.exports = {
  createSensorData,
  getLatestSensorData,
  getSensorHistory,
};