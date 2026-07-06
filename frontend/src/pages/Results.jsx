import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);
import { useEffect, useState } from "react";
function Results() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const evaluate = async () => {
    const answers = JSON.parse(localStorage.getItem("answers")) || [];
    const skills = JSON.parse(localStorage.getItem("skills")) || [];

    const education = JSON.parse(localStorage.getItem("education")) || [];

    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    const experience = JSON.parse(localStorage.getItem("experience")) || [];

    if (answers.length === 0) {
      setLoading(false);
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/evaluate-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
         skills,
        education,
        projects,
        experience,
        answers,
}),
    });

    const data = await response.json();

    setEvaluations(data.results);
    setLoading(false);
  };

  evaluate();
}, []);
const technicalAverage =
  evaluations.length > 0
    ? Math.round(
        evaluations.reduce((sum, item) => sum + item.technical, 0) /
          evaluations.length
      )
    : 0;

const communicationAverage =
  evaluations.length > 0
    ? Math.round(
        evaluations.reduce((sum, item) => sum + item.communication, 0) /
          evaluations.length
      )
    : 0;

const confidenceAverage =
  evaluations.length > 0
    ? Math.round(
        evaluations.reduce((sum, item) => sum + item.confidence, 0) /
          evaluations.length
      )
    : 0;

const overallScore = Math.round(
  (technicalAverage + communicationAverage) / 2
);
if (loading) {
  return <h2 className="text-center mt-10">Evaluating answers...</h2>;
}
const chartData = {
  labels: [
    "Technical",
    "Communication",
    "Confidence",
  ],
  datasets: [
    {
      label: "Score (%)",
      data: [
        technicalAverage * 10,
        communicationAverage * 10,
        confidenceAverage * 10,
      ],
      backgroundColor: [
        "#2563eb",
        "#16a34a",
        "#9333ea",
      ],
      borderRadius: 8,
    },
  ],
};
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
            {overallScore * 10}%
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
              <span>{technicalAverage * 10}%</span>
            </div>

            <div className="h-3 rounded-full bg-gray-200">
              <div
  className="h-3 rounded-full bg-blue-600"
  style={{ width: `${technicalAverage * 10}%` }}
></div>
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-2 flex justify-between">
              <span>Communication Skills</span>
              <span>{communicationAverage * 10}%</span>
            </div>

            <div className="h-3 rounded-full bg-gray-200">
              <div
  className="h-3 rounded-full bg-green-600"
  style={{ width: `${communicationAverage * 10}%` }}
></div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span>Confidence</span>
              <span>{confidenceAverage * 10}%</span>
            </div>

            <div className="h-3 rounded-full bg-gray-200">
              <div
  className="h-3 rounded-full bg-purple-600"
  style={{ width: `${confidenceAverage * 10}%` }}
></div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-xl bg-white p-6 shadow">
  <h3 className="mb-4 text-xl font-semibold">
    Performance Chart
  </h3>

  <div className="h-80">
  <Bar
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false,
    }}
  />
</div>
</div> 

        <div className="mb-8 rounded-xl bg-white p-6 shadow">
  <h3 className="mb-3 text-xl font-semibold">
    AI Feedback
  </h3>

  {evaluations.map((item, index) => (
  <div key={index} className="mb-4 border-b pb-4">
    <h4 className="font-semibold">
      Question {index + 1}
    </h4>

    <p className="text-gray-700">
      {item.feedback}
    </p>
  </div>
))}
</div>

        {/* Strengths and Improvements */}
        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-semibold text-green-600">
              Strengths
            </h3>

            <ul className="space-y-2 text-gray-700">
  {evaluations.flatMap(item => item.strengths).map((strength, index) => (
    <li key={index}>✓ {strength}</li>
  ))}
</ul>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-semibold text-red-600">
              Areas to Improve
            </h3>

            <ul className="space-y-2 text-gray-700">
  {evaluations.flatMap(item => item.improvements).map((improvement, index) => (
    <li key={index}>• {improvement}</li>
  ))}
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