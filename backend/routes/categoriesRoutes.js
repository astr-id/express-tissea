const express = require("express");
const router = express.Router();

const {
  getLinesByCategory,
  getLineDetails,
  getLineStops,
  getStops,
  addStop,
  updateLine,
  deleteStop,
} = require("../controllers/categoriesController");

const { protect } = require("../middleware/authMiddleware");

// 1. GET - /api/categories/:id/lines
router.get("/:id/lines", protect, getLinesByCategory);

// 2. GET - /api/categories/:id/lines/:id
router.get("/:id/lines/:lineId", protect, getLineDetails);

// 3. GET - /api/categories/:id/lines/:id/stops
router.get("/:id/lines/:lineId/stops", protect, getLineStops);

// 8. POST - /api/categories/:id/lines/:id/stops
router.post("/:id/lines/:lineId/stops", protect, addStop);

// 9. PUT - /api/categories/:id/lines/:id
router.put("/:id/lines/:lineId", protect, updateLine);

// 10. DELETE - /api/categories/:id/lines/:id/stops/:stopId
router.delete("/:id/lines/:lineId/stops/:stopId", protect, deleteStop);

module.exports = router;
