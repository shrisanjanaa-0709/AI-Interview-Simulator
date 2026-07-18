import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleLogin = async (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {
        alert("Please fill all fields");
        return;
    }

    setLoading(true);

    try {

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/login`,
            {
                email: formData.email,
                password: formData.password
            }
        );

        localStorage.setItem(
    "token",
    response.data.token
);

localStorage.setItem(
    "token",
    response.data.token
);

localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
);
        alert(response.data.message);

        navigate("/upload");

    } catch (error) {

        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Unable to connect to server");
        }

    } finally {

        setLoading(false);

    }

};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Sign in to continue your interview practice.
        </p>

        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              value={formData.password}
              onChange={handleChange}
           />
          </div>
             
             <div className="mt-6">
    <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
    >
        {loading ? "Logging In..." : "Login"}
    </button>
</div>

        </form>

        <p className="mt-6 text-center text-gray-600">
    Don't have an account?{" "}
    <span
        onClick={() => navigate("/signup")}
        className="cursor-pointer text-blue-600 hover:underline"
    >
        Sign Up
    </span>
</p>
      </div>
    </div>
  );
}

export default Login;