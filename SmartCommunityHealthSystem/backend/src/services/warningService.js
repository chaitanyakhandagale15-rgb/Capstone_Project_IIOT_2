const SensorData = require("../models/SensorData");
const { getCurrentWeather } = require("./weatherService");

const getWarnings = async () => {
  const latest = await SensorData.findOne().sort({ createdAt: -1 });

  if (!latest) {
    return [];
  }

  const weather = await getCurrentWeather();

  const warnings = [];

  // -----------------------------
  // Water Quality Rules
  // -----------------------------

  if (latest.pH < 6.5) {
    warnings.push({
      severity: "High",
      title: "Acidic Water",
      message: "pH is below the safe limit.",
    });
  }

  if (latest.pH > 8.5) {
    warnings.push({
      severity: "High",
      title: "Alkaline Water",
      message: "pH is above the safe limit.",
    });
  }

  if (latest.temperature > 35) {
    warnings.push({
      severity: "Medium",
      title: "High Water Temperature",
      message: "Temperature is unusually high.",
    });
  }

  if (latest.turbidity > 5) {
    warnings.push({
      severity: "High",
      title: "High Turbidity",
      message: "Water turbidity exceeds the recommended limit.",
    });
  }

  if (latest.waterQuality === "Unsafe") {
    warnings.push({
      severity: "Critical",
      title: "Unsafe Water",
      message: "Water is unsafe for consumption.",
    });
  }

  // -----------------------------
  // Weather Rules
  // -----------------------------

  if (weather.humidity > 90) {
    warnings.push({
      severity: "Low",
      title: "High Humidity",
      message: "Humidity is very high.",
    });
  }

  if (weather.windSpeed > 25) {
    warnings.push({
      severity: "Medium",
      title: "Strong Wind",
      message: "Strong wind conditions detected.",
    });
  }

  if (weather.weather.includes("Rain")) {
    warnings.push({
      severity: "Medium",
      title: "Rainfall Detected",
      message: "Rainfall may affect water quality.",
    });
  }

  if (weather.weather.includes("Thunder")) {
    warnings.push({
      severity: "High",
      title: "Thunderstorm",
      message: "Severe weather conditions detected.",
    });
  }

  // -----------------------------
  // Smart Combined Rules
  // -----------------------------

  if (
    weather.weather.includes("Rain") &&
    latest.turbidity > 5
  ) {
    warnings.push({
      severity: "Critical",
      title: "Possible Water Contamination",
      message:
        "Rainfall combined with high turbidity indicates contamination risk.",
    });
  }

  if (
    latest.temperature > 35 &&
    latest.waterQuality === "Unsafe"
  ) {
    warnings.push({
      severity: "Critical",
      title: "Possible Bacterial Growth",
      message:
        "High temperature and unsafe water increase bacterial growth risk.",
    });
  }

  return warnings;
};

module.exports = {
  getWarnings,
};