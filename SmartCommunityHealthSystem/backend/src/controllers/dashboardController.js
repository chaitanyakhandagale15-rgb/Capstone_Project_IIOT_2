const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const dashboardService = require("../services/dashboardService");

const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getDashboardStats();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Dashboard statistics fetched successfully.",
      stats
    )
  );
});
const getDashboardChart = asyncHandler(async (req, res) => {
  const days = Number(req.query.days) || 7;

  const chart = await dashboardService.getDashboardChart(days);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Dashboard chart data fetched successfully.",
      chart
    )
  );
});

const getRecentAlerts = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 10;

  const alerts = await dashboardService.getRecentAlerts(limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Recent alerts fetched successfully.",
      alerts
    )
  );
});

module.exports = {
  getDashboardStats,
  getDashboardChart,
  getRecentAlerts,
};