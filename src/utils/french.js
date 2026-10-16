// utils/french.js — small helpers for French phrasing

const startsWithVowel = (s) =>
  /^[aeiouyàâäéèêëîïôöùûü]/i.test((s || "").normalize("NFC"));

/** "de " or "d’" depending on the next word: d’Aari, de Hindi. */
export function dePrefix(word) {
  return startsWithVowel(word) ? "d’" : "de ";
}

/** Lower-case, accent-insensitive string for search. */
export function normalizeForSearch(s) {
  return (s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "'")
    .toLowerCase()
    .trim();
}
