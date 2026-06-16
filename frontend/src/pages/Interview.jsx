import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Interview() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [timeLeft, setTimeLeft] = useState(60);

  const [isRecording, setIsRecording] = useState(false);

  const [timerRunning, setTimerRunning] = useState(false);
  const [questionFinished, setQuestionFinished] = useState(false);

  
  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions");

    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  
  useEffect(() => {
  if (!timerRunning) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);

        setQuestionFinished(true);

        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [timerRunning]);
useEffect(() => {
  if (!questionFinished) return;

  setIsRecording(false);

  setTimerRunning(false);

  setQuestionFinished(false);

  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion((prev) => prev + 1);

    setTimeLeft(60);
  } else {
    alert("Interview Completed!");

    navigate("/results");
  }
}, [
  questionFinished,
  currentQuestion,
  questions.length,
  navigate,
]);

    

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);

      setTimeLeft(60);

      setIsRecording(false);

      setTimerRunning(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);

      setTimeLeft(60);

      setIsRecording(false);

      setTimerRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-center text-3xl font-bold">
          AI Interview Session
        </h1>

        <p className="mb-6 text-center text-2xl font-semibold text-red-600">
          Time Remaining: {timeLeft} seconds
        </p>

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <p className="mb-2 text-sm text-gray-500">
            Question{" "}
            {questions.length > 0 ? currentQuestion + 1 : 0} of{" "}
            {questions.length}
          </p>

          <h2 className="text-xl font-semibold">
            {questions.length > 0
              ? questions[currentQuestion]
              : "No interview questions found. Please upload a resume first."}
          </h2>
        </div>

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">
            Recording Controls
          </h3>

          <div className="flex gap-4">
            <button
              onClick={() => {
  setIsRecording(true);

  if (!timerRunning) {
    setTimerRunning(true);
  }
}}
              disabled={isRecording}
              className={`rounded-lg px-5 py-3 text-white ${
                isRecording
                  ? "cursor-not-allowed bg-green-300"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Start Recording
            </button>

            <button
              onClick={() => {
                setIsRecording(false);
                setTimerRunning(false);
              }}
              disabled={!isRecording}
              className={`rounded-lg px-5 py-3 text-white ${
                !isRecording
                  ? "cursor-not-allowed bg-red-300"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Stop Recording
            </button>
          </div>

          <p className="mt-4 text-gray-600">
            Status:{" "}
            <span
              className={`font-semibold ${
                isRecording
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {isRecording
                ? "Recording..."
                : "Not Recording"}
            </span>
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h3 className="mb-3 text-lg font-semibold">
            Your Answer
          </h3>

          <p className="text-gray-600">
            Your speech-to-text response will appear here...
          </p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`rounded-lg px-6 py-3 text-white ${
              currentQuestion === 0
                ? "cursor-not-allowed bg-gray-400"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={
              questions.length === 0 ||
              currentQuestion === questions.length - 1
            }
            className={`rounded-lg px-6 py-3 text-white ${
              questions.length === 0 ||
              currentQuestion === questions.length - 1
                ? "cursor-not-allowed bg-blue-300"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default Interview;