"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // For now, we just simulate a delay and move to the interview
    // In Sprint 4, we'll pass this data to the Gemini API
    setTimeout(() => {
      router.push("/interview");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Configure Your Interview</h1>
          <p className="text-slate-500 mt-2">
            Give MockMate some context so the AI can generate relevant questions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Role */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Target Job Role
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Full Stack Developer, Data Analyst"
              className="w-full px-4 py-3 rounded-xl text-slate-900 placeholder:text-slate-500 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Experience Level
            </label>
            <select className="w-full px-4 py-3 rounded-xl text-slate-900 placeholder:text-slate-500 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
              <option>Entry Level / Fresher</option>
              <option>Junior (1-2 Years)</option>
              <option>Mid-Level (3-5 Years)</option>
              <option>Senior (5+ Years)</option>
            </select>
          </div>

          {/* Job Description / Tech Stack */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Job Description or Key Skills
            </label>
            <textarea
              required
              rows="5"
              placeholder="Paste the job description or list skills (e.g. React, Node.js, Python, System Design)"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg 
              ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'}`}
          >
            {loading ? "Generating Interview Questions..." : "Start Mock Interview"}
          </button>
        </form>
      </div>
    </div>
  );
}