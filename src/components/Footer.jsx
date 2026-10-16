// Footer.jsx
import { Link } from "react-router-dom";
import { GITHUB_REPO_URL, OTHER_GAME } from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
          
          {/* Column 1 — Project description */}
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-800">
              À propos du projet
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Ce site propose une exploration interactive des systèmes de
              classification nominale dans les langues du monde, à partir de
              données linguistiques et typologiques.
            </p>
          </div>

          {/* Column 2 — Institutions */}
<div className="space-y-4">
  <h2 className="font-semibold text-slate-800">
    Cadre institutionnel
  </h2>
  <ul className="space-y-2 text-slate-600">
    <li>
      <a
        href="https://www.museedelhomme.fr/fr"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-sky-700"
      >
        Musée de l’Homme
      </a>
    </li>
    <li>
      <a
        href="https://ecoanthropologie.fr/fr"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-sky-700"
      >
        UMR 7206 Éco-anthropologie
      </a>
    </li>
    <li>
      <a
        href="https://anr.fr/Projet-ANR-20-CE27-0021"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-sky-700"
      >
        Projet ANR – ANR-20-CE27-0021
      </a>
    </li>
  </ul>
</div>

          {/* Column 3 — Meta */}
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-800">
              Informations
            </h2>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link
                  to="/about"
                  className="hover:text-sky-700"
                >
                  À propos
                </Link>
              </li>
              <li>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-700"
                >
                  Dépôt GitHub
                </a>
              </li>
              <li>
                <a
                  href={OTHER_GAME.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-700"
                >
                  Un autre jeu&nbsp;: {OTHER_GAME.title} ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500">
          © {new Date().getFullYear()} EvoGAME — Musée de l’Homme · UMR 7206
          Éco-anthropologie (CNRS, MNHN, Université Paris Cité) · Projet ANR
          EVOGRAM
        </div>
      </div>
    </footer>
  );
}
