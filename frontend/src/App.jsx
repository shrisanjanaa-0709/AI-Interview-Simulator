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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        
        <Route path="/" element={<Home />} />

        <Route path="/upload" element={<ResumeUpload />} />

        <Route path="/interview" element={<Interview />} />

        <Route path="/results" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;