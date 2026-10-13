const axios = require("axios");
const config = require("./config");

async function sendSensorData() {
  try {
    const payload = {
      deviceId: config.DEVICE_ID,
      location: config.LOCATION,
      ph: 7.2,
      temperature: 28.4,
      turbidity: 2.3,
      source: "Simulator",
    };

    const response = await axios.post(config.API_URL, payload);

    console.log("✅ Data Sent");
    console.log(response.data);
  } catch (err) {
    console.error("❌ Failed");

    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
  }
}

setInterval(sendSensorData, config.INTERVAL);

sendSensorData();