// /components/LanguageSearch.jsx
import React from "react";

export default function LanguageSearch({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="search"
      aria-label="Rechercher une langue"
      placeholder="Rechercher une langue, un pays… (ex. mirana, Éthiopie)"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
    />
  );
}
