// Home.jsx
import { Link } from "react-router-dom";
import { OTHER_GAME } from "../config";
import IconOtherGame from "../images/undraw_stars_5pgw.svg";
import FadeInSection from "../components/FadeInSection";
import Icon1 from "../images/undraw_too-many-options_lpt0.svg";
import Icon2 from "../images/undraw_searching-everywhere_tffi.svg";
import Icon3 from "../images/undraw_adventure-map_3e4p.svg";
import HeroImage from "../images/earth-11595_1280.webp";

export default function Home() {
  return (
    <div className="w-full">
      {/* ===================== */}
      {/* SECTION 1 — HERO */}
      {/* ===================== */}
      <section className="relative min-h-[85vh] w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center px-6 overflow-hidden">
        {/* Globe Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${HeroImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {/* Hero content */}
        <FadeInSection>
          <div className="relative z-10 max-w-3xl text-center text-white space-y-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-300">
              EvoGAME
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold">
              Catégorisons les mots&nbsp;!
            </h1>
            <p className="text-lg md:text-2xl text-slate-200">
              Comment les langues du monde répertorient-elles leurs mots&nbsp;?
              Observe, compare, et teste tes intuitions.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/quiz"
                className="bg-amber-400 hover:bg-amber-300 text-slate-900 px-8 py-3 rounded-2xl text-lg font-semibold transition-transform hover:scale-105"
              >
                Jouer au quiz
              </Link>
              <Link
                to="/languages"
                className="border border-slate-300/70 hover:bg-white/10 px-8 py-3 rounded-2xl text-lg font-medium"
              >
                Explorer les langues
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ===================== */}
      {/* SECTION 2 — POURQUOI CE JEU ? */}
      {/* ===================== */}
      <section className="bg-white py-24">
  <div className="max-w-6xl mx-auto px-6 space-y-24">

    {/* Block 1 */}
    <FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center md:justify-center">
          <img src={Icon1} alt="" className="w-32 h-32" />
        </div>
        <div className="space-y-4">
          <h3 className="font-display text-2xl font-semibold text-slate-800">
            Une vraie énigme linguistique
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Pourquoi <em>« lait »</em> est féminin en espagnol mais masculin en
            français ? Pourquoi <em>« fille »</em> est neutre en allemand ?
            Ces questions intriguent les linguistes depuis toujours.
          </p>
        </div>
      </div>
    </FadeInSection>

    {/* Block 2 */}
    <FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-1 md:order-2 flex justify-center md:justify-center">
          <img src={Icon2} alt="" className="w-32 h-32" />
        </div>
        <div className="order-2 md:order-1 space-y-4">
          <h3 className="font-display text-2xl font-semibold text-slate-800">
            Des systèmes très différents
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Certaines langues utilisent le genre grammatical, d’autres
            distinguent les animés des inanimés, ou regroupent les objets
            selon leur forme, leur taille ou leur usage.
          </p>
        </div>
      </div>
    </FadeInSection>

    {/* Block 3 */}
    <FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center md:justify-center">
          <img src={Icon3} alt="" className="w-32 h-32" />
        </div>
        <div className="space-y-4">
          <h3 className="font-display text-2xl font-semibold text-slate-800">
            Explorer en jouant
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Certaines langues n’ont aucune catégorie, d’autres en ont deux,
            trois… ou des dizaines. Ce jeu t’invite à découvrir ces systèmes
            à travers des langues du monde entier.
          </p>
        </div>
      </div>
    </FadeInSection>

  </div>
</section>

      {/* ===================== */}
      {/* SECTION 3 — QUE PEUX-TU FAIRE ICI ? */}
      {/* ===================== */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <h2 className="font-display text-3xl font-semibold text-slate-800 text-center mb-12">
              Que peux-tu faire ici&nbsp;?
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInSection delay={0.1}>
              <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Explorer les langues
                </h3>
                <p className="text-slate-600">
                  Découvre les langues du quiz sur une carte du monde et explore
                  leur distribution géographique.
                </p>
                <Link
                  to="/languages?section=region"
                  className="text-sky-700 font-medium hover:underline"
                >
                  Explorer les langues →
                </Link>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Comprendre les systèmes
                </h3>
                <p className="text-slate-600">
                  Compare les systèmes de catégorisation des langues du monde et prépare-toi pour le quiz ! 
                </p>
                <Link
                  to="/languages?section=systemes"
                  className="text-sky-700 font-medium hover:underline"
                >
                  Voir les systèmes →
                </Link>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Tester tes intuitions
                </h3>
                <p className="text-slate-600">
                  Mets-toi à la place d’un·e linguiste et essaie de deviner les
                  catégories des langues.
                </p>
                <Link
                  to="/quiz"
                  className="text-sky-700 font-medium hover:underline"
                >
                  Aller au quiz →
                </Link>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* SECTION 3b — UN AUTRE JEU */}
      {/* ===================== */}
      <section className="bg-white py-20">
        <FadeInSection>
          <div className="max-w-4xl mx-auto px-6">
            <a
              href={OTHER_GAME.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-6 items-center rounded-2xl border border-slate-200 bg-gradient-to-r from-indigo-50 to-amber-50 p-8 hover:shadow-lg transition-shadow"
            >
              <img src={IconOtherGame} alt="" className="w-20 h-20 mx-auto" />
              <div className="text-center sm:text-left space-y-2">
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600">
                  Un autre jeu à découvrir
                </p>
                <h2 className="font-display text-2xl font-semibold text-slate-800">
                  {OTHER_GAME.title}
                </h2>
                <p className="text-slate-600">
                  Embarque pour une nouvelle aventure linguistique.
                </p>
              </div>
              <span className="text-center sm:text-right text-sky-700 font-semibold group-hover:translate-x-1 transition-transform">
                Jouer ↗
              </span>
            </a>
          </div>
        </FadeInSection>
      </section>

      {/* ===================== */}
      {/* SECTION 4 — CTA FINAL */}
      {/* ===================== */}
      <section className="bg-gradient-to-b from-slate-800 to-slate-900 py-24">
        <FadeInSection>
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6 text-white">
            <h2 className="font-display text-3xl font-semibold">
              Prêt·e à te lancer&nbsp;?
            </h2>
            <p className="text-slate-300">
              Tu peux commencer directement le quiz ou explorer les langues
              avant de te tester.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/quiz"
                className="bg-amber-400 hover:bg-amber-300 text-slate-900 px-8 py-3 rounded-2xl text-lg font-semibold transition-transform hover:scale-105"
              >
                Commencer le quiz
              </Link>
              <Link
                to="/languages"
                className="border border-slate-400 hover:bg-slate-800 px-8 py-3 rounded-2xl text-lg font-medium"
              >
                Explorer d’abord
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
