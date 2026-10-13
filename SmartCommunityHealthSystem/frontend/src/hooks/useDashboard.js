import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../services/api";
import socket from "../services/socket";


function useDashboard() {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [latestReading, setLatestReading] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) {
      setLoading(true);
    }

      const [
        statsResponse,
        chartResponse,
        latestResponse,
        alertsResponse,
        historyResponse,
      ] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/dashboard/chart"),
        api.get("/sensor/latest"),
        api.get("/dashboard/alerts"),
        api.get("/sensor/history?limit=10"),
      ]);

      setStats(statsResponse.data.data);
      setChartData(chartResponse.data.data);
      setLatestReading(latestResponse.data.data);
      setAlerts(alertsResponse.data.data);

      // Adjust this if your backend response structure is different
      setHistory(historyResponse.data.data.sensorData);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard data."
      );
    } finally {
       if (showLoader) {
        setLoading(false);
      }
    }
  }, []);

useEffect(() => {
    fetchDashboardData(true);

    const handleNewSensorData = () => fetchDashboardData(false);

    socket.on("sensor:new", handleNewSensorData);

    return () => {
        socket.off("sensor:new", handleNewSensorData);
    };
}, [fetchDashboardData]);

  return {
    stats,
    chartData,
    latestReading,
    alerts,
    history,
    loading,
    refresh: fetchDashboardData,
  };
}

export default useDashboard;