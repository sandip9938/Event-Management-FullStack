import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RSVPButton from "../components/RSVPButton"; // Import RSVP Button

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rsvpMessage, setRsvpMessage] = useState(null);

  const event = useSelector((state) =>
    state.events?.find((e) => e.id === parseInt(eventId))
  );

  useEffect(() => {
    // Simulating data fetching delay
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  useEffect(() => {
    if (rsvpMessage) {
      const messageTimer = setTimeout(() => setRsvpMessage(null), 3000);
      return () => clearTimeout(messageTimer); // Cleanup timer
    }
  }, [rsvpMessage]);

  const handleRSVP = () => {
    setRsvpMessage("✅ You have successfully RSVP'd!");
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading event...</p>;
  }

  if (!event) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold text-red-600">Event Not Found</h2>
        <button
          onClick={() => navigate("/events")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Back to Events
        </button>
      </div>
    );
  }

  // Format date safely
  const formattedDate = event.date
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(event.date))
    : "Date not available";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md border border-gray-200 mt-6">
      <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>
      <p className="text-gray-500 text-lg">{formattedDate}</p>

      {event.image && (
        <img
          src={event.image}
          alt={`Event: ${event.name}`}
          className="w-full mt-4 rounded-md shadow-md"
        />
      )}

      <p className="mt-4 text-gray-700">{event.description}</p>

      {/* RSVP Button */}
      <div className="mt-6">
        <RSVPButton eventId={event.id} onRSVP={handleRSVP} />
        {rsvpMessage && (
          <p
            className="mt-2 text-green-600 font-semibold"
            aria-live="polite"
          >
            {rsvpMessage}
          </p>
        )}
      </div>

      {/* Back to Events Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/events")}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
