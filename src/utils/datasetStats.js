// utils/datasetStats.js
import languages from "../data/languages.json";
import sources from "../data/sources.json";
import words from "../data/words.json";

export function computeDatasetStats() {
  return {
    numberOfLanguages: languages.length,
    numberOfGrammars: sources.length,
    numberOfLexicalItems: words.length,
  };
}
