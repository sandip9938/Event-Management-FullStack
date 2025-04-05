import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    username: "",
    userEmail: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.username || !user.userEmail || !user.password) {
      setError("All fields are required.");
      return;
    }

    const result = await dispatch(registerUser(user));

    if (result.error) {
      setError(result.payload || "Registration failed. Try again.");
    } else {
      navigate("/events");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Create an Account</h1>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              name="userEmail"
              value={user.userEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:border-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md transition ${
              authState.loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-semibold shadow-md`}
            disabled={authState.loading}
          >
            {authState.loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

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

export default Register;
