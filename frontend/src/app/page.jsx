import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-slate-900">
      {/* Hero Section */}
      <div className="max-w-4xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tight">
            MockMate <span className="text-indigo-600">AI</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Master your next technical interview with real-time AI feedback.
            Built for developers, by developers.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/setup"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
          >
            Start Free Mock Interview
          </Link>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-6 py-4 border-2 border-slate-200 font-semibold rounded-xl hover:bg-slate-50 transition-all"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="pt-12 flex justify-center gap-8 text-sm font-medium text-slate-400 uppercase tracking-widest">
          <span>Powered by Gemini 2.0</span>
          <span>•</span>
          <span>Next.js 15</span>
          <span>•</span>
          <span>FastAPI</span>
        </div>
      </div>
    </main>
  );
}