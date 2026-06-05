const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generateAIResponse = async (messages, jobRole, skills) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const formattedMessages = messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const prompt = `
You are a professional AI mock interviewer.

Role: ${jobRole}

Skills: ${skills}

Conversation:
${formattedMessages}

Respond naturally like a real interviewer.
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    return response.text();
  } catch (error) {
    console.log("GEMINI ERROR:", error.message);

    // graceful fallback
    return `
I'm temporarily unavailable due to API limits.

Please wait a minute and try again.

Meanwhile:
- Review your previous answer
- Think about edge cases
- Prepare an optimized solution
`;
  }
};

module.exports = {
  generateAIResponse,
};

const generateInterviewFeedback = async (messages, jobRole, skills) => {
  const formattedConversation = messages
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  const prompt = `
You are an expert technical interviewer.

Analyze this interview for a ${jobRole} role.

Required Skills:
${skills}

Interview Conversation:
${formattedConversation}

Return ONLY valid JSON in this exact format:

{
  "overallScore": 8,
  "communication": 7,
  "technicalKnowledge": 9,
  "problemSolving": 8,
  "strengths": [
    "Strong React fundamentals",
    "Good API understanding"
  ],
  "improvements": [
    "Improve system design explanations",
    "Give more structured answers"
  ],
  "finalFeedback": "Very solid technical foundation with room for communication improvements."
}
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

  return response;
};

module.exports = {
  generateAIResponse,
  generateInterviewFeedback,
};
