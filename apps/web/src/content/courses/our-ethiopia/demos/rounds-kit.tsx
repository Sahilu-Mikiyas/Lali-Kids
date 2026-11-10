"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

import type { Lang } from "@/content/stories";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Two small game shapes shared by the level 4 to 6 demos (built on demo-kit.tsx).

  Rounds: a picture, a question and two to four big answers. A right answer shows why (and the
  picture changes); a wrong one gets a kind hint and another try. Answers carry data-choice.

  Order: steps in a mixed-up pile; tap the one that comes next. Each right tap adds the step to
  the picture and tells a little fact; a wrong tap gets a hint. Steps carry data-step="<key>".

  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

export type Option = { key: string; label: T; pic?: ReactNode };
export type Round = { prompt: T; right: string; options: Option[]; why: T; scene: (solved: boolean) => ReactNode };

const COLOR = "#15803D";

/** Choose-the-answer rounds, one after another, ending with a finale. */
export function Rounds({ lang, title, goal, rounds, hint, finale, end, onDone, intro }: { lang: Lang; title: T; goal: T; rounds: Round[]; hint: T; finale: T; end: ReactNode; onDone: () => void; intro?: ReactNode }) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const done = i >= rounds.length;
  const r = rounds[Math.min(i, rounds.length - 1)];
  const right = pick === r.right;
  return (
    <DemoFrame lang={lang} title={title} goal={goal} step={i} total={rounds.length} color={COLOR}>
      {intro}
      <Stage label={done ? undefined : t(lang, r.prompt)}>
        {done ? (
          end
        ) : (
          <g key={`${i}-${right}`}>
            {r.scene(right)}
            {right && <motion.circle cx={200} cy={150} r={20} fill="none" stroke="#FFD233" strokeWidth={4} initial={{ r: 10, opacity: 1 }} animate={{ r: 140, opacity: 0 }} transition={{ duration: 1 }} />}
          </g>
        )}
      </Stage>
      {done ? (
        <Finale lang={lang} text={finale} onDone={onDone} color={COLOR} />
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, r.prompt)}</p>
          {pick && right ? (
            <Feedback
              tone="great"
              action={
                <Next
                  color={COLOR}
                  onClick={() => {
                    setI((n) => n + 1);
                    setPick(null);
                  }}
                >
                  {t(lang, i === rounds.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next", am: "ቀጣይ" })}
                </Next>
              }
            >
              {t(lang, r.why)}
            </Feedback>
          ) : pick ? (
            <Feedback tone="gentle" action={<Next color="#C98A0A" onClick={() => setPick(null)}>{t(lang, { en: "Try again", am: "እንደገና ሞክሩ" })}</Next>}>
              {t(lang, hint)}
            </Feedback>
          ) : (
            <div className={`mt-3 grid gap-3 ${r.options.length > 3 ? "sm:grid-cols-2" : ""}`}>
              {r.options.map((o) => (
                <Choice
                  key={o.key}
                  pic={
                    o.pic ? (
                      <svg width={44} height={44} viewBox="0 0 44 44" aria-hidden>
                        {o.pic}
                      </svg>
                    ) : undefined
                  }
                  onClick={() => {
                    setPick(o.key);
                    if (o.key === r.right) sound.good();
                    else sound.gentle();
                  }}
                >
                  {t(lang, o.label)}
                </Choice>
              ))}
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}

export type Step = { key: string; label: T; fact: T; pic?: ReactNode };

/** Put the steps in order: `steps` is the right order, `pile` the mixed-up order they are shown in. */
export function Order({ lang, title, goal, steps, pile, hint, finale, stage, onDone }: { lang: Lang; title: T; goal: T; steps: Step[]; pile: string[]; hint: T; finale: T; stage: (placed: number) => ReactNode; onDone: () => void }) {
  const [placed, setPlaced] = useState(0);
  const [oops, setOops] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const done = placed === steps.length;
  const byKey = Object.fromEntries(steps.map((s) => [s.key, s]));
  const last = placed > 0 ? steps[placed - 1] : null;
  const tap = (k: string) => {
    if (done) return;
    if (k === steps[placed].key) {
      sound.good();
      setPlaced((n) => n + 1);
      setOops(null);
    } else {
      sound.gentle();
      setOops(k);
    }
  };
  return (
    <DemoFrame lang={lang} title={title} goal={goal} step={placed} total={steps.length} color={COLOR}>
      <Stage label={t(lang, title)}>{stage(placed)}</Stage>
      {finished ? (
        <Finale lang={lang} text={finale} onDone={onDone} color={COLOR} />
      ) : (
        <>
          {last && (
            <Feedback tone="great" action={done ? <Next color={COLOR} onClick={() => setFinished(true)}>{t(lang, { en: "Finish", am: "ጨርሱ" })}</Next> : undefined}>
              <span className="font-extrabold">
                {placed}. {t(lang, last.label)}
              </span>{" "}
              {t(lang, last.fact)}
            </Feedback>
          )}
          {oops && !done && <Feedback tone="gentle">{t(lang, hint)}</Feedback>}
          {!done && (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {pile.map((k) => {
                const s = byKey[k];
                const at = steps.findIndex((x) => x.key === k);
                const isPlaced = at < placed;
                return (
                  <button
                    key={k}
                    type="button"
                    data-step={k}
                    disabled={isPlaced}
                    onClick={() => tap(k)}
                    className="flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 px-3 py-2 text-left font-display text-base font-extrabold leading-snug text-ink transition-transform active:translate-y-0.5 disabled:opacity-50"
                    style={{ background: isPlaced ? "#E4F7EA" : oops === k ? "#FFF4E0" : "#FFFFFF", borderColor: isPlaced ? "#2FA35A" : oops === k ? "#F5B21E" : "#D3E4F4" }}
                  >
                    {s.pic && (
                      <svg width={44} height={44} viewBox="0 0 44 44" aria-hidden className="shrink-0">
                        {s.pic}
                      </svg>
                    )}
                    <span className="min-w-0 flex-1">
                      {isPlaced ? `${at + 1}. ` : ""}
                      {t(lang, s.label)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
