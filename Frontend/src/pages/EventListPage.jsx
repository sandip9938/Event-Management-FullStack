import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";

const EventListPage = () => {
  const allEvents = useSelector((state) => state.events || []); // Ensure it doesn't break if state is empty
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const eventChunkSize = 5; // Load 5 events at a time
  const observer = useRef(null);

  // Filter events based on search & filters
  const filteredEvents = allEvents.filter((event) => {
    return (
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter ? event.category === categoryFilter : true) &&
      (locationFilter ? event.location.toLowerCase().includes(locationFilter.toLowerCase()) : true)
    );
  });

  // Load initial events on mount or when filters change
  useEffect(() => {
    setVisibleEvents(filteredEvents.slice(0, eventChunkSize));
    setHasMore(filteredEvents.length > eventChunkSize);
  }, [filteredEvents]);

  // Function to load more events
  const loadMoreEvents = useCallback(() => {
    if (!hasMore || loading) return;
    setLoading(true);
    
    setTimeout(() => {
      setVisibleEvents((prevEvents) => {
        const nextEvents = filteredEvents.slice(prevEvents.length, prevEvents.length + eventChunkSize);
        return [...prevEvents, ...nextEvents];
      });

      setHasMore((prevEvents) => prevEvents.length + eventChunkSize < filteredEvents.length);
      setLoading(false);
    }, 500);
  }, [filteredEvents, hasMore, loading]);

  // Infinite Scroll Observer
  const lastEventRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreEvents();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreEvents]
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6">📅 Upcoming Events</h1>

      {/* Search & Filters */}
      <SearchBar onSearch={setSearchQuery} />
      <div className="flex justify-between mt-4">
        <select
          className="border p-2 rounded-md"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
        </select>

        <input
          type="text"
          placeholder="Filter by location..."
          className="border p-2 rounded-md"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>

      {/* Event List */}
      <div className="mt-6 grid gap-4">
        {visibleEvents.length > 0 ? (
          visibleEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => navigate(`/events/${event.id}`)}
              ref={index === visibleEvents.length - 1 ? lastEventRef : null}
            />
          ))
        ) : (
          <p className="text-center text-gray-500" aria-live="polite">
            🚀 No events match your search.
          </p>
        )}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-blue-500 font-semibold mt-4">
          Loading more events...
        </p>
      )}

      {/* Add Event Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/events/add")}
          className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          ➕ Add New Event
        </button>
      </div>
    </div>
  );
};

export default EventListPage;
