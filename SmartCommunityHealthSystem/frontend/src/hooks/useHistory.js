import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const initialFilters = {
  page: 1,
  limit: 10,
  weather: "",
  waterQuality: "",
  startDate: "",
  endDate: "",
  sort: "-createdAt",
};

function useHistory() {
  const [history, setHistory] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState(initialFilters);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "") {
          params.append(key, value);
        }
      });

      const response = await api.get(
        `/sensor/history?${params.toString()}`
      );

      setHistory(response.data.data.sensorData);
      setPagination(response.data.data.pagination);
    } catch (error) {
      toast.error("Failed to fetch history.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      [e.target.name]: e.target.value,
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

const changePage = (page) => {
  setFilters((prev) => ({
    ...prev,
    page,
  }));
};

  return {
    history,
    pagination,
    filters,
    loading,
    setFilters,
    handleFilterChange,
    resetFilters,
    changePage,
  };
}

export default useHistory;