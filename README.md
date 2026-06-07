# 🚀 MockMate AI – AI Powered Mock Interview Platform

An intelligent full-stack web application that simulates real-world technical interviews using AI. MockMate AI helps users practice interviews, receive instant feedback, and improve performance with structured evaluations.

🌐 **Live Demo:** https://mock-mate-ai-gamma.vercel.app/

---

# 📌 Overview

MockMate AI is designed to replicate real interview environments for developers and job seekers. It generates dynamic questions based on role, skills, and experience level, evaluates answers using AI, and provides structured feedback at the end of each session.

### Project Goals

* Real-time AI interaction
* Interview simulation logic
* Feedback generation system
* Full-stack production deployment

---

# ✨ Features

## 🎯 AI Mock Interview System

* Dynamic question generation based on job role
* Adaptive questioning based on user responses
* Follow-up questions for deeper evaluation

## 📊 AI Feedback Engine

* Automated interview evaluation
* Score generation (out of 10)
* Strengths and weaknesses analysis
* Improvement suggestions

## 📁 Interview Management

* Create new interview sessions
* Resume ongoing interviews
* View interview history dashboard
* Mark interviews as completed after feedback

## 🔐 Authentication System

* Secure user login/signup
* JWT-based authentication
* Protected routes for interview data

## 📱 Dashboard

* View all past interviews
* Status tracking (Active / Completed)
* Retake interview functionality

---

# 🧠 System Architecture

```text
Frontend (Next.js)
        │
        ▼
Backend API (Node.js + Express)
        │
        ▼
AI Layer (OpenRouter / OpenAI API)
        │
        ▼
Database (MongoDB Atlas)
```

---

# 🛠 Tech Stack

## Frontend

* Next.js (App Router)
* React.js
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication

## AI Integration

* OpenRouter API
* DeepSeek Models
* OpenAI Models

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# 📂 Core Modules

## 1️⃣ Interview Engine

Responsible for:

* Question generation
* Conversation flow management
* Adaptive follow-up questions
* Session tracking

## 2️⃣ Feedback System

Responsible for:

* Analyzing interview conversations
* Generating structured evaluations
* Scoring performance
* Providing actionable feedback

## 3️⃣ User Dashboard

Responsible for:

* Tracking interview history
* Managing active and completed interviews
* Retake interview functionality

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js (v18+ recommended)
* MongoDB Atlas Account
* OpenRouter API Key
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/mockmate-ai.git
cd mockmate-ai
```

---

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

---

## 3. Install Backend Dependencies

Open a new terminal:

```bash
cd backend
npm install
```

Run the backend:

```bash
npm start
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend directory.

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

OPENROUTER_API_KEY=your_api_key
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mockmate

JWT_SECRET=mySuperSecretKey

OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
```

---

# 📦 API Endpoints

## Authentication

### Register User

```http
POST /auth/signup
```

### Login User

```http
POST /auth/login
```

---

## Interviews

### Create Interview Session

```http
POST /interviews/setup
```

### Interview Chat

```http
POST /interviews/chat
```

### Get User Interviews

```http
GET /interviews/my-interviews
```

### Get Interview By ID

```http
GET /interviews/:id
```

### Generate Feedback

```http
PUT /interviews/:id/feedback
```

### Delete Interview

```http
DELETE /interviews/:id
```

---

# 📸 Application Workflow

1. User signs up or logs in.
2. User creates a new interview session.
3. AI generates role-specific interview questions.
4. User answers questions in real-time.
5. AI asks adaptive follow-up questions.
6. Interview ends.
7. AI analyzes responses.
8. Feedback report is generated.
9. User reviews scores and suggestions from the dashboard.

---

# 📈 Key Learnings

Through building MockMate AI, the following concepts were explored:

* Building AI-driven conversational systems
* Managing real-time chat state in React
* Designing structured prompts for LLMs
* Implementing JWT authentication
* Creating scalable REST APIs
* Handling production deployment
* Managing CORS and API integrations
* Working with cloud-hosted databases

---

# ⚠️ Known Issues

* Initial requests may be slower due to backend cold starts on Render.
* AI response latency depends on the selected model.
* Long interview sessions may slightly increase response times.

---

# 🌟 Future Improvements

* 🎤 Voice-based interview mode
* 📄 Resume upload and evaluation
* 🏢 Company-specific interview modes (Google, Amazon, Microsoft, etc.)
* 📊 Advanced analytics dashboard
* 📹 Video interview simulation
* 🧩 Coding challenge integration
* 📝 Interview transcript export

---


# 👨‍💻 Author

**Nand Joshi**

* GitHub: https://github.com/D4C-WOU
* LinkedIn: https://www.linkedin.com/in/nand-joshi

---

# 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star on GitHub!
