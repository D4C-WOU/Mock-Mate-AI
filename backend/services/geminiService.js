const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateAIResponse = async (messages, jobRole, skills) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",

    systemInstruction: `
You are a professional AI technical interviewer.

Rules:
1. Ask ONLY ONE question at a time.
2. Wait for the candidate answer.
3. Evaluate briefly.
4. Ask next question naturally.
5. Keep responses concise.

Job Role:
${jobRole}

Skills:
${skills}
`,
  });

  // Convert message history
  const formattedHistory = messages.slice(1, -1).map((msg) => ({
    role: msg.role === "user" ? "user" : "model",

    parts: [
      {
        text: msg.content,
      },
    ],
  }));

  const currentUserInput = messages[messages.length - 1].content;

  const chat = model.startChat({
    history: formattedHistory,
  });

  const result = await chat.sendMessage(currentUserInput);

  const response = await result.response;

  return response.text();
};

module.exports = {
  generateAIResponse,
};
