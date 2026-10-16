// NavBar.jsx
import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `px-1 py-1 border-b-2 transition-colors ${
    isActive
      ? "text-sky-700 font-medium border-sky-600"
      : "text-slate-600 border-transparent hover:text-sky-700"
  }`;

export default function NavBar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur"
      aria-label="Navigation principale"
    >
      <a
        href="#contenu"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("contenu")?.focus();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 bg-white px-3 py-1 rounded"
      >
        Aller au contenu
      </a>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="font-display text-lg font-bold text-slate-900 hover:text-sky-700"
        >
          Evo<span className="text-amber-500">GAME</span>
        </Link>

        <div className="flex gap-4 sm:gap-6 text-sm">
          <NavLink to="/quiz" className={linkClass}>
            Quiz
          </NavLink>
          <NavLink to="/languages" className={linkClass}>
            Langues
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            À propos
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
