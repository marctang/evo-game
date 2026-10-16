import React from "react";
import { computeDatasetStats } from "../utils/datasetStats";
import { useCountUp } from "../hooks/useCountUp";
import { useInView } from "../hooks/useInView";

function Stat({ value, label }) {
  const { ref, inView } = useInView();
  const animatedValue = useCountUp(value, inView);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-semibold text-slate-800">
        {animatedValue}
      </div>
      <div className="mt-2 text-slate-600 text-lg">
        {label}
      </div>
    </div>
  );
}

export default function DatasetStats() {
  const {
    numberOfLanguages,
    numberOfGrammars,
    numberOfLexicalItems,
  } = computeDatasetStats();

  return (
    <div className="bg-white rounded-2xl p-10">
      <h3 className="font-display text-2xl font-semibold text-slate-800 mb-8 text-center">
        Le site en quelques chiffres clés
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <Stat value={numberOfLanguages} label="langues documentées" />
        <Stat value={numberOfGrammars} label="grammaires analysées" />
        <Stat value={numberOfLexicalItems} label="exemples lexicaux" />
      </div>
    </div>
  );
}
