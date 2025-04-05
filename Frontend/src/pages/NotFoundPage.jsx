import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-4">
      <h1 className="text-9xl font-extrabold text-green-500 animate-bounce">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-400 mt-2 text-lg">
        The page you are looking for does not exist or has been moved.
      </p>
      
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 transition-all text-white rounded-lg shadow-lg font-semibold"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
