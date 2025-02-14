const express = require("express");
const router = express.Router();

const {
  getDistanceBetweenStops,
  getDistanceOfLine,
} = require("../controllers/statsController");

const { protect } = require("../middleware/authMiddleware");

// 4. GET - /api/stats/distance/stops/:id/:id
router.get(
  "/distance/stops/:startStopId/:endStopId",
  protect,
  getDistanceBetweenStops
);

// 5. GET - /api/stats/distance/lines/:id
router.get("/distance/lines/:id", protect, getDistanceOfLine);

module.exports = router;
