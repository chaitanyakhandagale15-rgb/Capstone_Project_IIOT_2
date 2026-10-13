const express = require("express");

const {
  getDashboardStats,
  getDashboardChart,
  getRecentAlerts,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/stats", getDashboardStats);

router.get("/chart", getDashboardChart);

router.get("/alerts", getRecentAlerts);

module.exports = router;