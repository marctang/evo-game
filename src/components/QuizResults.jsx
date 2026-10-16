import { Link } from "react-router-dom";

function verdict(ratio) {
  if (ratio >= 0.8) return "Impressionnant — une vraie intuition de linguiste !";
  if (ratio >= 0.5) return "Bien joué ! Certaines catégories sont vraiment déroutantes.";
  return "Les langues du monde réservent bien des surprises… Retente ta chance !";
}

export default function QuizResults({ score, total, results, onReplay }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-lg w-full text-slate-900">
      <p className="text-center text-xs font-semibold tracking-widest uppercase text-slate-500">
        Ton score
      </p>
      <h2 className="font-display text-5xl font-bold text-sky-700 text-center mt-1">
        {score} / {total}
      </h2>
      <p className="text-center text-slate-600 mt-3 mb-6">
        {verdict(total ? score / total : 0)}
      </p>

      <ul className="divide-y divide-slate-200">
        {results.map((res) => (
          <li
            key={res.glottocode}
            className="flex items-center justify-between py-3 px-1"
          >
            <span className="flex items-center gap-2 flex-1 min-w-0">
              <span
                className={`text-lg flex-shrink-0 ${
                  res.isCorrect ? "text-emerald-600" : "text-rose-600"
                }`}
                aria-label={res.isCorrect ? "Bonne réponse" : "Mauvaise réponse"}
              >
                {res.isCorrect ? "✓" : "✗"}
              </span>
              <span className="truncate">{res.languageFR}</span>
            </span>
            <Link
              to={`/languages/${res.glottocode}`}
              className="text-sky-700 hover:underline text-sm ml-4 flex-shrink-0"
            >
              Voir la langue →
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onReplay}
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 px-6 py-3 rounded-xl font-semibold"
        >
          Rejouer
        </button>
        <Link
          to="/languages"
          className="border border-slate-300 hover:bg-slate-50 px-6 py-3 rounded-xl font-semibold text-center"
        >
          Explorer les langues
        </Link>
      </div>
    </div>
  );
}
