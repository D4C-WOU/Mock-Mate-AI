const axios = require("axios");

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// ========================================
// GENERATE INTERVIEW QUESTIONS + RESPONSES
// ========================================

const generateAIResponse = async (
  messages,
  jobRole,
  skills,
  experienceLevel,
) => {
  try {
    const formattedMessages = [
      {
        role: "system",

        content: `
You are a highly professional technical interviewer.

You are conducting a REALISTIC mock interview for a candidate.

Role:
${jobRole}

Required Skills:
${skills}

Candidate Experience Level:
${experienceLevel}

INTERVIEW RULES:

1. Ask ONLY one question at a time.

2. Keep questions concise and professional.

3. Start with easier questions and gradually increase difficulty.

4. If the candidate gives:
- a weak answer
- vague answer
- partially correct answer

then ask:
- a follow-up question
- clarification question
- deeper technical challenge

DO NOT immediately explain the answer.

5. Never become a teacher mid-interview.

6. Never give long tutorials.

7. Never praise every answer excessively.

8. Behave like a real interviewer:
- neutral
- analytical
- slightly challenging
- professional

9. If the candidate says:
- "I don't know"
- "idk"
- blank answer

then:
- briefly acknowledge it
- move to another relevant question

10. Keep responses under 120 words unless necessary.

11. Prefer:
- practical questions
- debugging questions
- architecture questions
- tradeoff discussions
- real-world scenarios

12. Avoid repeating previous questions.

13. Use this formatting style:

Question:
<question here>

Follow-up:
<optional follow-up here>

14. NEVER use markdown like **bold**.

15. The goal is to simulate:
- placement interviews
- fresher interviews
- junior developer interviews


16. Maintain interview continuity naturally.
        `,
      },

      ...messages.map((msg) => ({
        role: msg.role === "model" ? "assistant" : msg.role,

        content: msg.content,
      })),
    ];

    const response = await axios.post(
      OPENROUTER_API_URL,

      {
        model: "deepseek/deepseek-chat-v3-0324",

        messages: formattedMessages,

        temperature: 0.7,
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,

          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("OPENROUTER ERROR:", error.response?.data || error.message);

    return `
Interview service is temporarily busy.

Please wait a few seconds and try again.
`;
  }
};

// ========================================
// GENERATE FINAL INTERVIEW FEEDBACK
// ========================================

const generateInterviewFeedback = async (messages, jobRole, skills) => {
  try {
    const formattedConversation = messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const prompt = `
You are a senior technical interviewer.

Analyze this completed mock interview.

Role:
${jobRole}

Skills:
${skills}

Interview Transcript:
${formattedConversation}

Evaluate the candidate realistically like a placement interviewer.

IMPORTANT:
- Be honest
- Be constructive
- Do NOT overpraise weak answers
- Consider communication, depth, confidence, and technical clarity

Return ONLY valid JSON.

Rules:

* Do NOT use markdown
* Do NOT use ### headings
* Do NOT use ** bold formatting
* Do NOT use emojis
* Keep feedback concise and professional
* Use plain text only
* Keep strengths/improvements short and readable
* Feedback should feel like a real interviewer report


{
  "overallScore": 6,
  "communication": 7,
  "technicalKnowledge": 5,
  "problemSolving": 6,
  "strengths": [
    "Good understanding of React basics",
    "Comfortable with MERN terminology"
  ],
  "improvements": [
    "Needs stronger backend fundamentals",
    "Should explain concepts more clearly",
    "Needs deeper understanding of async JavaScript"
  ],
  "finalFeedback": "Candidate shows beginner-level MERN familiarity but needs stronger technical depth and structured explanations for placement readiness."
}
`;

    const response = await axios.post(
      OPENROUTER_API_URL,

      {
        model: "deepseek/deepseek-chat-v3-0324",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.4,
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,

          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("FEEDBACK ERROR:", error.response?.data || error.message);

    return JSON.stringify({
      overallScore: 5,

      communication: 5,

      technicalKnowledge: 5,

      problemSolving: 5,

      strengths: ["Attempted interview"],

      improvements: ["Needs more practice"],

      finalFeedback: "Feedback system temporarily limited.",
    });
  }
};

module.exports = {
  generateAIResponse,
  generateInterviewFeedback,
};
