"use client";

import { useId, useState, type ReactNode } from "react";

import type { Lang } from "@/content/stories";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  A shared shape for the level 4 to 6 choice demos: a few rounds, each a moment in the picture
  and two to four answers. A good answer plays out in the picture and is praised; an answer that
  doesn't fit is explained kindly, and the child tries again (that answer stays marked). After the
  last round there can be an extra step (`ending`) before the finale.
*/

export type RoundState = "ask" | "good" | "oops";
export type Opt = { label: T; pic?: ReactNode; ok: boolean; note?: T };
export type Round = { say: T; options: Opt[]; good: T; scene: (id: string, state: RoundState) => ReactNode };

export function ChoiceRounds({
  lang,
  title,
  goal,
  color,
  rounds,
  finale,
  finaleScene,
  ending,
  cols = 1,
  onDone,
}: {
  lang: Lang;
  title: T;
  goal: T;
  color: string;
  rounds: Round[];
  finale: T;
  finaleScene: (id: string) => ReactNode;
  /** An extra step after the rounds; call `finish` to go on to the finale. */
  ending?: (id: string, finish: () => void) => { scene: ReactNode; controls: ReactNode };
  cols?: 1 | 2 | 3;
  onDone: () => void;
}) {
  const id = useId().replace(/:/g, "");
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);
  const [ended, setEnded] = useState(!ending);
  const roundsDone = i >= rounds.length;
  const done = roundsDone && ended;
  const r = rounds[Math.min(i, rounds.length - 1)];
  const chosen = pick === null ? null : r.options[pick];
  const state: RoundState = chosen ? (chosen.ok ? "good" : "oops") : "ask";
  const total = rounds.length + (ending ? 1 : 0);
  const extra = roundsDone && !ended && ending ? ending(id, () => setEnded(true)) : null;

  const choose = (k: number) => {
    setPick(k);
    if (r.options[k].ok) sound.good();
    else {
      sound.gentle();
      setTried((x) => [...x, k]);
    }
  };
  const next = () => {
    setI((n) => n + 1);
    setPick(null);
    setTried([]);
  };
  const grid = cols === 3 ? "sm:grid-cols-3" : cols === 2 ? "sm:grid-cols-2" : "";

  return (
    <DemoFrame lang={lang} title={title} goal={goal} step={roundsDone ? rounds.length + (done && ending ? 1 : 0) : i} total={total} color={color}>
      <Stage label={roundsDone ? undefined : t(lang, r.say)}>
        {done ? finaleScene(id) : extra ? extra.scene : <g key={`${i}-${pick ?? "x"}`}>{r.scene(id, state)}</g>}
      </Stage>

      {done ? (
        <Finale lang={lang} text={finale} onDone={onDone} color={color} />
      ) : extra ? (
        extra.controls
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, r.say)}</p>
          {chosen?.ok ? (
            <Feedback tone="great" action={<Next onClick={next} color={color}>{t(lang, i === rounds.length - 1 && !ending ? { en: "Finish", am: "ጨርሱ" } : { en: "Next", am: "ቀጣይ" })}</Next>}>
              {t(lang, r.good)}
            </Feedback>
          ) : chosen ? (
            <Feedback tone="gentle" action={<Next onClick={() => setPick(null)} color="#C98A0A">{t(lang, { en: "Try again", am: "እንደገና ሞክሩ" })}</Next>}>
              {chosen.note ? t(lang, chosen.note) : t(lang, { en: "Hmm, think again. What would help most?", am: "እም፣ እንደገና አስቡ። ይበልጥ የሚረዳው የትኛው ነው?" })}
            </Feedback>
          ) : (
            <div className={`mt-3 grid gap-3 ${grid}`}>
              {r.options.map((o, k) => (
                <Choice key={k} onClick={() => choose(k)} pic={o.pic} tone={tried.includes(k) ? "soft" : "plain"}>
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
