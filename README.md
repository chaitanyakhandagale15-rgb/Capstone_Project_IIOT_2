# Smart Community Health Monitoring & Early Warning System

A real-time IoT-based water quality monitoring and community health early warning system that collects sensor data, analyzes water quality, predicts possible waterborne diseases using AI, and provides live alerts through an interactive dashboard.

---

# Features

## Water Quality Monitoring

* Real-time sensor data collection
* pH Monitoring
* Temperature Monitoring
* Turbidity Monitoring
* Automatic Water Quality Classification

  * Safe
  * Moderate
  * Unsafe

## AI Disease Prediction

* Cloudflare Workers AI integration
* Predicts possible waterborne diseases
* Risk Classification

  * Low
  * Moderate
  * High
* Prevention recommendations
* AI-generated health summary

## Weather Monitoring

* Live Weather Information
* Temperature
* Humidity
* Wind Speed
* Weather Condition

> **Note:** Weather information is displayed separately and does not affect water quality calculations.

## Smart Alerts

* Real-time unsafe water alerts
* Recent alert history
* Smart community warnings

## Dashboard

* Live Dashboard
* Latest Sensor Reading
* AI Prediction Card
* Weather Card
* Charts & Analytics
* Sensor History Table

## Real-Time Communication

* Socket.IO
* Automatic dashboard refresh
* Instant AI prediction updates

---

# Tech Stack

## Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* Socket.IO Client
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* Axios

## AI

* Cloudflare Workers AI

## Database

* MongoDB Atlas

---

# System Architecture

```text
                    +------------------+
                    | ESP32/Simulator  |
                    +--------+---------+
                             |
                             |
                  POST Sensor Data
                             |
                             v
                   Express.js Backend
                             |
      +----------------------+---------------------+
      |                      |                     |
      |                      |                     |
      v                      v                     v
 MongoDB             Water Quality          Weather API
                      Calculation
      |                      |
      +----------+-----------+
                 |
                 |
                 v
        Cloudflare Workers AI
                 |
                 |
                 v
        Disease Prediction
                 |
                 |
                 v
          Socket.IO Server
                 |
                 |
                 v
          React Dashboard
```

---

# Folder Structure

```text
project
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── app.js
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   └── layouts
│   └── vite.config.js
│
└── simulator
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd project
```

---

## Backend

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_MODEL=@cf/meta/llama-3.1-8b-instruct

WEATHER_API_KEY=your_weather_api_key
```

Run backend

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Simulator

```bash
cd simulator
npm install
npm start
```

---

# API Endpoints

## Sensor

### Create Sensor Reading

```http
POST /api/v1/sensor/esp32
```

Example Request

```json
{
  "deviceId": "ESP32-001",
  "location": "Water Tank A",
  "ph": 7.2,
  "temperature": 28,
  "turbidity": 2,
  "source": "Simulator"
}
```

---

### Latest Reading

```http
GET /api/v1/sensor/latest
```

---

### Sensor History

```http
GET /api/v1/sensor/history
```

---

## Dashboard

### Dashboard Statistics

```http
GET /api/v1/dashboard/stats
```

### Dashboard Charts

```http
GET /api/v1/dashboard/chart
```

### Recent Alerts

```http
GET /api/v1/dashboard/alerts
```

---

## AI

### Disease Prediction

```http
GET /api/v1/ai/predict
```

---

## Weather

```http
GET /api/v1/weather/current
```

---

# Water Quality Rules

| Parameter          | Status   |
| ------------------ | -------- |
| pH 6.5 – 8.5       | Safe     |
| Turbidity > 5 NTU  | Moderate |
| Turbidity > 10 NTU | Unsafe   |
| Temperature > 35°C | Unsafe   |

---

# AI Prediction

The system predicts:

* Waterborne Disease Risk
* Possible Diseases
* Prevention Measures
* AI Generated Summary

Possible diseases include:

* Cholera
* Typhoid
* Dysentery
* Hepatitis A
* E. coli Infection
* Gastroenteritis

---

# Real-Time Features

* Live Sensor Updates
* Live Dashboard Refresh
* Automatic AI Prediction Updates
* Real-Time Alerts
* Live Weather Information

---

# Future Enhancements

* ESP32 Hardware Integration
* SMS/Email Notifications
* Mobile Application
* Historical Data Analytics
* Multi-location Monitoring
* Admin Authentication
* Role-Based Access Control
* Predictive Trend Analysis

---

# Screenshots

Add screenshots of:

* Dashboard
* AI Prediction
* Weather Card
* Alerts
* Charts
* Sensor History

---

# Contributors

**Prafull Shinde**

Bachelor of Technology (Artificial Intelligence & Machine Learning)

DKTE's Textile & Engineering Institute, Ichalkaranji

---

# License

This project is developed for educational and research purposes.
