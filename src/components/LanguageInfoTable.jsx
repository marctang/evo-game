// components/LanguageInfoTable.jsx
import React from "react";

function Row({ label, children, last = false }) {
  return (
    <tr className={last ? "" : "border-b border-slate-200"}>
      <th scope="row" className="py-3 pr-4 font-semibold text-slate-700 align-top whitespace-nowrap">
        {label}
      </th>
      <td className="py-3 text-slate-700">{children}</td>
    </tr>
  );
}

export default function LanguageInfoTable({ language, sources }) {
  if (!language) return null;

  return (
    <table className="w-full text-left">
      <tbody>
        <Row label="Langue">{language.LanguageFR}</Row>
        <Row label="Pays">{language.CountryFR}</Row>
        {language.CommentaryFR && (
          <Row label="Système grammatical">{language.CommentaryFR}</Row>
        )}
        {sources.length > 0 && (
          <Row label={sources.length > 1 ? "Sources" : "Source"}>
            <ul className="space-y-2">
              {sources.map((s) => (
                <li key={s.SourceID} className="text-sm leading-relaxed">
                  {s.CitationEN}
                  {s.SourceURL && /^https?:\/\//.test(s.SourceURL) && (
                    <>
                      {" "}
                      <a
                        href={s.SourceURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-700 hover:underline whitespace-nowrap"
                      >
                        [lien]
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </Row>
        )}
        <Row label="Glottolog" last>
          <a
            href={language.GlottologURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-700 hover:underline"
          >
            {language.Glottocode} ↗
          </a>
        </Row>
      </tbody>
    </table>
  );
}
