"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { apiFetch } from "@/lib/api";
import { API_URL } from "@/lib/config";

export default function InterviewClient() {
  const [userProfile, setUserProfile] = useState({
    role: "Full Stack Developer",
    skills: "React, Next.js, FastAPI, MongoDB, Tailwind",
    experienceLevel: "Entry Level / Fresher",
  });

  const [interviewId, setInterviewId] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "model",
      content: "Hello! I am your AI Mock Interviewer. Are you ready to begin?",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [isFinished, setIsFinished] = useState(false);

  const searchParams = useSearchParams();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interviewIdFromUrl = searchParams.get("id");

    const storedInterviewId = localStorage.getItem("interviewId");

    const finalInterviewId = interviewIdFromUrl || storedInterviewId;

    if (finalInterviewId) {
      setInterviewId(finalInterviewId);

      fetchInterview(finalInterviewId);
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const fetchInterview = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await apiFetch(`${API_URL}/api/interviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUserProfile({
          role: data.jobRole,
          skills: data.skills,
          experienceLevel: data.experienceLevel,
        });

        if (data.messages?.length > 0) {
          setMessages(data.messages);
        }
      }
    } catch (error) {
      console.error("Fetch Interview Error:", error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim() || loading || isFinished) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const newMessages = [...messages, userMessage];

    setMessages(newMessages);

    setInput("");

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await apiFetch(`${API_URL}/api/interviews/chat`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          interviewId,
          messages: newMessages,
          experienceLevel: userProfile.experienceLevel,
          jobRole: userProfile.role,
          skills: userProfile.skills,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: data.text,
          },
        ]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndInterview = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const feedbackPrompt = {
        role: "user",
        content:
          "The interview is now over. Please provide concise professional interview feedback with score, strengths, weaknesses, and improvement advice.",
      };

      const finalMessages = [...messages, feedbackPrompt];

      const token = localStorage.getItem("token");

      const feedbackRes = await apiFetch(`${API_URL}/api/interviews/chat`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          interviewId,
          messages: finalMessages,
          jobRole: userProfile.role,
          experienceLevel: userProfile.experienceLevel,
          skills: userProfile.skills,
        }),
      });

      const feedbackData = await feedbackRes.json();

      if (!feedbackRes.ok) {
        alert(feedbackData.message || "AI temporarily unavailable");

        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: feedbackData.text,
        },
      ]);

      await apiFetch(`${API_URL}/api/interviews/${interviewId}/feedback`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          feedback: {
            score: "Completed",
            strengths: feedbackData.text,
            improvements: feedbackData.text,
          },
        }),
      });

      setIsFinished(true);
    } catch (error) {
      console.error("Feedback Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Technical Interview
          </h1>

          <p className="text-sm text-slate-500">Role: {userProfile.role}</p>
        </div>

        {!isFinished ? (
          <button
            onClick={handleEndInterview}
            disabled={loading}
            className="px-4 py-2 text-sm font-bold text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
          >
            Finish & Get Feedback
          </button>
        ) : (
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            Exit to Home
          </Link>
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-4 whitespace-pre-wrap ${msg.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-slate-200 text-slate-800"
                  }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && <div className="text-slate-500">AI is thinking...</div>}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {!isFinished && (
        <footer className="bg-white border-t border-slate-200 p-4 shrink-0">
          <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-4 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Answer the question..."
              className="flex-1 px-5 py-4 rounded-xl border border-slate-300 bg-white text-black 
              placeholder:text-slate-400 caret-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              disabled={loading || !input.trim()}
              className="px-8 py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 transition-all"
            >
              Send
            </button>
          </form>
        </footer>
      )}
    </div>
  );
}
