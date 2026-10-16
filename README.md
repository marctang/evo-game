# Nominal Categorization Systems – Interactive Dataset & Web Application

This repository contains the interactive web application and the underlying dataset
developed as part of a research project on nominal categorization systems across languages.

The application allows users to explore linguistic data, sources, and statistics,
and provides access to the curated dataset.

## Repository contents

This repository includes:

- The source code of a React-based web application used to explore the dataset
- The curated linguistic dataset in JSON format
- A cleaned and consolidated Excel version of the dataset
- Documentation describing data structure and contribution workflows

The web application is provided as a research dissemination and exploration tool.

## The dataset

The dataset documents nominal categorization systems (gender, noun classes,
classifiers) across a set of languages, based on data extracted from descriptive grammars.

### Included data

- Language metadata (names, glottocodes, geographic information)
- Classification systems
- Lexical examples with categorical assignment
- Explicit bibliographic sources for each entry

### Download

- 📥 **Clean Excel file**:  
  `./public/MEDIATION-BDD_clean_FINAL.xlsx`  
  (also downloadable from the “Résultats” section of the *À propos* page)

The JSON files used by the application are located in:

- `src/data/languages.json`
- `src/data/sources.json`
- `src/data/words.json`
- `src/data/classSystems.json`

All string fields are trimmed (no leading/trailing spaces): glottocodes in
`words.json` and `sources.json` must match `languages.json` exactly.

## How to cite

If you use this dataset or the web application in academic work, please cite:

> [AUTHORS: TO BE DISCUSSED].  
> _Nominal Categorization Systems Dataset: words and categories_.  
> Web application and dataset, [2026].  
> URL: [to be added]

A formal data paper and/or DOI may be added in the future.

## Contributing data

Contributions are welcome.

### Submission form (recommended)

Researchers and native speakers can submit new data via a structured submission form:

👉 [Google Form – Submit data]  
(link added in the web application)

Submissions are reviewed manually before integration into the dataset.

## Technical notes

- Frontend: React
- Styling: Tailwind CSS
- Data storage: static JSON files
- No backend server is currently used
- Routing uses `HashRouter` (URLs like `/#/quiz`) so every page works on static hosting

## Running locally

```bash
npm ci
npm start        # development server on http://localhost:3000
npm run build    # production build in ./build
```

## Deployment (GitHub Pages)

The site is deployed automatically by `.github/workflows/deploy.yml` on every
push to `main`.

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source:
GitHub Actions**. The site is then published at
`https://<user>.github.io/<repository>/`.

`"homepage": "."` in `package.json` makes all asset paths relative, so the
build works whatever the repository or account name.

This architecture was chosen to allow rapid development and transparent access
to the data during the research phase.

## Project status and future work

This repository reflects the state of the project at the time of public release.

Planned or possible future developments include:

- Front end enhancements of the app (quiz page)
- Backend integration for validated community submissions
- Automated data validation pipelines
- Extended documentation and data publication (e.g. DOI)

The current version should be considered a stable research snapshot.
