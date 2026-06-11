function Results() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-center text-3xl font-bold">
          Interview Performance Report
        </h1>

        {/* Overall Score */}
        <div className="mb-8 rounded-xl bg-white p-8 text-center shadow">
          <p className="mb-2 text-gray-500">Overall Score</p>

          <h2 className="text-5xl font-bold text-blue-600">
            82%
          </h2>
        </div>

        {/* Skills Analysis */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow">
          <h3 className="mb-6 text-xl font-semibold">
            Performance Analysis
          </h3>

          <div className="mb-5">
            <div className="mb-2 flex justify-between">
              <span>Technical Knowledge</span>
              <span>80%</span>
            </div>

            <div className="h-3 rounded-full bg-gray-200">
              <div className="h-3 w-4/5 rounded-full bg-blue-600"></div>
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-2 flex justify-between">
              <span>Communication Skills</span>
              <span>75%</span>
            </div>

            <div className="h-3 rounded-full bg-gray-200">
              <div className="h-3 w-3/4 rounded-full bg-green-600"></div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span>Confidence</span>
              <span>85%</span>
            </div>

            <div className="h-3 rounded-full bg-gray-200">
              <div className="h-3 rounded-full bg-purple-600" style={{ width: "85%" }}></div>
            </div>
          </div>
        </div>

        {/* Strengths and Improvements */}
        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-semibold text-green-600">
              Strengths
            </h3>

            <ul className="space-y-2 text-gray-700">
              <li>✓ Strong React fundamentals</li>
              <li>✓ Clear explanations</li>
              <li>✓ Good problem-solving approach</li>
            </ul>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-semibold text-red-600">
              Areas to Improve
            </h3>

            <ul className="space-y-2 text-gray-700">
              <li>• Improve confidence while speaking</li>
              <li>• Reduce filler words</li>
              <li>• Provide more real-world examples</li>
            </ul>
          </div>

        </div>

        {/* Download Button */}
        <div className="mt-8 text-center">
          <button className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Download PDF Report
          </button>
        </div>

      </div>
    </div>
  );
}

export default Results;