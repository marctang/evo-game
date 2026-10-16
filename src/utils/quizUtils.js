// utils/quizUtils.js
import words from "../data/words.json";

export const QUIZ_LENGTH = 15;

/** Fisher–Yates shuffle (returns a new array). */
export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Words of one language, as quiz options ({ id, word, category }). */
export function getLanguageWords(glottocode) {
  return words
    .filter((w) => w.Glottocode === glottocode && w.WordFR && w.Category)
    .map((w) => ({ id: w.WordID, word: w.WordFR, category: w.Category }));
}

function groupByCategory(langWords) {
  const map = {};
  langWords.forEach((w) => {
    if (!map[w.category]) map[w.category] = [];
    map[w.category].push(w);
  });
  return map;
}

/** A language can be quizzed if it has ≥1 category with 3 words and ≥2 categories. */
export function isQuizEligible(langWords) {
  const map = groupByCategory(langWords);
  const cats = Object.keys(map);
  return cats.length >= 2 && cats.some((c) => map[c].length >= 3);
}

/**
 * Picks 4 words: 3 from a random category, 1 (the odd one out) from another
 * random category. Words are tracked by id; the four French labels are
 * guaranteed to be distinct so the player can tell them apart.
 * Returns null if no valid set can be built.
 */
export function getWordSet(langWords) {
  if (!langWords || langWords.length < 4) return null;

  const map = groupByCategory(langWords);
  const mainCandidates = Object.keys(map).filter((c) => map[c].length >= 3);

  for (const mainCategory of shuffleArray(mainCandidates)) {
    // 3 main words with distinct labels
    const mainWords = [];
    for (const w of shuffleArray(map[mainCategory])) {
      if (!mainWords.some((m) => m.word === w.word)) mainWords.push(w);
      if (mainWords.length === 3) break;
    }
    if (mainWords.length < 3) continue;

    const used = new Set(mainWords.map((w) => w.word));
    const oddCandidates = Object.keys(map)
      .filter((c) => c !== mainCategory)
      .flatMap((c) => map[c])
      .filter((w) => !used.has(w.word));
    if (!oddCandidates.length) continue;

    // Pick the category first so small categories get a fair chance
    const oddCategory = pick([...new Set(oddCandidates.map((w) => w.category))]);
    const oddWord = pick(oddCandidates.filter((w) => w.category === oddCategory));

    return {
      options: shuffleArray([...mainWords, oddWord]),
      mainCategory,
      oddCategory,
    };
  }
  return null;
}

/** True if the selected ids are exactly the three main-category words. */
export function isCorrect(selectedIds, options, mainCategory) {
  const mainIds = options
    .filter((o) => o.category === mainCategory)
    .map((o) => o.id);
  return (
    selectedIds.length === mainIds.length &&
    selectedIds.every((id) => mainIds.includes(id))
  );
}

/** French display label for the (English) category names used in the data. */
const CATEGORY_FR = {
  masculine: "masculin",
  feminine: "féminin",
  neuter: "neutre",
  animate: "animé",
  inanimate: "inanimé",
  human: "humain",
  "non-human": "non humain",
  person: "personne",
  personal: "personnel",
};

export function categoryLabel(category) {
  if (!category) return "";
  const key = category.toLowerCase();
  if (CATEGORY_FR[key]) return CATEGORY_FR[key];
  return category.replace(/^Class\b/, "Classe");
}
