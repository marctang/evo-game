import { Link } from "react-router-dom";
import { categoryLabel } from "../utils/quizUtils";
import { dePrefix } from "../utils/french";

export default function QuestionCard({
  language,
  wordSet,
  selected,
  answer,
  onSelect,
  onSubmit,
  onNext,
  isLast,
}) {
  const { options, mainCategory, oddCategory } = wordSet;
  const isSubmitted = Boolean(answer);
  const canSubmit = selected.length === 3;
  const name = language.LanguageFR;

  function optionClass(opt) {
    const isSelected = selected.includes(opt.id);
    if (!isSubmitted) {
      return isSelected
        ? "bg-sky-600 text-white border-sky-600 shadow-md"
        : "bg-slate-50 border-slate-300 hover:bg-slate-100 hover:border-slate-400 text-slate-900";
    }
    const inGroup = opt.category === mainCategory;
    if (inGroup && isSelected) return "bg-emerald-100 border-emerald-500 text-emerald-900";
    if (inGroup) return "bg-white border-emerald-500 border-dashed text-emerald-900";
    if (isSelected) return "bg-rose-100 border-rose-500 text-rose-900";
    return "bg-amber-50 border-amber-400 text-amber-900";
  }

  return (
    <div className="text-center">
      <h2 className="font-display text-xl md:text-2xl font-semibold mb-2 text-slate-900">
        Si j’étais un·e locuteur·rice {dePrefix(name)}
        <span className="text-sky-700">{name}</span>, quels mots
        regrouperais-je&nbsp;?
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Sélectionne les trois mots qui appartiennent à la même catégorie.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6" role="group" aria-label="Mots proposés">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(opt.id)}
              disabled={isSubmitted}
              className={`p-4 rounded-xl border-2 text-lg font-medium transition-all duration-200 disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${optionClass(opt)}`}
            >
              {opt.word}
              {isSubmitted && (
                <span className="block text-xs font-normal mt-1 opacity-80">
                  {categoryLabel(opt.category)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {!isSubmitted ? (
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`px-8 py-3 rounded-xl font-semibold transition-colors ${
            canSubmit
              ? "bg-sky-600 hover:bg-sky-700 text-white"
              : "bg-slate-200 text-slate-500 cursor-not-allowed"
          }`}
        >
          Valider ({selected.length}/3)
        </button>
      ) : (
        <div className="space-y-4 text-left" aria-live="polite">
          <p
            className={`text-lg font-semibold text-center ${
              answer.correct ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {answer.correct ? "✓ Bonne réponse !" : "✗ Pas cette fois…"}
          </p>
          <p className="text-slate-700 text-center">
            Les mots en vert appartiennent à la catégorie{" "}
            <strong>« {categoryLabel(mainCategory)} »</strong>&nbsp;; l’intrus
            est de la catégorie <strong>« {categoryLabel(oddCategory)} »</strong>.
          </p>
          {language.CommentaryFR && (
            <p className="text-slate-600 bg-slate-50 rounded-xl p-4 leading-relaxed">
              {language.CommentaryFR}{" "}
              <Link
                to={`/languages/${language.Glottocode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 hover:underline whitespace-nowrap"
              >
                Voir la fiche de la langue →
              </Link>
            </p>
          )}
          <div className="text-center">
            <button
              onClick={onNext}
              autoFocus
              className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              {isLast ? "Voir mon score" : "Question suivante →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
