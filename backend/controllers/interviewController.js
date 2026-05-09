const { text } = require("express");
const Interview = require("../models/Interview");

const { generateAIResponse } = require("../services/geminiService");

//create interview
const createInterview = async (req, res) => {
  try {
    const { jobRole, experienceLevel, skills } = req.body;

    if (!jobRole || !experienceLevel || !skills) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const interview = await Interview.create({
      userEmail: req.userEmail,

      jobRole,
      experienceLevel,
      skills,

      message: [],
    });

    res.status(200).json({
      message: "Interview created successfully",
      Interview,
    });
  } catch (error) {
    console.error("Create Interview Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

//chat with AI
const chatWithAI = async (req, res) => {
  try {
    const { messages, jobRole, skills } = req.body;

    const aiText = await generateAIResponse(messages, jobRole, skills);

    res.status(200).json({
      text: aiText,
    });
  } catch (error) {
    console.error("Gemini Chat Error", error);

    res.status(500).json({
      message: "AI Error",
    });
  }
};

module.exports = {
  createInterview,
  chatWithAI,
};
