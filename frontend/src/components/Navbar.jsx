import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between bg-blue-600 px-6 py-4 text-white">

      <Link
        to="/"
        className="text-xl font-bold"
      >
        AI Interview Simulator
      </Link>

      <div className="flex items-center gap-6">

        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/upload">
              Upload Resume
            </Link>

            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-4 py-2 hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Sign Up
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;