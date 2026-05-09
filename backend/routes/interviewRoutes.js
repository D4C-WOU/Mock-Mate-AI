const express = require("express");

const {
  createInterview,
  chatWithAI,
} = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/setup", protect, createInterview);

router.post("/chat", chatWithAI);

module.exports = router;
