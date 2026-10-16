import { useState, useMemo, useRef, useCallback } from "react";
import languages from "../data/languages.json";
import QuestionCard from "../components/QuestionCard";
import WorldMap from "../components/WorldMap";
import QuizResults from "../components/QuizResults";
import FadeInSection from "../components/FadeInSection";
import {
  QUIZ_LENGTH,
  getLanguageWords,
  getWordSet,
  isCorrect,
  isQuizEligible,
  shuffleArray,
} from "../utils/quizUtils";
import iconInstructions from "../images/undraw_learning_qt7d.svg";

/** Builds a fresh quiz: random languages, each with a pre-drawn word set. */
function buildQuiz() {
  const eligible = languages.filter((lang) =>
    isQuizEligible(getLanguageWords(lang.Glottocode)),
  );
  return shuffleArray(eligible)
    .slice(0, QUIZ_LENGTH)
    .map((lang) => ({
      lang,
      wordSet: getWordSet(getLanguageWords(lang.Glottocode)),
    }))
    .filter((q) => q.wordSet);
}

export default function Quiz() {
  const [round, setRound] = useState(0); // bump to replay
  const questions = useMemo(() => buildQuiz(), [round]); // eslint-disable-line react-hooks/exhaustive-deps

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [answer, setAnswer] = useState(null); // { correct } once submitted
  const [results, setResults] = useState([]);
  const [showScore, setShowScore] = useState(false);

  const gameRef = useRef(null);
  const scrollToGame = useCallback(() => {
    gameRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!questions.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-900 text-white">
        <p className="text-lg">Aucune question disponible pour le moment.</p>
      </div>
    );
  }

  const { lang: currentLang, wordSet } = questions[currentIndex];
  const score = results.filter((r) => r.isCorrect).length;
  const progress = ((currentIndex + (answer ? 1 : 0)) / questions.length) * 100;

  function handleSelect(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function handleSubmit() {
    if (selected.length !== 3 || answer) return;
    const correct = isCorrect(selected, wordSet.options, wordSet.mainCategory);
    setAnswer({ correct });
    setResults((prev) => [
      ...prev,
      {
        glottocode: currentLang.Glottocode,
        languageFR: currentLang.LanguageFR,
        isCorrect: correct,
      },
    ]);
  }

  function handleNext() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelected([]);
      setAnswer(null);
    } else {
      setShowScore(true);
    }
    scrollToGame();
  }

  function handleReplay() {
    setRound((r) => r + 1);
    setCurrentIndex(0);
    setSelected([]);
    setAnswer(null);
    setResults([]);
    setShowScore(false);
    scrollToGame();
  }

  return (
    <>
      {/* HERO + INSTRUCTIONS */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
          <FadeInSection>
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-amber-300">
              EvoGAME · Quiz
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-5">
              Quels mots vont ensemble&nbsp;?
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              Pour chaque langue, quatre mots te sont proposés. Trois
              appartiennent à la même catégorie grammaticale, un seul est
              l’intrus. Parfois ton intuition sera juste, parfois non&nbsp;—
              et c’est exactement ce qui rend les langues fascinantes&nbsp;!
            </p>
            <button
              onClick={scrollToGame}
              className="mt-8 bg-amber-400 hover:bg-amber-300 text-slate-900 px-7 py-3 rounded-2xl text-lg font-semibold transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              Commencer ↓
            </button>
          </FadeInSection>
          <img
            src={iconInstructions}
            alt=""
            className="hidden md:block w-40 h-40 opacity-90"
          />
        </div>
      </section>

      {/* GAME */}
      <section
        ref={gameRef}
        className="scroll-mt-4 min-h-screen w-full bg-gradient-to-b from-slate-800 to-slate-700 flex flex-col items-center px-4 sm:px-6 py-10 text-white"
      >
        {showScore ? (
          <QuizResults
            score={score}
            total={questions.length}
            results={results}
            onReplay={handleReplay}
          />
        ) : (
          <>
            {/* Progress */}
            <div className="w-full max-w-6xl mb-6">
              <div
                className="h-3 bg-slate-600 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={questions.length}
                aria-valuenow={currentIndex + 1}
                aria-label="Progression du quiz"
              >
                <div
                  className="h-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm md:text-base text-slate-200 mt-2">
                <span>
                  Question {currentIndex + 1} sur {questions.length}
                </span>
                <span>Score&nbsp;: {score}</span>
              </div>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-4 order-2 lg:order-1">
                <div className="w-full h-[300px] sm:h-[420px]">
                  <WorldMap
                    markers={[
                      {
                        glottocode: currentLang.Glottocode,
                        latitude: currentLang.Latitude,
                        longitude: currentLang.Longitude,
                        label: currentLang.LanguageFR,
                      },
                    ]}
                    mode="single"
                  />
                </div>
                <p className="text-center text-sm text-slate-500 mt-2">
                  {currentLang.CountryFR}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 order-1 lg:order-2">
                <QuestionCard
                  key={`${round}-${currentIndex}`}
                  language={currentLang}
                  wordSet={wordSet}
                  selected={selected}
                  answer={answer}
                  onSelect={handleSelect}
                  onSubmit={handleSubmit}
                  onNext={handleNext}
                  isLast={currentIndex === questions.length - 1}
                />
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
