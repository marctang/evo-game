// /pages/LanguageDetail.jsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import languages from "../data/languages.json";
import sources from "../data/sources.json";
import words from "../data/words.json";

import WorldMap from "../components/WorldMap";
import LanguageInfoTable from "../components/LanguageInfoTable";
import FadeInSection from "../components/FadeInSection";
import HeroSection from "../components/HeroSection";
import HeroWrapper from "../components/HeroWrapper";
import HeroImage from "../images/continents-6819704_1280.webp";
import { categoryLabel } from "../utils/quizUtils";
import { dePrefix } from "../utils/french";

const CATEGORY_COLORS = [
  "bg-sky-100 text-sky-900",
  "bg-amber-100 text-amber-900",
  "bg-emerald-100 text-emerald-900",
  "bg-violet-100 text-violet-900",
  "bg-rose-100 text-rose-900",
  "bg-teal-100 text-teal-900",
  "bg-orange-100 text-orange-900",
  "bg-indigo-100 text-indigo-900",
];

export default function LanguageDetail() {
  const { glottocode } = useParams();

  const language = languages.find((l) => l.Glottocode === glottocode);
  const languageSources = sources.filter((s) => s.Glottocode === glottocode);

  // Example words grouped by category, largest categories first
  const categories = useMemo(() => {
    const map = {};
    words
      .filter((w) => w.Glottocode === glottocode)
      .forEach((w) => {
        if (!map[w.Category]) map[w.Category] = [];
        if (!map[w.Category].includes(w.WordFR)) map[w.Category].push(w.WordFR);
      });
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [glottocode]);

  if (!language) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-slate-100">
        <p className="text-slate-700 text-lg">Langue introuvable</p>
        <Link to="/languages" className="text-sky-700 hover:underline">
          ← Retour à la liste des langues
        </Link>
      </div>
    );
  }

  const marker = {
    glottocode: language.Glottocode,
    latitude: language.Latitude,
    longitude: language.Longitude,
    label: language.LanguageFR,
  };

  return (
    <div className="min-h-screen">
      <HeroWrapper backgroundImage={HeroImage}>
        <HeroSection
          eyebrow="Fiche de langue"
          title={language.LanguageFR}
          subtitle={
            language.Area_GLOT_FR
              ? `Langues ${dePrefix(language.Area_GLOT_FR)}${language.Area_GLOT_FR}`
              : ""
          }
          size="small"
        />
      </HeroWrapper>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-6xl px-6 space-y-8">
          <Link
            to="/languages"
            className="inline-block text-sky-700 hover:underline"
          >
            ← Toutes les langues
          </Link>

          <FadeInSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <LanguageInfoTable language={language} sources={languageSources} />
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-4">
                <div className="h-[280px] sm:h-[420px]">
                  <WorldMap markers={[marker]} mode="single" />
                </div>
              </div>
            </div>
          </FadeInSection>

          {categories.length > 0 && (
            <FadeInSection>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="font-display text-2xl font-semibold text-slate-800 mb-1">
                  Exemples de mots par catégorie
                </h2>
                <p className="text-slate-500 mb-6 text-sm">
                  Traductions françaises des mots relevés dans les grammaires,
                  regroupés selon leur catégorie en {language.LanguageFR}.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categories.map(([category, list], i) => (
                    <div key={category}>
                      <h3 className="font-semibold text-slate-800 mb-2">
                        {categoryLabel(category)}{" "}
                        <span className="text-slate-400 font-normal text-sm">
                          ({list.length})
                        </span>
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {list.map((w) => (
                          <li
                            key={w}
                            className={`px-3 py-1 rounded-full text-sm ${
                              CATEGORY_COLORS[i % CATEGORY_COLORS.length]
                            }`}
                          >
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          )}
        </div>
      </section>
    </div>
  );
}
