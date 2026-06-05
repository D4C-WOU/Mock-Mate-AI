const Interview = require("../models/Interview");

const {
  generateAIResponse,
  generateInterviewFeedback,
} = require("../services/geminiService");

// CREATE INTERVIEW
const createInterview = async (req, res) => {
  try {
    const { jobRole, experienceLevel, skills } = req.body;

    const interview = await Interview.create({
      userEmail: req.user.email,

      jobRole,
      experienceLevel,
      skills,

      messages: [],
    });

    res.status(201).json({
      message: "Interview created",

      interview,
    });
  } catch (error) {
    console.error("Create Interview Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// CHAT WITH AI + SAVE MESSAGES
const chatWithAI = async (req, res) => {
  try {
    const { interviewId, messages, jobRole, skills } = req.body;

    const aiText = await generateAIResponse(messages, jobRole, skills);

    const updatedMessages = [
      ...messages,

      {
        role: "model",
        content: aiText,
      },
    ];

    await Interview.findByIdAndUpdate(
      interviewId,

      {
        messages: updatedMessages,
      },
    );

    res.status(200).json({
      text: aiText,
    });
  } catch (error) {
    console.error("Chat Error:", error);

    res.status(500).json({
      message: error.message || "AI service unavailable",
    });
  }
};

// GET USER INTERVIEWS
const getUserInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      userEmail: req.user.email,
    }).sort({ createdAt: -1 });

    res.status(200).json(interviews);
  } catch (error) {
    console.error("Get Interviews Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GET SINGLE INTERVIEW
const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.status(200).json(interview);
  } catch (error) {
    console.error("Get Interview Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const saveInterviewFeedback = async (req, res) => {
  try {
    const { interviewId, messages, jobRole, skills } = req.body;

    const feedbackText = await generateInterviewFeedback(
      messages,
      jobRole,
      skills,
    );

    const cleanedText = feedbackText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const feedback = JSON.parse(cleanedText);

    const updatedInterview = await Interview.findByIdAndUpdate(
      interviewId,
      {
        feedback,
        status: "completed",
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      feedback: updatedInterview.feedback,
    });
  } catch (error) {
    console.error("Save Feedback Error:", error);

    res.status(500).json({
      message: "Feedback generation failed",
    });
  }
};

module.exports = {
  createInterview,

  chatWithAI,

  getUserInterviews,

  getInterviewById,

  saveInterviewFeedback,
};
