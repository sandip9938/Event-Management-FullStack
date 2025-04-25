import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEvent } from "../store/eventSlice"; // Import event action
import EventForm from "../components/EventForm"; // Import reusable EventForm
import { toast } from "react-toastify"; // Import toast notifications

const AddEventPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Track errors

  const handleSubmit = async (eventData) => {
    setLoading(true);
    setError("");

    try {
      await dispatch(addEvent(eventData)); // Dispatch event action
      toast.success("🎉 Event added successfully!"); // Success notification
      navigate("/events"); // Redirect after successful submission
    } catch (error) {
      console.error("Error adding event:", error);
      setError("⚠️ Failed to add event. Please try again."); // Set error message
      toast.error("❌ Error adding event. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        🎉 Add a New Event
      </h1>

      <EventForm onSubmit={handleSubmit} loading={loading} />

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 font-semibold mt-4" aria-live="polite">
          {error}
        </p>
      )}

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-blue-500 font-semibold mt-4" aria-live="assertive">
          Adding event...
        </p>
      )}
    </div>
  );
};

export default AddEventPage;
