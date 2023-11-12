// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// User routes
router.get("/a", userController.getUsers);
router.get("/profile", authMiddleware.verifyToken, userController.getUserProfile);


module.exports = router;
