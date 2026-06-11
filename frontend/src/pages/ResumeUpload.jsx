function ResumeUpload() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Upload Your Resume
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Upload your resume to generate personalized interview questions.
        </p>

        <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="mb-4"
          />

          <p className="text-gray-500">
            Supported formats: PDF, DOC, DOCX
          </p>
        </div>

        <button className="mt-8 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
          Continue
        </button>
      </div>
    </div>
  );
}

export default ResumeUpload;