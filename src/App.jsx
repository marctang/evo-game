import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Languages from "./pages/Languages";
import LanguageDetail from "./pages/LanguageDetail";
import About from "./pages/About";

const TITLES = {
  "/": "EvoGAME – Catégorisons les mots !",
  "/quiz": "Quiz – EvoGAME",
  "/languages": "Les langues – EvoGAME",
  "/about": "À propos – EvoGAME",
};

/** Scroll to top and update the tab title on every page change. */
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLES[pathname] || "EvoGAME";
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-3xl font-bold text-slate-800">Page introuvable</h1>
      <Link to="/" className="text-sky-700 hover:underline">
        ← Retour à l’accueil
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <NavBar />
      <main id="contenu" tabIndex={-1} className="focus:outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/languages/:glottocode" element={<LanguageDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
