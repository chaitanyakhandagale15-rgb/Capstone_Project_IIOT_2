const SensorData = require("../models/SensorData");

const getDashboardStats = async () => {
  // Total readings
  const totalReadings = await SensorData.countDocuments();

  // Water quality counts
  const qualityStats = await SensorData.aggregate([
    {
      $group: {
        _id: "$waterQuality",
        count: { $sum: 1 }
      }
    }
  ]);

  // Average values
  const averages = await SensorData.aggregate([
    {
      $group: {
        _id: null,
        averagePH: { $avg: "$ph" },
        averageTemperature: { $avg: "$temperature" },
        averageTurbidity: { $avg: "$turbidity" }
      }
    }
  ]);

  // Latest reading
  const latestReading = await SensorData.findOne().sort({
    createdAt: -1,
  });

  const stats = {
    totalReadings,

    safe: 0,
    moderate: 0,
    unsafe: 0,

    averagePH: 0,
    averageTemperature: 0,
    averageTurbidity: 0,

    latestReading,
  };

  qualityStats.forEach((item) => {
    switch (item._id) {
      case "Safe":
        stats.safe = item.count;
        break;

      case "Moderate":
        stats.moderate = item.count;
        break;

      case "Unsafe":
        stats.unsafe = item.count;
        break;
    }
  });

  if (averages.length > 0) {
    stats.averagePH =
      Number(averages[0].averagePH?.toFixed(2)) || 0;

    stats.averageTemperature =
      Number(averages[0].averageTemperature?.toFixed(2)) || 0;

    stats.averageTurbidity =
      Number(averages[0].averageTurbidity?.toFixed(2)) || 0;
  }

  return stats;
};

/**
 * Get Dashboard Chart Data
 * @param {number} days
 */
const getDashboardChart = async (days = 7) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - Number(days));

  const chartData = await SensorData.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        averagePH: {
          $avg: "$ph",
        },
        averageTemperature: {
          $avg: "$temperature",
        },
        averageTurbidity: {
          $avg: "$turbidity",
        },
        totalReadings: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return chartData.map((item) => ({
    date: item._id,
    averagePH: Number(item.averagePH.toFixed(2)),
    averageTemperature: Number(item.averageTemperature.toFixed(2)),
    averageTurbidity: Number(item.averageTurbidity.toFixed(2)),
    totalReadings: item.totalReadings,
  }));
};

/**
 * Get Recent Alerts
 * Returns latest Unsafe and Moderate readings
 */
const getRecentAlerts = async (limit = 10) => {
  const alerts = await SensorData.find({
    waterQuality: {
      $in: ["Unsafe", "Moderate"],
    },
  })
    .sort({ createdAt: -1 })
    .limit(Number(limit));

  return alerts;
};

module.exports = {
  getDashboardStats,
  getDashboardChart,
  getRecentAlerts,
};