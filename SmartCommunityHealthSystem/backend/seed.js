const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
require('dns').setServers(['8.8.8.8']);
dotenv.config({ path: path.join(__dirname, '.env') });

const SensorData = require('./src/models/SensorData');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

async function seed() {
  const data = [];
  for(let i=0; i<30; i++) {
     const isSafe = Math.random() > 0.5;
     const isModerate = !isSafe && Math.random() > 0.5;
     
     data.push({
        deviceId: "ESP32-001",
        location: "Water Tank A",
        ph: isSafe ? (7 + Math.random()) : isModerate ? 6.1 : 4.0,
        temperature: isSafe ? (25 + Math.random()*2) : isModerate ? 32 : 38,
        turbidity: isSafe ? (2 + Math.random()) : isModerate ? 6 : 12,
        waterQuality: isSafe ? "Safe" : isModerate ? "Moderate" : "Unsafe",
        createdAt: new Date(Date.now() - Math.random() * 1000000000)
     });
  }
  await SensorData.insertMany(data);
  console.log("Seeded 30 past historical records including unsafe data!");
  process.exit(0);
}
seed();
