import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice"; // Import login action
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [customError, setCustomError] = useState("");

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCustomError(""); // Clear previous errors

    if (!credentials.email || !credentials.password) {
      setCustomError("Both email and password are required.");
      return;
    }

    const result = await dispatch(loginUser(credentials));

    if (result.error) {
      setCustomError(result.payload || "Invalid email or password.");
    } else {
      navigate("/events"); // Redirect after successful login
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        {/* Error Message */}
        {(customError || error) && (
          <p className="text-red-500 text-center">{customError || error}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
              aria-label="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
              aria-label="Enter your password"
              required
            />
          </div>

          {/* Green Login Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-md transition font-semibold ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Redirect to Register */}
        <p className="text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>

        {/* Back to Home Button (Green) */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
