"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { API_URL } from "@/lib/configl";

export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const res = await apiFetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );


      const data = await res.json();
      console.log(data)

      if (res.ok) {

        localStorage.setItem(
          "token",
          data.token
        );

        window.location.href = "/dashboard";

      } else {

        setError(
          data.message || "Login failed"
        );
      }

    } catch (error) {

      console.error(error);

      setError("Server Error");

    } finally {

      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">

        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h2>

          <p className="text-slate-500 mt-2">
            Log in to your MockMate account
          </p>
        </div>



        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}



        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}
          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"

              name="email"

              value={formData.email}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }

              className="w-full px-4 py-3 rounded-lg text-slate-900 placeholder:text-slate-500 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"

              placeholder="name@example.com"
            />
          </div>



          {/* PASSWORD */}
          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"

              name="password"

              value={formData.password}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }

              className="w-full px-4 py-3 rounded-lg text-slate-900 placeholder:text-slate-500 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"

              placeholder="••••••••"
            />
          </div>



          <button
            disabled={loading}

            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-slate-400"
          >
            {loading
              ? "Logging In..."
              : "Log In"}
          </button>

        </form>



        <p className="text-center mt-6 text-slate-600 text-sm">

          Don't have an account?{" "}

          <Link
            href="/signup"

            className="text-indigo-600 font-bold hover:underline"
          >
            Create one
          </Link>

        </p>
      </div>
    </div>
  );
}