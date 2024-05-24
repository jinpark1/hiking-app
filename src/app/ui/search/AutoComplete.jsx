import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Autocomplete.css";

const Autocomplete = ({ suggestions, setSuggestions }) => {
  const [query, setQuery] = useState("");
  const API_KEY = process.env.NEXT_PUBLIC_REACT_APP_HIKING_API_KEY;

  useEffect(() => {
    const fetchParks = async () => {
      if (query.length >= 3) {
        console.log("API_KEY---", API_KEY);
        const response = await axios.get(`https://developer.nps.gov/api/v1/parks?q=${query}&limit=10&api_key=${API_KEY}`);
        setSuggestions(response.data.data);
      } else {
        setSuggestions([]);
      }
    };

    const debounceFetch = debounce(fetchParks, 300);
    debounceFetch();

    return () => {
      debounceFetch.cancel();
    };
  }, [query]);

  const debounce = (func, wait) => {
    let timeout;
    const debouncedFunction = (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };

    debouncedFunction.cancel = () => {
      clearTimeout(timeout);
    };

    return debouncedFunction;
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for parks..."
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {/* <div className="autocomplete-suggestions">
        {suggestions.map((suggestion) => (
          <div key={suggestion.parkCode} className="autocomplete-suggestion" onClick={() => setQuery(suggestion.fullName)}>
            {suggestion.fullName}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Autocomplete;
