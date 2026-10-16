// /pages/Languages.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { normalizeForSearch } from "../utils/french";
import languages from "../data/languages.json";

import WorldMap from "../components/WorldMap";
import LanguageSearch from "../components/LanguageSearch";
import LanguageList from "../components/LanguageList";
import LanguageRegionFilter from "../components/LanguageRegionFilter";
import FadeInSection from "../components/FadeInSection";
import HeroSection from "../components/HeroSection";
import ClassificationFilter from "../components/ClassificationFilter";
import classifications from "../data/classSystems.json";
import HeroImage from "../images/nasa-Q1p7bh3SHj8-unsplash.webp";
import HeroWrapper from "../components/HeroWrapper";

export default function Languages() {
  const navigate = useNavigate();
  const [selectedClassification, setSelectedClassification] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchParams] = useSearchParams();

  const scrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Deep links from the home page: /languages?section=systemes | region | recherche
  useEffect(() => {
    const id = searchParams.get("section");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  }, [searchParams]);

  const regions = useMemo(
    () =>
      Array.from(
        new Set(languages.map((lang) => lang.Area_GLOT_FR).filter(Boolean)),
      ).sort(),
    [],
  );

  const toMarker = (lang) => ({
    glottocode: lang.Glottocode,
    latitude: lang.Latitude,
    longitude: lang.Longitude,
    label: lang.LanguageFR,
  });

  // Region map
  const markers = languages
    .filter(
      (lang) => selectedRegion === "all" || lang.Area_GLOT_FR === selectedRegion,
    )
    .map(toMarker);

  // Search list (independent of the region filter), accent-insensitive,
  // matching French name, English name, country or glottocode
  const searchedLanguages = useMemo(() => {
    const q = normalizeForSearch(searchQuery);
    return [...languages]
      .filter(
        (lang) =>
          !q ||
          [lang.LanguageFR, lang.LanguageEN, lang.CountryFR, lang.Glottocode].some(
            (field) => normalizeForSearch(field).includes(q),
          ),
      )
      .sort((a, b) => a.LanguageFR.localeCompare(b.LanguageFR, "fr"));
  }, [searchQuery]);

  const classificationFilteredLanguages = useMemo(() => {
    if (selectedClassification === "all") {
      return languages;
    }

    return languages.filter(
      (lang) =>
        Array.isArray(lang.Classification_ID) &&
        lang.Classification_ID.includes(selectedClassification),
    );
  }, [selectedClassification]);

  const classificationMarkers = classificationFilteredLanguages.map(toMarker);

  const selectedClassificationObject =
    selectedClassification === "all"
      ? null
      : classifications.find(
          (c) => c.Classification_ID === selectedClassification,
        );

  return (
    <div className="min-h-screen">
      <HeroWrapper backgroundImage={HeroImage}>
        <HeroSection
          eyebrow="Exploration linguistique"
          title="Les langues du quiz"
          subtitle="Découvre les langues qui ont inspiré le jeu, explore leur localisation sur la carte et accède à leurs fiches détaillées."
          align="center"
          size="medium"
        />
      </HeroWrapper>

      {/* ===================== */}
      {/* SECTION A — CLASSIFICATION SYSTEMS */}
      {/* ===================== */}
      <section id="systemes" className="bg-white py-20 scroll-mt-24">
        {/* Section header */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-800">
            Comprendre les systèmes de classification
          </h2>
          <p className="text-slate-600 mt-2 leading-relaxed text-lg">
            Découvre comment les langues classent leurs noms et explore les
            langues qui utilisent chaque système sur la carte.
          </p>
        </div>

        {/* Grid layout */}
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left column — sticky context panel */}
          <div className="lg:col-span-1 space-y-8 p-4 rounded-2xl lg:sticky lg:top-24">
            {/* Editorial intro */}
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Les langues du monde n’organisent pas les noms de la même façon.
                Certaines utilisent des classificateurs, d’autres un genre
                grammatical ou des classes nominales. Sélectionne un système
                pour voir les langues concernées sur la carte.
              </p>
            </div>

            {/* Classification filter */}
            <ClassificationFilter
              classifications={classifications}
              selectedClassification={selectedClassification}
              setSelectedClassification={setSelectedClassification}
            />
          </div>

          {/* Right column — map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="h-[280px] sm:h-[420px]">
                <WorldMap
                  markers={classificationMarkers}
                  mode="dataset"
                  onMarkerClick={(glottocode) =>
                    navigate(`/languages/${glottocode}`)
                  }
                />
              </div>
            </div>

            {/* Optional expanded description below map */}
            {selectedClassification !== "all" &&
              selectedClassificationObject && (
                <FadeInSection key={selectedClassification}>
                  <div className="mt-12 bg-gradient-to-b from-slate-800 to-slate-700 py-16 rounded-2xl">
                    <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                      <h3 className="font-display text-2xl md:text-3xl font-semibold text-white">
                        {selectedClassificationObject.Classification_nameFR}
                      </h3>
                      <p className="text-slate-200 text-lg leading-relaxed">
                        {selectedClassificationObject.Classification_summaryFR}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              )}

            {/* Continuation cue */}
            <button type="button" onClick={() => scrollToSection("region")} className="block mx-auto mt-8 text-center text-slate-500 font-medium hover:text-sky-700">
              Explorer par région ↓
            </button>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* SECTION B — MAP & REGION FILTER */}
      {/* ===================== */}
      <section
        id="region"
        className="bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 py-24 scroll-mt-24"
      >
        {/* Section header */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-800">
            Explorer par région
          </h2>
          <p className="text-slate-600 mt-2 leading-relaxed text-lg">
            Parcours les langues du quiz à l’échelle du monde. Sélectionne une
            région pour afficher les langues correspondantes, puis clique sur
            un point pour accéder à la fiche détaillée.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left column — sticky filter */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <LanguageRegionFilter
              regions={regions}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              vertical={true}
            />
          </div>

          {/* Right column — map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="h-[280px] sm:h-[420px]">
                <WorldMap
                  markers={markers}
                  mode="dataset"
                  onMarkerClick={(glottocode) =>
                    navigate(`/languages/${glottocode}`)
                  }
                />
              </div>
            </div>

            {/* Continuation cue */}
            <button type="button" onClick={() => scrollToSection("recherche")} className="block mx-auto mt-8 text-center text-slate-500 font-medium hover:text-sky-700">
              Chercher une langue spécifique ↓
            </button>
          </div>
        </div>
      </section>

      {/* SECTION C — SEARCH & LIST */}
      <section id="recherche" className="bg-slate-100 py-20 scroll-mt-24">
        <FadeInSection>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Left column — editorial text */}
              <div className="lg:col-span-1 space-y-4 p-4 rounded-2xl">
                <h2 className="font-display text-xl font-semibold text-slate-800">
                  Ou bien tu penses à une langue précise ?
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Tu peux chercher directement le nom d’une langue pour accéder
                  rapidement à sa fiche détaillée.
                </p>
              </div>

              {/* Right column — search + list */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                  <LanguageSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                  <LanguageList languages={searchedLanguages} />
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
