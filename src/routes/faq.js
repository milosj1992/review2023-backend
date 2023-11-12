// routes/faqRoutes.js
const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");
const authMiddleware = require("../middleware/authMiddleware");

// FAQ routes
router.get("/faq_category/:id", authMiddleware.verifyToken, faqController.getFAQCategoryById);
router.patch("/faq_category/:id", authMiddleware.verifyToken, faqController.editFAQCategory);
router.post("/faq_category", authMiddleware.verifyToken, faqController.addFAQCategory);
router.delete("/faq_category/:id", authMiddleware.verifyToken, faqController.deleteFAQCategory);
router.get("/faq_categories", authMiddleware.verifyToken, faqController.getFAQCategories);

module.exports = router;
