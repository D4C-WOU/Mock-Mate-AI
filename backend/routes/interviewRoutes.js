const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createInterview,
  chatWithAI,
  getUserInterviews,
  getInterviewById,
} = require("../controllers/interviewController");

// CREATE INTERVIEW
router.post("/setup", protect, createInterview);

// CHAT
router.post("/chat", chatWithAI);

// GET USER INTERVIEWS
router.get("/my-interviews", protect, getUserInterviews);

// GET SINGLE INTERVIEW
router.get("/:id", protect, getInterviewById);

module.exports = router;
