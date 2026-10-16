// /components/ClassificationFilter.jsx
import React from "react";

export default function ClassificationFilter({
  classifications,
  selectedClassification,
  setSelectedClassification,
}) {
  return (
    <div className="flex flex-col space-y-2">
      {/* All systems */}
      <button
        key="all"
        type="button"
        aria-pressed={selectedClassification === "all"}
        onClick={() => setSelectedClassification("all")}
        className={`inline-block rounded-full border transition-colors duration-200 px-3 py-1 text-sm ${
          selectedClassification === "all"
            ? "bg-sky-600 text-white border-sky-600"
            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
        }`}
      >
        Tous les systèmes
      </button>

      {/* Individual classification systems */}
      {classifications.map((system) => {
        const id = system.Classification_ID;
        const isSelected = selectedClassification === id;

        return (
          <button
            key={id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => setSelectedClassification(id)}
            className={`inline-block rounded-full border transition-colors duration-200 px-3 py-1 text-sm text-center ${
              isSelected
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {system.Classification_nameFR}
          </button>
        );
      })}
    </div>
  );
}
