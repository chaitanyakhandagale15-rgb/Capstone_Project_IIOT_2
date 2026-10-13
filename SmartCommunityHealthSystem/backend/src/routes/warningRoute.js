const express = require("express");

const router = express.Router();

const {
  getWarnings,
} = require("../controllers/warningController");

router.get("/", getWarnings);

module.exports = router;