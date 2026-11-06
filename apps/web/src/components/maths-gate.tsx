"use client";

import { useState } from "react";

import type { Lang } from "@/content/stories";
import { dict } from "@/i18n/dict";

/** A sum a 4-year-old can't do yet, as in the Grown-ups' corner. */
function question() {
  const a = 6 + Math.floor(Math.random() * 7);
  const b = 4 + Math.floor(Math.random() * 6);
  const answer = a + b;
  return { a, b, answer, options: [answer, answer + 2, answer - 3].sort(() => Math.random() - 0.5) };
}

/** The maths question inside a small modal: keeps grown-up things away from little fingers. */
export function MathsGate({ lang, onPass }: { lang: Lang; onPass: () => void }) {
  const t = dict[lang].voices;
  const [q, setQ] = useState(question);
  const [wrong, setWrong] = useState(false);
  return (
    <div className="space-y-4 text-center" data-maths-gate="">
      <h2 className={`text-2xl font-black ${lang === "am" ? "font-ethiopic" : "font-display"}`}>{t.gateTitle}</h2>
      <p className="text-muted">{t.gateSub}</p>
      <p className="font-display text-5xl font-black" data-sum={`${q.a}+${q.b}`}>
        {q.a} + {q.b} = ?
      </p>
      <div className="flex justify-center gap-3">
        {q.options.map((n) => (
          <button
            key={n}
            type="button"
            className="btn btn-plain min-w-20"
            onClick={() => {
              if (n === q.answer) onPass();
              else {
                setWrong(true);
                setQ(question());
              }
            }}
          >
            {n}
          </button>
        ))}
      </div>
      {wrong && <p className="text-coral">{t.wrong}</p>}
    </div>
  );
}
