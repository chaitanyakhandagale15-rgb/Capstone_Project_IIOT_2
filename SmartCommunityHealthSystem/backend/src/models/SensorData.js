const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    ph: {
      type: Number,
      required: true,
      min: 0,
      max: 14,
    },

    turbidity: {
      type: Number,
      required: true,
      min: 0,
    },

    temperature: {
      type: Number,
      required: true,
      min: -20,
      max: 100,
    },

    battery: {
      type: Number,
      min: 0,
      max: 100,
    },

    firmwareVersion: {
      type: String,
    },

    waterQuality: {
      type: String,
      enum: ["Safe", "Moderate", "Unsafe"],
      default: "Safe",
    },

    source: {
      type: String,
      enum: ["Simulator", "ESP32"],
      default: "Simulator",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SensorData", sensorDataSchema);