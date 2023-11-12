// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Authentication routes
router.post("/login",  authController.loginUser);
router.post("/check-token", authMiddleware.verifyToken , authController.checkToken);

module.exports = router;
