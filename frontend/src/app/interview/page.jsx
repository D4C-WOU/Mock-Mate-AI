"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function InterviewPage() {
  // --- SPRINT 5: DYNAMIC DATA ---
  // In a real app, you'd fetch this from MongoDB in a useEffect.
  // For now, we'll initialize it with your actual profile info.
  const [userProfile, setUserProfile] = useState({
    role: "Full Stack Developer",
    skills: "React, Next.js, FastAPI, MongoDB, Tailwind"
  });

  const [messages, setMessages] = useState([
    { role: "model", content: `Hello! I am your AI Mock Interviewer. I see you are applying for a ${userProfile.role} position. Are you ready to begin?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false); // Track if interview is over
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading || isFinished) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          jobRole: userProfile.role,
          skills: userProfile.skills
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- SPRINT 5: FEEDBACK ENGINE ---
  const handleEndInterview = async () => {
    setLoading(true);
    setIsFinished(true); // Disable further input

    const feedbackPrompt = {
      role: "user",
      content: "The interview is now over. Please provide a formal feedback report. Include: 1. A Score out of 10. 2. Specific Strengths. 3. Areas for Improvement."
    };

    const finalMessages = [...messages, feedbackPrompt];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: finalMessages,
          jobRole: userProfile.role,
          skills: userProfile.skills
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
      }
    } catch (error) {
      console.error("Feedback Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Technical Interview</h1>
          <p className="text-sm text-slate-500">Role: {userProfile.role}</p>
        </div>

        {/* SPRINT 5: END INTERVIEW BUTTON */}
        {!isFinished ? (
          <button
            onClick={handleEndInterview}
            className="px-4 py-2 text-sm font-bold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
          >
            Finish & Get Feedback
          </button>
        ) : (
          <Link href="/" className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
            Exit to Home
          </Link>
        )}
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-4 whitespace-pre-wrap ${msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                    : "bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm"
                  }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      {!isFinished && (
        <footer className="bg-white border-t border-slate-200 p-4">
          <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Answer the question..."
              className="flex-1 px-5 py-4 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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