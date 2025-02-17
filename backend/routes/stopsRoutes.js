const express = require("express");
const router = express.Router();

const { getStops } = require("../controllers/stopsController");

// Get - /api/stops
router.get("/", getStops); 

module.exports = router;
