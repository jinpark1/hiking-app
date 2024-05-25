"use client";
import Link from "next/link";
import { useState } from "react";
import AutoComplete from "../../ui/search/AutoComplete";
import ParkList from "../../ui/search/ParkList";

export default function SearchPage() {
  const [suggestions, setSuggestions] = useState([]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Hiking Trails</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Search for hiking trails
              </label>
              <div className="mt-2">
                <AutoComplete suggestions={suggestions} setSuggestions={setSuggestions} />
              </div>
            </div>
          </form>
        </div>
      </div>
      <ParkList suggestions={suggestions} setSuggestions={setSuggestions} />
    </>
  );
}
