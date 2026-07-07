import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});
const [loading, setLoading] = useState(false);
const handleSignup = async (e) => {
    e.preventDefault();

    if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
    ) {
        alert("Please fill all fields");
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        if (formData.password.length < 8) {
        alert("Password must be at least 8 characters");
        return;
}
        alert("Passwords do not match");
        return;
    }
    setLoading(true);
    try {

        const response = await axios.post(
            "http://localhost:5000/api/auth/signup",
            {
                name: formData.name,
                email: formData.email,
                password: formData.password
            }
        );

        alert(response.data.message);

        navigate("/login");

    } catch (error) {

        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Unable to connect to server");
        }
        

    }
    finally {
    setLoading(false);
}
};
const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Start practicing interviews with AI.
        </p>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                  {loading ? "Creating Account..." : "Sign Up"}
              </button>
          </div>
         </form> 
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;