const express = require("express");
const router = express.Router();

const {
  getLinesByCategory,
  getLineDetails,
  getLineStops,
  addStopToLine,
  updateLine,
  deleteStopFromLine,
} = require("../controllers/categoriesController");

// 1. GET - /api/categories/:id/lines
router.get("/:id/lines", getLinesByCategory);

// 2. GET - /api/categories/:id/lines/:id
router.get("/:id/lines/:lineId", getLineDetails);

// 3. GET - /api/categories/:id/lines/:id/stops
router.get("/:id/lines/:lineId/stops", getLineStops);

// // 8. POST - /api/categories/:id/lines/:id/stops
// router.post("/:id/lines/:lineId/stops", addStopToLine);

// // 9. PUT - /api/categories/:id/lines/:id
// router.put("/:id/lines/:lineId", updateLine);

// // 10. DELETE - /api/categories/:id/lines/:id/stops/:stopId
// router.delete("/:id/lines/:lineId/stops/:stopId", deleteStopFromLine);

module.exports = router;
