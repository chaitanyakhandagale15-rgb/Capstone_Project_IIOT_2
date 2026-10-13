const express = require("express");
const { predictDisease } = require("../controllers/aiController");

const router = express.Router();

router.get("/predict", predictDisease);

module.exports = router;