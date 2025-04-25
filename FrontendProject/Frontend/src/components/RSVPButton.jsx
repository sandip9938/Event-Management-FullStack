import React, { useState } from "react";
import { FaCheck, FaSpinner } from "react-icons/fa";

const RSVPButton = ({ eventId, onRSVP }) => {
  const [rsvpStatus, setRsvpStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRSVP = async () => {
    setLoading(true);
    setMessage("");

    try {
      await onRSVP(eventId); // Simulating API call

      setRsvpStatus((prev) => {
        const newStatus = !prev;
        setMessage(newStatus ? "Successfully RSVP'd!" : "RSVP canceled");
        return newStatus;
      });
    } catch (error) {
      console.error("RSVP failed:", error);
      setMessage("RSVP failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleRSVP}
        disabled={loading}
        className={`flex items-center justify-center gap-2 px-5 py-2.5 font-medium rounded-md transition-all 
          ${rsvpStatus ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-600 text-white hover:bg-blue-700"}
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? <FaSpinner className="animate-spin" /> : rsvpStatus ? <FaCheck /> : "RSVP Now"}
        {loading ? "Processing..." : rsvpStatus ? "RSVP'd" : "RSVP Now"}
      </button>

      {message && (
        <p className={`mt-2 text-sm font-medium ${rsvpStatus ? "text-green-700" : "text-red-600"} transition-opacity`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default RSVPButton;
