import { useState } from "react";

function ResumeUpload() {
  const [resume, setResume] = useState(null);

  const handleUpload = async () => {
    // Check if a file is selected
    if (!resume) {
      alert("Please select a PDF resume.");
      return;
    }

    // Create FormData object
    const formData = new FormData();

    // "resume" must match upload.single("resume") in backend
    formData.append("resume", resume);

    try {
      const response = await fetch(
        "http://localhost:5000/api/upload/resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || "Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Something went wrong while uploading.");
    }
  };

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
          <label className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Choose PDF

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                setResume(e.target.files[0]);
              }}
            />
          </label>

          <p className="mt-6 text-gray-500">
            Supported format: PDF only
          </p>

          {resume ? (
            <p className="mt-3 text-green-600">
              Selected file: {resume.name}
            </p>
          ) : (
            <p className="mt-3 text-gray-500">
              No file selected
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          className="mt-8 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Upload Resume
        </button>
      </div>
    </div>
  );
}

export default ResumeUpload;