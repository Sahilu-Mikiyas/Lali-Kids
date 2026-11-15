"use client";

import { useState, type ReactNode } from "react";

import type { Lang } from "@/content/stories";
import { DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Put the steps in order (copied from the Our Ethiopia demos' Order, courses don't import each
  other): the steps are in a mixed-up pile; tap the one that comes next. Each right tap adds the
  step to the picture and tells a little fact; a wrong tap gets a kind hint. Steps carry
  data-step="<key>" (for the tests).

  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

export type Step = { key: string; label: T; fact: T; pic?: ReactNode };

/** `steps` is the right order, `pile` the mixed-up order they are shown in. */
export function Order({ lang, title, goal, steps, pile, hint, finale, stage, color, onDone }: { lang: Lang; title: T; goal: T; steps: Step[]; pile: string[]; hint: T; finale: T; stage: (placed: number) => ReactNode; color: string; onDone: () => void }) {
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
    <DemoFrame lang={lang} title={title} goal={goal} step={placed} total={steps.length} color={color}>
      <Stage label={t(lang, title)}>{stage(placed)}</Stage>
      {finished ? (
        <Finale lang={lang} text={finale} onDone={onDone} color={color} />
      ) : (
        <>
          {last && (
            <Feedback tone="great" action={done ? <Next color={color} onClick={() => setFinished(true)}>{t(lang, { en: "Finish", am: "ጨርሱ" })}</Next> : undefined}>
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
