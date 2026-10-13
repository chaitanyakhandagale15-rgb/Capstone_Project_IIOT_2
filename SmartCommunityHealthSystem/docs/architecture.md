# Architecture

- Simulator (Node.js) -> Backend (Express + MongoDB)
- ML service (FastAPI) for predictions
- Frontend (React + Vite)

Data flow:
Simulator (or ESP32 later) => POST /api/sensor => Backend stores in sensor_data => optionally triggers predictionService -> ML microservice => stores predictions
