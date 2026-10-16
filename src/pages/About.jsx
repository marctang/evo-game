// About.jsx
import React from "react";
import FadeInSection from "../components/FadeInSection";
import DatasetStats from "../components/DatasetStats";
import { GITHUB_REPO_URL, SUBMIT_DATA_URL, OTHER_GAME } from "../config";

// Icons / images
import IconMarc from "../images/undraw_developer-avatar_f6ac.svg";
import IconMarine from "../images/undraw_skateboard_w3bz.svg";
import IconMagda from "../images/undraw_petting_xclp.svg";
import IconMethod from "../images/undraw_bright-ideas_z7u9.svg";
import IconInstitution from "../images/undraw_stars_5pgw.svg";


import LogoLabo from "../images/logo_eae.png";
import LogoMuseum from "../images/logo-MNHN.jpg";
import LogoANR from "../images/ANR-logo-C.jpg";

import LogoNature from "../images/Nature_journal_logo.svg.png";
import LogoGothenburg from "../images/logo_uni_gothemburg.jpg";
import LogoMaxPlanck from "../images/MPG_Logo_Web.svg";
import LogoGlottolog from "../images/glottolog-logo.png";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ===================== */}
      {/* HERO SECTION */}
      {/* ===================== */}
      <section className="bg-gradient-to-b from-slate-800 to-slate-700 py-24 text-center text-white relative overflow-hidden">
        <FadeInSection>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">À propos</h1>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Découvre les personnes qui ont développé ce jeu et les institutions qui ont soutenu ce travail.
          </p>
        </FadeInSection>
        <img
          src={IconInstitution}
          alt=""
          className="absolute bottom-0 right-0 w-64 opacity-10 pointer-events-none"
        />
      </section>

      {/* ===================== */}
      {/* SECTION 1 — PERSONNES IMPLIQUÉES */}
      {/* ===================== */}
      <section className="bg-white py-24 w-full">
        <div className="max-w-6xl mx-auto px-6 space-y-12 text-center">
          <FadeInSection>
            <h2 className="font-display text-3xl font-semibold text-slate-800">
              Les personnes impliquées
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
              Notre équipe de chercheurs, développeurs et experts en médiation ont travaillé ensemble sur la conception, la mise en place et le design de ce site.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Marc Allassonnière-Tang", link: "https://marctang.github.io", icon: IconMarc },
              { name: "Magdalena Lemus Serrano", link: "https://cv.hal.science/magdalenalemusser", icon: IconMagda },
              { name: "Marine Cozzolino", link: null, icon: IconMarine },
            ].map((person, i) => (
              <FadeInSection key={person.name} delay={i * 0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <img src={person.icon} alt="" className="w-20 h-20 mx-auto mb-4" />
                  {person.link ? (
                    <a href={person.link} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-sky-700 hover:underline">
                      {person.name}
                    </a>
                  ) : (
                    <span className="text-lg font-medium text-slate-800">{person.name}</span>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* SECTION 2 — MÉTHODES + CHIFFRES */}
      {/* ===================== */}
      <section className="bg-slate-50 py-24 w-full">
        <div className="max-w-6xl mx-auto px-6 space-y-16">

          {/* Méthodes */}
          <FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center ">
              <div className="md:col-span-1 flex justify-center">
                <img src={IconMethod} alt="" className="w-20 h-20" />
              </div>
              <div className="md:col-span-5 space-y-3">
                <h3 className="text-2xl font-semibold text-slate-800">Méthodes</h3>
                <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                  Nous avons constitué une base de données consacrée aux systèmes de catégorisation nominale d’une trentaine de langues, documentée à partir de grammaires descriptives et d’exemples lexicaux sourcés.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Chiffres clés */}
          <DatasetStats />

        </div>
      </section>
      {/* ===================== */}
{/* RÉSULTATS */}
{/* ===================== */}
<section className="bg-white py-24 w-full">
  <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
    <FadeInSection>
      <h2 className="font-display text-3xl font-semibold text-slate-800">
        Résultats
      </h2>
      <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
        Les résultats préliminaires de ce travail sont disponibles sur notre dépôt GitHub. 
        Le fichier principal de la base de données peut également être téléchargé ici.
      </p>
    </FadeInSection>

    <FadeInSection delay={0.1}>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-sky-700 text-white font-semibold rounded-lg hover:bg-sky-600 transition"
        >
          Dépôt GitHub
        </a>

        <a
          href={`${process.env.PUBLIC_URL}/MEDIATION-BDD_clean_FINAL.xlsx`}
          download="Nominal_Categorization_Database.xlsx"
          className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Télécharger la base
        </a>

        <a
          href={SUBMIT_DATA_URL}
          className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-600 transition"
        >
          Soumettre vos données
        </a>
      </div>
      <p className="text-sm text-slate-500 mt-4">
        « Soumettre vos données » ouvre un courriel prérempli&nbsp;: indique la
        langue, les mots, leurs catégories et la source.
      </p>
    </FadeInSection>

    <FadeInSection delay={0.2}>
      <p className="text-slate-600 pt-6">
        Envie de continuer à jouer&nbsp;? Découvre aussi{" "}
        <a
          href={OTHER_GAME.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-700 font-medium hover:underline"
        >
          {OTHER_GAME.title} ↗
        </a>
      </p>
    </FadeInSection>
  </div>
</section>


      {/* ===================== */}
      {/* SECTION 3 — SOURCES */}
      {/* ===================== */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-700 py-24 w-full">
        <div className="max-w-6xl mx-auto px-6 space-y-10">

          <FadeInSection>
            <h2 className="font-display text-3xl font-semibold text-white text-center">Sources</h2>
            <p className="text-slate-400 text-lg text-center max-w-3xl mx-auto">
              Les données du site s’appuient sur des ressources linguistiques de référence.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                {[
                  { title: "Nominal categorization systems database", logo: LogoNature, link: "https://www.nature.com/articles/s41599-021-01003-5" },
                  { title: "DReaM multilingual corpus", logo: LogoGothenburg, link: "https://spraakbanken.gu.se/en/resources/dream" },
                  { title: "World Atlas of Classifier Languages", logo: LogoMaxPlanck, link: "https://wacl.clld.org/" },
                  { title: "Glottolog", logo: LogoGlottolog, link: "https://glottolog.org/" },
                ].map((src, i) => (
                  <a key={i} href={src.link} target="_blank" rel="noopener noreferrer"
                    className="min-w-[240px] h-[240px] bg-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-600 transition-colors"
                  >
                    <img src={src.logo} alt="" className="h-16 mb-4 object-contain" />
                    <span className="text-white font-medium">{src.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeInSection>

        </div>
      </section>

     

      {/* ===================== */}
{/* SECTION 5 — INSTITUTIONS */}
{/* ===================== */}
<section className="bg-white py-24 w-full">
  <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
    <FadeInSection>
      <h2 className="font-display text-3xl font-semibold text-slate-800">Institutions</h2>
      <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
        Voici les institutions qui ont soutenu ce travail.
      </p>
    </FadeInSection>

    <div className="flex flex-wrap justify-center items-center gap-12">
      {[
        { logo: LogoMuseum, name: "Musée de l’Homme" },
        { logo: LogoLabo, name: "UMR Eco-Anthropologie" },
        { logo: LogoANR, name: "Agence Nationale de la Recherche" },
      ].map((inst, i) => (
        <FadeInSection key={inst.name} delay={i * 0.15}>
          <div className="flex flex-col items-center space-y-3">
            <img
              src={inst.logo}
              alt={inst.name}
              className="h-16 hover:scale-105 transition-transform"
            />
            <span className="text-sm text-slate-600">
              {inst.name}
            </span>
          </div>
        </FadeInSection>
      ))}
    </div>
  </div>
</section>


    </div>
  );
}
