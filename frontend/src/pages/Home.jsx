import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">

          <h1 className="text-5xl font-bold text-gray-900">
            AI Interview Simulator
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Prepare for technical interviews with AI-generated questions,
            resume-based assessments, voice responses, and detailed
            performance analysis.
          </p>

          <div className="mt-10 flex justify-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg bg-blue-600 px-7 py-3 text-white hover:bg-blue-700"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="rounded-lg border border-blue-600 px-7 py-3 text-blue-600 hover:bg-blue-50"
            >
              Create Account
            </button>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto mb-16 grid max-w-6xl gap-6 px-6 md:grid-cols-3">

        <div className="rounded-xl bg-white p-8 text-center shadow">
          <h2 className="text-4xl font-bold text-blue-600">AI</h2>
          <p className="mt-2 text-gray-600">
            Resume-Based Interview
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 text-center shadow">
          <h2 className="text-4xl font-bold text-green-600">10</h2>
          <p className="mt-2 text-gray-600">
            Technical Questions
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 text-center shadow">
          <h2 className="text-4xl font-bold text-purple-600">PDF</h2>
          <p className="mt-2 text-gray-600">
            Detailed Performance Report
          </p>
        </div>

      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-20">

        <h2 className="mb-10 text-center text-3xl font-bold">
          Features
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-semibold">
              Resume Parsing
            </h3>

            <p className="text-gray-600">
              Upload your resume and automatically extract skills,
              education, projects, and experience.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-semibold">
              AI Questions
            </h3>

            <p className="text-gray-600">
              Gemini AI generates personalized technical interview
              questions based on your resume.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-semibold">
              Voice Interview
            </h3>

            <p className="text-gray-600">
              Answer interview questions naturally using speech
              recognition.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-semibold">
              AI Evaluation
            </h3>

            <p className="text-gray-600">
              Receive technical scores, communication analysis,
              confidence rating, strengths, and improvements.
            </p>
          </div>

        </div>

      </section>

      {/* How it Works */}
      <section className="bg-white py-16">

        <h2 className="mb-12 text-center text-3xl font-bold">
          How It Works
        </h2>

        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              1
            </div>
            <h3 className="font-semibold">Create Account</h3>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              2
            </div>
            <h3 className="font-semibold">Upload Resume</h3>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              3
            </div>
            <h3 className="font-semibold">Take Interview</h3>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              4
            </div>
            <h3 className="font-semibold">View AI Report</h3>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-white">

        <h3 className="text-xl font-semibold">
          AI Interview Simulator
        </h3>

        <p className="mt-2 text-gray-400">
          Built with React, FastAPI, Node.js, Express.js, MongoDB Atlas and Gemini AI.
        </p>

      </footer>

    </div>
  );
}

export default Home;