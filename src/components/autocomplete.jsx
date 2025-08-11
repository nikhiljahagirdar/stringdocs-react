import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TailwindClassList from "../tailwindClassList";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Autocomplete = ({ onPlaceChanged }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchSuggestions = async (searchText) => {
    if (!searchText.trim()) {
      setSuggestions([]);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:3443/api/places/autocomplete`,
        {
          params: { input: searchText },
          signal: abortControllerRef.current.signal,
        }
      );
      setSuggestions(response.data.predictions.map((item) => item.description));
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching suggestions:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Memoized debounced function
  const debouncedFetch = useCallback(debounce((searchText) => fetchSuggestions(searchText), 300), []);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setActiveIndex(-1);
    debouncedFetch(newQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(suggestions[activeIndex]);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]); // Ensure dropdown is cleared after selection
    if (onPlaceChanged) {
      onPlaceChanged(suggestion);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`${TailwindClassList.formInput} ${
          query ? "border-red-500 focus:ring-red-500" : ""
        }`}
        placeholder="Search for a place..."
      />
      {loading && (
        <div className="absolute top-0 right-0 mt-2 mr-2 text-gray-500">Loading...</div>
      )}
      {suggestions.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute w-full bg-white border border-gray-300 rounded shadow-lg mt-1 z-10"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              className={`w-full text-left p-2 cursor-pointer hover:bg-gray-100 ${
                activeIndex === index ? "bg-gray-200" : ""
              }`}
              onMouseDown={() => handleSelect(suggestion)} // Fix: Use onMouseDown to prevent reopening
            >
              {suggestion}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

Autocomplete.propTypes = {
  
  onPlaceChanged: PropTypes.func,
};

export default Autocomplete;

