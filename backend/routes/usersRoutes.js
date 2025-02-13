const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// 6. POST - api/users/signup
router.post("/signup", registerUser);

// 7. POST - api/users/login
router.post("/login", loginUser);

router.get("/me", protect, getMe);

module.exports = router;