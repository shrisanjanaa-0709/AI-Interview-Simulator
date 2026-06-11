import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/signup">Sign Up</Link>{" "}
      <Link to="/login">Login</Link>{" "}

      
      <Link to="/">Home</Link>{" "}
      <Link to="/upload">Upload Resume</Link>{" "}
      <Link to="/interview">Interview</Link>{" "}
      <Link to="/results">Results</Link>
    </nav>
  );
}

export default Navbar;