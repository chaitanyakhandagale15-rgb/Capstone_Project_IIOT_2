import api from "./api";

export const getWarnings = async () => {
  const response = await api.get("/warnings");
  return response.data.data;
};