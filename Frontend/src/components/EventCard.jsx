import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
      {/* Event Image */}
      <div className="relative">
        <img
          src={event.image || "https://via.placeholder.com/300"}
          alt={event.name}
          className="w-full h-56 object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent"></div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Event Name */}
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
          {event.name}
        </h3>

        {/* Event Date */}
        <p className="text-sm text-gray-600 mt-1">{event.date}</p>

        {/* Event Description */}
        <p className="mt-2 text-gray-700 text-sm line-clamp-3">
          {event.description.length > 100
            ? `${event.description.slice(0, 100)}...`
            : event.description}
        </p>

        {/* View Details Button */}
        <button
          onClick={() => navigate(`/events/${event.id}`)}
          className="mt-4 w-full py-2 rounded-md bg-green-600 text-white font-semibold transition-all hover:bg-green-700 hover:shadow-md"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
