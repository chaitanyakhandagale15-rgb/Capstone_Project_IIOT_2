import api from "./api";

export const getPrediction = async () => {
  const response = await api.get("/ai/predict");
  return response.data.data;
};