import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Debounce input to reduce unnecessary function calls
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      onSearch(query);
    }, 300); // 300ms delay before triggering search

    return () => clearTimeout(delaySearch);
  }, [query, onSearch]);

  return (
    <div className="relative max-w-md w-full">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search events..."
        className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm"
        aria-label="Search events"
      />

      {/* Search Icon */}
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

      {/* Clear Button (Visible when input is not empty) */}
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
