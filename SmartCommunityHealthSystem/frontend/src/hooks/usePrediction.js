import { useCallback, useEffect, useState } from "react";

import socket from "../services/socket";
import { getPrediction } from "../services/aiService";

function usePrediction() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPrediction = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const data = await getPrediction();
      setPrediction(data);
    } catch (error) {
      console.error(error);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchPrediction(true);

    const handleNewSensorData = () => fetchPrediction(false);

    socket.on("sensor:new", handleNewSensorData);

    return () => {
      socket.off("sensor:new", handleNewSensorData);
    };
  }, [fetchPrediction]);

  return {
    prediction,
    loading,
    refresh: fetchPrediction,
  };
}

export default usePrediction;