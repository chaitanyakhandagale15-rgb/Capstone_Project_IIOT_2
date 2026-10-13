import { useEffect, useState } from "react";
import { getWarnings } from "../services/warningService";

const useWarnings = () => {
  const [warnings, setWarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWarnings = async () => {
    try {
      const data = await getWarnings();
      setWarnings(data);
    } catch (error) {
      console.error("Failed to fetch warnings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarnings();
  }, []);

  return {
    warnings,
    loading,
    refresh: fetchWarnings,
  };
};

export default useWarnings;