const express = require("express");
const router = express.Router();

const {
    signup,
    login,
} = require("../controllers/authController");

// 6. POST - api/users/signup
router.post("/signup", signup);

// 7. POST - api/users/login
router.post("/login", login);

module.exports = router;