"use client";

import { useEffect, useState } from "react";
import { checkAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { API_URL } from "@/lib/configl";

export default function DashboardPage() {
  const [interviews, setInterviews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = checkAuth();

    if (token) {
      fetchInterviews(token);
    }
  }, []);

  const fetchInterviews = async (token) => {
    try {
      const res = await apiFetch(
        `${API_URL}/interviews/my-interviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setInterviews(data);
      } else {
        setInterviews([]);
        console.error("Dashboard Error:", data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = (interview) => {
    localStorage.setItem(
      "retakeInterview",
      JSON.stringify({
        jobRole: interview.jobRole,
        experienceLevel: interview.experienceLevel,
        skills: interview.skills,
      }),
    );

    window.location.href = "/setup";
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await apiFetch(`${API_URL}/interviews/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      // remove deleted interview from UI instantly
      setInterviews((prev) => prev.filter((interview) => interview._id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>

            <p className="text-slate-500 mt-2">Your interview history</p>
          </div>

          <Link
            href="/setup"
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
            New Interview
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : interviews.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              No Interviews Yet
            </h2>

            <p className="text-slate-500">Start your first mock interview.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((interview) => (
              <div
                key={interview._id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
              >
                <h2 className="text-xl font-bold text-slate-900">
                  {interview.jobRole}
                </h2>

                <p className="text-slate-500 mt-2">
                  {interview.experienceLevel}
                </p>

                <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                  {interview.skills}
                </p>
                <p
                  className={`mt-3 text-sm font-semibold ${interview.status === "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                    }`}
                >
                  {interview.status.toUpperCase()}
                </p>

                <p className="text-sm text-slate-400 mt-3">
                  {new Date(interview.createdAt).toLocaleDateString()}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/interview?id=${interview._id}`}
                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Continue
                  </Link>

                  <button
                    onClick={() => handleRetake(interview)}
                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Retake
                  </button>

                  <button
                    onClick={() => handleDelete(interview._id)}
                    className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
