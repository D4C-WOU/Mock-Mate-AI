const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    role: String,

    content: String,
  },
  {
    _id: false,
  },
);

const feedbackSchema = new mongoose.Schema(
  {
    overallScore: {
      type: Number,
      default: 0,
    },

    communication: {
      type: Number,
      default: 0,
    },

    technicalKnowledge: {
      type: Number,
      default: 0,
    },

    problemSolving: {
      type: Number,
      default: 0,
    },

    strengths: [String],

    improvements: [String],

    finalFeedback: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const interviewSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },

    jobRole: {
      type: String,
      required: true,
    },

    experienceLevel: {
      type: String,
      required: true,
    },

    skills: {
      type: String,
      required: true,
    },

    messages: [messageSchema],

    feedback: feedbackSchema,

    status: {
      type: String,
      enum: ["active", "completed", "abandoned"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Interview", interviewSchema);
