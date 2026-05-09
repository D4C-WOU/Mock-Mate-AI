"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    jobRole: "",
    experienceLevel: "",
    skills: ""
  })


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem('token')

      const res = await fetch("http://localhost:5000/api/interviews/setup", {
        method: "POST",

        headers: {
          "Content Type": "application/json",
          Authoriztion: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await JSON.stringify(formData)

      if (res.ok) {

        localStorage.setItem(
          "interviewData",
          JSON.stringify(formData)
        )

        router.push('/interview')

      } else {
        alert(data.message || "Failed tp  create Interview")
      }

    } catch (error) {

      console.error("Interview setup error:", error)

    } finally {

      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Configure Your Interview
          </h1>
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
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              placeholder="e.g. Full Stack Developer, Data Analyst"
              className="w-full px-4 py-3 rounded-xl text-slate-900 placeholder:text-slate-500 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl text-slate-900 placeholder:text-slate-500 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
              <option value="">Select Experience Level</option>
              <option> Entry Level / Fresher</option>
              <option>Junior (1-2 Years)</option>
              <option>Mid-Level (3-5 Years)</option>
              <option>Senior (5+ Years)</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Job Description or Key Skills
            </label>
            <textarea
              required
              rows="5"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
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