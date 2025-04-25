import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEvent } from "../store/eventSlice"; // Import event action
import EventForm from "../components/EventForm"; // Import reusable EventForm

const AddEventPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (eventData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await dispatch(addEvent(eventData)).unwrap(); // Ensures completion
      setSuccess(true);
    } catch (error) {
      setError("⚠️ Failed to add event. Please try again.");
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect after success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/events"), 1500);
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [success, navigate]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        🎉 Add a New Event
      </h1>

      <EventForm onSubmit={handleSubmit} loading={loading} />

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center mt-4 font-medium" aria-live="polite">
          {error}
        </p>
      )}

      {/* Success Message */}
      {success && (
        <p className="text-green-500 text-center mt-4 font-semibold" aria-live="assertive">
          ✅ Event added successfully! Redirecting...
        </p>
      )}
    </div>
  );
};

export default AddEventPage;
