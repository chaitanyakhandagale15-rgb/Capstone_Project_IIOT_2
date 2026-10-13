const axios = require("axios");

const LATITUDE = 16.705;      // Ichalkaranji
const LONGITUDE = 74.460;

const weatherCodeMap = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Heavy Drizzle",
  61: "Light Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  71: "Light Snow",
  80: "Rain Showers",
  81: "Heavy Rain Showers",
  95: "Thunderstorm",
};

const getCurrentWeather = async () => {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

  const { data } = await axios.get(url);

  return {
    location: "Ichalkaranji",
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    weather:
      weatherCodeMap[data.current.weather_code] || "Unknown",
  };
};

module.exports = {
  getCurrentWeather,
};