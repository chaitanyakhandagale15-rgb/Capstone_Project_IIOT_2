require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
// Routes
const weatherRoute = require("./routes/weatherRoute");
const sensorRoutes = require("./routes/sensorRoutes");
const aiRoute = require("./routes/aiRoute");
const dashboardRoutes = require("./routes/dashboardRoutes");
const warningRoute = require("./routes/warningRoute");
// Middlewares
const errorMiddleware = require("./middlewares/errorMiddleware");
//Models
const app = express();

/* -------------------------------------------------------------------------- */
/*                              Global Middleware                             */
/* -------------------------------------------------------------------------- */

// Security
app.use(helmet());

// Enable CORS
app.use(cors());

// Compress Responses
app.use(compression());

// Parse JSON
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));



// Logger
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

/* -------------------------------------------------------------------------- */
/*                               Health Check                                 */
/* -------------------------------------------------------------------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Community Health Monitoring API is running 🚀",
    version: "1.0.0",
  });
});

/* -------------------------------------------------------------------------- */
/*                                 API Routes                                 */
/* -------------------------------------------------------------------------- */

app.use("/api/v1/sensor", sensorRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);

app.use("/api/v1/weather", weatherRoute);

app.use("/api/v1/warnings", warningRoute);

app.use("/api/v1/ai", aiRoute);
/* -------------------------------------------------------------------------- */
/*                               404 Handler                                  */
/* -------------------------------------------------------------------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* -------------------------------------------------------------------------- */
/*                          Global Error Middleware                           */
/* -------------------------------------------------------------------------- */

app.use(errorMiddleware);

module.exports = app;