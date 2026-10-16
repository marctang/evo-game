// config.js — liens externes du site, modifiables à un seul endroit

// Adresse de contact pour la soumission de nouvelles données
export const CONTACT_EMAIL = "marc.allassonniere-tang@mnhn.fr";

export const SUBMIT_DATA_URL =
  `mailto:${CONTACT_EMAIL}` +
  `?subject=${encodeURIComponent("EvoGAME – Soumission de données")}` +
  `&body=${encodeURIComponent(
    "Langue (nom + glottocode) :\nSystème de catégorisation :\nMots et catégories :\nSource (grammaire, page) :\n",
  )}`;

export const GITHUB_REPO_URL = "https://github.com/marctang/evo-game";

export const OTHER_GAME = {
  title: "Perdui dans l’espace",
  url: "https://mamuszkina.github.io/Perdui-dans-l-espace/",
};
