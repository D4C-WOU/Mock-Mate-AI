# MockMate AI 🎤🤖

> An AI-powered mock interview platform that behaves like a real technical interviewer — not a chatbot.

**Live Demo:** https://mock-mate-ai-gamma.vercel.app/

## Why I built this
Most "AI interview" tools online are just chatbots with a system prompt slapped on — they answer off-topic questions, break character, and don't actually feel like an interview. I wanted to build one that behaves like an actual technical interviewer end-to-end: asks one question at a time, listens for weak answers, follows up, escalates difficulty, and gives structured feedback at the end — with hard guard rails so it can't be derailed into being a general chatbot.

## Features
- 🔐 JWT authentication with protected routes
- 🎯 Interview setup by job role, skills, and experience level
- 💬 Adaptive, one-question-at-a-time interview flow with contextual follow-ups
- 📈 Difficulty that increases as the candidate answers correctly
- 🧠 Structured AI feedback: overall score, communication, technical knowledge, problem-solving, strengths & improvements
- 📊 Dashboard to track active, completed, and past interviews
- ▶️ Resume, retake, or delete any interview
- 🛡️ Guard-railed AI: refuses jokes, roleplay, and prompt-injection attempts, and always redirects back to the interview

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | Next.js (App Router), React, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT |
| AI | OpenRouter API (DeepSeek Chat v3) |
| Deployment | Vercel (frontend), Render (backend) |

## Architecture
User → Interview Setup → Interview Session (AI-driven Q&A, stored per message)
→ Finish & Get Feedback → Feedback Prompt (separate from interview prompt)
→ Structured JSON feedback stored → Dashboard updated

Two separate LLM prompts are used deliberately:
1. **Interview Prompt** — governs question flow, follow-ups, and difficulty scaling. Hard guard rails prevent it from ever leaving "interviewer mode."
2. **Feedback Prompt** — runs only once, after completion, and returns strictly structured JSON (no freeform text) so it can be rendered directly on the dashboard.

## API Endpoints
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Authenticate and receive JWT |
| POST | `/api/interviews/setup` | Create a new interview (role, skills, experience) |
| POST | `/api/interviews/chat` | Send/receive interview messages |
| GET | `/api/interviews/my-interviews` | List all interviews for the logged-in user |
| GET | `/api/interviews/:id` | Get a single interview |
| PUT | `/api/interviews/:id/feedback` | Generate & store final feedback |
| DELETE | `/api/interviews/:id` | Delete an interview |

## Project Structure
frontend/
├── app/
├── components/
├── lib/
└── public/

backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
└── utils/


## Getting Started
```bash
# Backend
cd backend
npm install
# create a .env with MONGO_URI, JWT_SECRET, OPENROUTER_API_KEY
npm run dev

# Frontend
cd frontend
npm install
# create a .env.local with NEXT_PUBLIC_API_URL
npm run dev
```

## Challenges & What I Learned
- Designing prompt guard rails that reliably keep an LLM "in character" as an interviewer rather than reverting to general chat behavior.
- Handling Next.js App Router production build issues (Suspense boundaries with `useSearchParams`).
- Structuring MongoDB documents so a multi-turn AI conversation could be persisted and resumed without losing context.
- Configuring CORS correctly across a split Vercel/Render deployment.

## Future Improvements
- Voice-based interviews with speech-to-text
- Webcam-based behavioral analysis
- In-browser coding editor for DSA rounds
- Company-specific interview templates
- PDF export of feedback reports

## License
MIT
