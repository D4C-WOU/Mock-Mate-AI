"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        // Redirect to login after a short delay so they see the success message
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed. Try again.");
      }
    } catch (err) {
      setError("Server error. Make sure MongoDB is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Get Started</h2>
          <p className="text-slate-500 mt-2">Create your AI Interview Coach account</p>
        </div>

        {/* Error & Success Messages */}
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm font-medium">Account created! Redirecting to login...</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              required
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input
              required
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter Email Address"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input
              required
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter Password"
            />
          </div>

          <button
            disabled={loading || success}
            className={`w-full mt-4 py-3 font-bold rounded-lg transition-colors text-white 
              ${loading || success ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-black'}`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}