// /components/LanguageList.jsx
import { Link } from "react-router-dom";

export default function LanguageList({ languages }) {
  if (languages.length === 0) {
    return <p className="text-slate-400 text-center py-6">Aucune langue trouvée</p>;
  }

  return (
    <>
      <p className="text-sm text-slate-500">
        {languages.length} langue{languages.length > 1 ? "s" : ""}
      </p>
      <ul className="max-h-96 overflow-y-auto divide-y divide-slate-100">
        {languages.map((lang) => (
          <li key={lang.Glottocode}>
            <Link
              to={`/languages/${lang.Glottocode}`}
              className="flex items-baseline justify-between gap-4 p-2 rounded hover:bg-sky-50 focus-visible:bg-sky-50 focus-visible:outline-none"
            >
              <span className="text-slate-800">{lang.LanguageFR}</span>
              <span className="text-xs text-slate-400 truncate">
                {lang.CountryFR}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
