"use client";
import { useState, useEffect } from "react";
import ParkList from "../ui/search/ParkList";
import axios from "axios";

export default function Example() {
  const [suggestions, setSuggestions] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_REACT_APP_HIKING_API_KEY;

  useEffect(() => {
    const fetchParks = async () => {
      console.log("API_KEY---", API_KEY);
      const response = await axios.get(`https://developer.nps.gov/api/v1/parks?q=${"Joshua Tree"}&limit=10&api_key=${API_KEY}`);
      setSuggestions(response.data.data);
    };

    fetchParks();
  }, []);
  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <ParkList suggestions={suggestions} setSuggestions={setSuggestions} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
