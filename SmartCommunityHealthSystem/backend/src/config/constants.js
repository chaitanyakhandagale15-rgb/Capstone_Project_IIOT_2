/**
 * =====================================================
 * Smart Community Health Monitoring System
 * Application Constants
 * =====================================================
 */

/* -------------------------------------------------------------------------- */
/*                               Water Quality                                */
/* -------------------------------------------------------------------------- */

const WATER_QUALITY = Object.freeze({
  SAFE: "Safe",
  MODERATE: "Moderate",
  UNSAFE: "Unsafe",
});

/* -------------------------------------------------------------------------- */
/*                               Sensor Source                                */
/* -------------------------------------------------------------------------- */

const SENSOR_SOURCE = Object.freeze({
  SIMULATOR: "Simulator",
  ESP32: "ESP32",
});

/* -------------------------------------------------------------------------- */
/*                              Weather Types                                 */
/* -------------------------------------------------------------------------- */

const WEATHER = Object.freeze({
  SUNNY: "Sunny",
  CLOUDY: "Cloudy",
  RAINY: "Rainy",
  STORM: "Storm",
  WINDY: "Windy",
  FOG: "Fog",
});

/* -------------------------------------------------------------------------- */
/*                            Disease Risk Levels                             */
/* -------------------------------------------------------------------------- */

const DISEASE_RISK = Object.freeze({
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
});

/* -------------------------------------------------------------------------- */
/*                            Possible Diseases                               */
/* -------------------------------------------------------------------------- */

const DISEASES = Object.freeze({
  CHOLERA: "Cholera",
  TYPHOID: "Typhoid",
  DIARRHEA: "Diarrhea",
  DYSENTERY: "Dysentery",
  NONE: "None",
});

/* -------------------------------------------------------------------------- */
/*                               Alert Levels                                 */
/* -------------------------------------------------------------------------- */

const ALERT_LEVEL = Object.freeze({
  NORMAL: "Normal",
  WARNING: "Warning",
  DANGER: "Danger",
  EMERGENCY: "Emergency",
});

/* -------------------------------------------------------------------------- */
/*                              User Roles                                    */
/* -------------------------------------------------------------------------- */

const USER_ROLE = Object.freeze({
  ADMIN: "Admin",
  HEALTH_OFFICER: "HealthOfficer",
  OPERATOR: "Operator",
  USER: "User",
});

/* -------------------------------------------------------------------------- */
/*                             API Messages                                   */
/* -------------------------------------------------------------------------- */

const API_MESSAGE = Object.freeze({
  CREATED: "Resource created successfully.",
  UPDATED: "Resource updated successfully.",
  DELETED: "Resource deleted successfully.",
  FETCHED: "Data fetched successfully.",
  NOT_FOUND: "Resource not found.",
  SERVER_ERROR: "Internal server error.",
  VALIDATION_ERROR: "Validation failed.",
});

/* -------------------------------------------------------------------------- */
/*                             HTTP Status Codes                              */
/* -------------------------------------------------------------------------- */

const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
});

/* -------------------------------------------------------------------------- */
/*                          Simulator Configuration                           */
/* -------------------------------------------------------------------------- */

const SIMULATOR = Object.freeze({
  INTERVAL: 5000, // milliseconds
  CONTAMINATION_PROBABILITY: 0.05, // 5%
});

/* -------------------------------------------------------------------------- */
/*                               Module Exports                               */
/* -------------------------------------------------------------------------- */

module.exports = {
  WATER_QUALITY,
  SENSOR_SOURCE,
  WEATHER,
  DISEASE_RISK,
  DISEASES,
  ALERT_LEVEL,
  USER_ROLE,
  API_MESSAGE,
  HTTP_STATUS,
  SIMULATOR,
};