// /components/LanguageRegionFilter.jsx
import React from "react";

export default function LanguageRegionFilter({
  regions,
  selectedRegion,
  setSelectedRegion,
  vertical = false, // new prop
}) {
  return (
    <div
      className={`${
        vertical
          ? "flex flex-col space-y-2"
          : "flex space-x-2 overflow-x-auto py-2 px-1"
      }`}
    >
      {["all", ...regions].map((region) => {
        const isSelected = selectedRegion === region;
        return (
          <button
            key={region}
            type="button"
            aria-pressed={isSelected}
            onClick={() => setSelectedRegion(region)}
            className={`inline-block rounded-full border transition-colors duration-200 ${
              isSelected
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            } px-3 py-1 text-sm`}
          >
            {region === "all" ? "Toutes les régions" : region}
          </button>
        );
      })}
    </div>
  );
}
