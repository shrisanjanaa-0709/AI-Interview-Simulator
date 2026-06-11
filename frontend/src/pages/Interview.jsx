function Interview() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        
        <h1 className="mb-6 text-center text-3xl font-bold">
          AI Interview Session
        </h1>

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <p className="mb-2 text-sm text-gray-500">
            Question 1 of 10
          </p>

          <h2 className="text-xl font-semibold">
            Tell me about yourself and your technical background.
          </h2>
        </div>

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">
            Recording Controls
          </h3>

          <div className="flex gap-4">
            <button className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700">
              Start Recording
            </button>

            <button className="rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700">
              Stop Recording
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h3 className="mb-3 text-lg font-semibold">
            Your Answer
          </h3>

          <p className="text-gray-600">
            Your speech-to-text response will appear here...
          </p>
        </div>

        <div className="text-right">
          <button className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Next Question
          </button>
        </div>

      </div>
    </div>
  );
}

export default Interview;