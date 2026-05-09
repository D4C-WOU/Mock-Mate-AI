const mongoose = require("mongoose");

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
    messages: [
      {
        role: String,
        content: String,
      },
    ],
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Interview", interviewSchema);
