import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get("/weather");

      setWeather(response.data.data);
    } catch (error) {
      toast.error("Failed to load weather.");
    } finally {
      setLoading(false);
    }
  }, []);


  
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    weather,
    loading,
    refresh: fetchWeather,
  };
}

export default useWeather;