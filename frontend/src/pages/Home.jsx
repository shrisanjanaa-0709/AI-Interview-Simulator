function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-900">
          AI Interview Simulator
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Practice interviews with AI-generated questions, voice responses,
          and detailed performance analysis.
        </p>

        <div className="flex justify-center gap-4">
          <button className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Start Interview
          </button>

          <button className="rounded-lg border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-50">
            Upload Resume
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid gap-6 px-6 pb-20 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="mb-3 text-xl font-semibold">
            Resume-Based Questions
          </h3>

          <p className="text-gray-600">
            Generate interview questions based on your uploaded resume.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="mb-3 text-xl font-semibold">
            Voice Interviews
          </h3>

          <p className="text-gray-600">
            Answer naturally using speech recognition technology.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="mb-3 text-xl font-semibold">
            AI Performance Analysis
          </h3>

          <p className="text-gray-600">
            Receive detailed feedback and improvement suggestions.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;