require("dotenv").config();
require("dns").setServers(["8.8.8.8"]);

const app = require("./app");
const connectDB = require("./config/db");
const { initializeSocket } = require("./config/socket");

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log("====================================");
      console.log(" Smart Community Health System");
      console.log(` Server Running : http://localhost:${PORT}`);
      console.log(` Environment    : ${process.env.NODE_ENV}`);
      console.log("====================================");
    });
    initializeSocket(server);
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();


process.on("unhandledRejection", (error) => {
  console.error("Unhandled Promise Rejection");
  console.error(error);

  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception");
  console.error(error);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("\nShutting down server...");

  if (server) {
    server.close(() => {
      console.log("Server stopped successfully.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});