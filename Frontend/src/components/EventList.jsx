import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-600">
        <p className="text-2xl font-semibold animate-pulse">No events available 😢</p>
        <p className="text-gray-500 mt-2">Try creating or searching for an event.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Enhanced Heading */}
      <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-500 text-transparent bg-clip-text">
        Upcoming Events 🎉
      </h2>

      {/* Responsive Grid with Hover Effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="hover:scale-105 transition-transform duration-300">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
