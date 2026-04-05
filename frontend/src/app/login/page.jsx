"use client";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Log in to your MockMate account</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg text-slate-900 placeholder:text-slate-500 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg text-slate-900 placeholder:text-slate-500 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
            Log In
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-indigo-600 font-bold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}