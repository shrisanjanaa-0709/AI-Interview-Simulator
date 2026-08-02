import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Interview() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  
  const [answers, setAnswers] = useState([]);

  const [timeLeft, setTimeLeft] = useState(60);
  const [isRecording, setIsRecording] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <h1 className="mt-10 text-center text-red-600 text-2xl">
        Browser does not support Speech Recognition
      </h1>
    );
  }

  
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

        setTimerRunning(false);

        setTimeUp(true);

        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [timerRunning]);

useEffect(() => {
  if (!timeUp) return;

  finishQuestion();

  setTimeUp(false);
}, [timeUp]);

  
  const startRecording = () => {
  resetTranscript();

  SpeechRecognition.stopListening();

  setIsRecording(true);

  setTimerRunning(true);

  SpeechRecognition.startListening({
    continuous: true,
    language: "en-US",
  });
};

  
  const stopRecording = () => {
    SpeechRecognition.stopListening();

    setIsRecording(false);

    setTimerRunning(false);
  };

  
  const finishQuestion = () => {
    if (questions.length === 0) return;
    SpeechRecognition.stopListening();

    setIsRecording(false);

    setTimerRunning(false);

    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = {
      question: questions[currentQuestion],
      answer: transcript,
    };

    setAnswers(updatedAnswers);

    localStorage.setItem(
      "answers",
      JSON.stringify(updatedAnswers)
    );

    resetTranscript();

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);

      setTimeLeft(60);
    } else {
      alert("Interview Completed!");

      navigate("/results");
    }
  };

  
  const handleNext = () => {
    finishQuestion();
  };

  
  const handlePrevious = () => {
    SpeechRecognition.stopListening();

    setIsRecording(false);

    setTimerRunning(false);

    resetTranscript();

    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);

      setTimeLeft(60);
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

        {/* Question Card */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow">

          <p className="mb-2 text-sm text-gray-500">
            Question {questions.length > 0 ? currentQuestion + 1 : 0} of{" "}
            {questions.length}
          </p>

          <h2 className="text-xl font-semibold">
            {questions.length > 0
              ? questions[currentQuestion]
              : "No interview questions found. Please upload your resume."}
          </h2>

        </div>

        {/* Recording Controls */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow">

          <h3 className="mb-4 text-lg font-semibold">
            Recording Controls
          </h3>

          <div className="flex gap-4">

            <button
              onClick={startRecording}
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
              onClick={stopRecording}
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

          <p className="mt-4 text-gray-700">
            Status :{" "}
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

        {/* Transcript */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow">

          <h3 className="mb-3 text-lg font-semibold">
            Your Answer
          </h3>

          <div className="min-h-[120px] rounded-lg border bg-gray-50 p-4">

            <p className="whitespace-pre-wrap text-gray-700">
              {transcript || "Start speaking..."}
            </p>

          </div>

        </div>

        {/* Navigation Buttons */}
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
              isRecording
            }
            className={`rounded-lg px-6 py-3 text-white ${
              questions.length === 0 || isRecording
                ? "cursor-not-allowed bg-blue-300"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Interview"
              : "Next Question"}
          </button>

        </div>

      </div>
    </div>
  );
  }

export default Interview;