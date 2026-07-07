import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ResumeUpload from "./pages/ResumeUpload";
import Interview from "./pages/Interview";
import Results from "./pages/Results";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
    path="/upload"
    element={
        <ProtectedRoute>
            <ResumeUpload />
        </ProtectedRoute>
    }
/>

<Route
    path="/interview"
    element={
        <ProtectedRoute>
            <Interview />
        </ProtectedRoute>
    }
/>

<Route
    path="/results"
    element={
        <ProtectedRoute>
            <Results />
        </ProtectedRoute>
    }
/>
      </Routes>
    </>
  );
}

export default App;