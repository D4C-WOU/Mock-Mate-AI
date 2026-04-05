"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function InterviewPage() {
  const [messages, setMessages] = useState([
    { role: "model", content: "Hello! I am your AI Mock Interviewer. I've reviewed your profile. Are you ready to begin the interview?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the newest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // In a full build, jobRole and skills would be pulled from the Setup page state/database
        body: JSON.stringify({
          messages: newMessages,
          jobRole: "Full Stack Developer",
          skills: "React, Next.js, FastAPI, MongoDB, Tailwind"
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
      } else {
        setMessages((prev) => [...prev, { role: "model", content: "System error: Unable to reach the interviewer." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "model", content: "Network error: Please check your connection." }]);
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
          <p className="text-sm text-slate-500">Role: Full Stack Developer</p>
        </div>
        <Link href="/" className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all">
          End Interview
        </Link>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-4 ${msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                    : "bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm"
                  }`}
              >
                {/* Simple formatting for line breaks */}
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={i !== 0 ? "mt-2" : ""}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm flex gap-2 items-center">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="bg-white border-t border-slate-200 p-4">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Type your answer here..."
            className="flex-1 px-5 py-4 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button
            disabled={loading || !input.trim()}
            className={`px-8 py-4 rounded-xl font-bold text-white transition-all ${loading || !input.trim()
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
              }`}
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}