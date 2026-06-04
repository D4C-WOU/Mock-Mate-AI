"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

export default function DashboardPage() {

  const [interviews, setInterviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    fetchInterviews();

  }, []);




  const fetchInterviews = async () => {

    try {

      const token =
        localStorage.getItem("token");


      const res = await fetch(
        "http://localhost:5000/api/interviews/my-interviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      'retakeInterview',
      JSON.stringify({
        jobRole: interview.jobRole,
        experienceLevel: interview.experienceLevel,
        skills: interview.skills,
      })
    )

    window.location.href = '/setup'
  }


  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Your interview history
            </p>
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

            <p className="text-slate-500">
              Start your first mock interview.
            </p>
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

                <p className="text-sm text-slate-400 mt-3">
                  {new Date(
                    interview.createdAt
                  ).toLocaleDateString()}
                </p>



                <div className="mt-6 flex gap-3">

                  <Link
                    href={`/interview?id=${interview._id}`}

                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Continue
                  </Link>

                  <button onClick={() => handleRetake(interview)}
                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Retake
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