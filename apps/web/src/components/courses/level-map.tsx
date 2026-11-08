"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

import { Bee } from "@/components/characters";
import { useLang, useT } from "@/i18n/provider";
import type { StepState } from "@/lib/courses/engine";
import { playTapSound } from "@/lib/tap-sound";

/*
  The level map: each level a stepping stone on a winding path (like Anbessa's river in the first
  Lali book), locked, open, waiting for VIP's pace, or passed with its stars. Lali the bee waits
  on the stone the child is on. Tapping a stone shows its lessons and its quiz.
*/

type T = Record<"en" | "am", string>;
export type MapLesson = { key: string; kind: "story" | "demo" | "practice"; title: T; done: boolean; href: string | null };
export type MapLevel = { id: string; title: T; goal: T; state: StepState; stars: number; best: { score: number; total: number } | null; lessons: MapLesson[]; quizHref: string | null };
export type MapFinal = { state: StepState; stars: number; best: { score: number; total: number } | null; href: string | null };

const ROW = 128;

function Stars({ n, dark = false }: { n: number; dark?: boolean }) {
  return (
    <span className="flex justify-center gap-0.5 text-lg leading-none" aria-label={`${n} stars`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={i < n ? "text-gold drop-shadow-[0_1px_0_rgba(0,0,0,.2)]" : dark ? "text-white/30" : "text-line"}>
          ★
        </span>
      ))}
    </span>
  );
}

const ICON: Record<MapLesson["kind"], string> = { story: "📖", demo: "✋", practice: "✏️" };

export function LevelMap({ color, levels, final, opensAt, opensLabel }: { color: string; levels: MapLevel[]; final: MapFinal; opensAt: string | null; opensLabel: string | null }) {
  const t = useT().courses;
  const lang = useLang();
  const stones = [...levels.map((l) => ({ state: l.state, stars: l.stars })), { state: final.state, stars: final.stars }];
  const current = Math.max(
    0,
    stones.findIndex((s) => s.state === "open" || s.state === "waiting"),
  );
  const here = stones.findIndex((s) => s.state === "open" || s.state === "waiting");
  const [picked, setPicked] = useState<number>(here >= 0 ? here : stones.length - 1);
  const h = stones.length * ROW + 56;
  const pos = (i: number) => ({ x: i % 2 === 0 ? 28 : 72, y: 86 + i * ROW });
  const d = stones
    .map((_, i) => {
      const p = pos(i);
      if (i === 0) return `M ${p.x} ${p.y}`;
      const q = pos(i - 1);
      return `C ${q.x} ${q.y + ROW / 2}, ${p.x} ${p.y - ROW / 2}, ${p.x} ${p.y}`;
    })
    .join(" ");
  const sel = picked < levels.length ? levels[picked] : null;
  const label = (i: number) => (i < levels.length ? t.level(i + 1) : t.finalTest);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
      <div className="course-map relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#DFF3FF,#E9F9E8)] shadow-[0_8px_0_var(--color-line)]" style={{ height: h }} data-level-map="">
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 100 ${h}`} preserveAspectRatio="none" aria-hidden>
          <path d={d} fill="none" stroke="#7FC8F0" strokeWidth={9} strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity={0.55} />
          <path d={d} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="2 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="course-path-flow" />
        </svg>
        {stones.map((s, i) => {
          const p = pos(i);
          const isFinal = i === levels.length;
          const bg = s.state === "passed" ? color : s.state === "open" ? "#fff" : s.state === "waiting" ? "#FFF4D2" : "#C9D6E6";
          return (
            <motion.button
              key={i}
              type="button"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.08 * i }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                playTapSound("pop");
                setPicked(i);
              }}
              aria-pressed={picked === i}
              aria-label={`${label(i)}: ${t.states[s.state]}`}
              data-stone={i}
              data-state={s.state}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 ${picked === i ? "z-10" : ""}`}
              style={{ left: `${p.x}%`, top: p.y }}
            >
              <span
                className={`grid h-[72px] w-[72px] place-items-center rounded-[46%_54%_48%_52%] font-display text-3xl font-black shadow-[0_6px_0_rgba(27,42,78,.22)] ${s.state === "open" ? "course-stone-glow" : ""} ${picked === i ? "ring-4 ring-gold" : ""}`}
                style={{ background: bg, color: s.state === "passed" ? "#fff" : "var(--color-ink)" }}
              >
                {s.state === "locked" ? "🔒" : s.state === "waiting" ? "⏳" : isFinal ? "🏆" : i + 1}
              </span>
              <span className="rounded-full bg-white/85 px-2 py-0.5 text-xs font-bold shadow-sm">{label(i)}</span>
              {s.state === "passed" && <Stars n={s.stars} />}
            </motion.button>
          );
        })}
        {here >= 0 && (
          <motion.div
            className="pointer-events-none absolute"
            initial={{ left: `${pos(0).x}%`, top: pos(0).y - 70 }}
            animate={{ left: `${pos(current).x + (current % 2 === 0 ? 14 : -14)}%`, top: pos(current).y - 62 }}
            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.4 }}
            aria-hidden
          >
            <div className="animate-float">
              <Bee size={44} />
            </div>
          </motion.div>
        )}
      </div>

      <div className="space-y-4" data-level-panel={picked}>
        {opensAt && opensLabel && (
          <p className="rounded-[24px] bg-[#FFF4D2] p-4 font-bold" data-opens-at={opensAt}>
            ⏳ {opensLabel}
          </p>
        )}
        <div className="rounded-[28px] bg-white p-5 shadow-[0_6px_0_var(--color-line)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color }}>
            {label(picked)} · {t.states[stones[picked].state]}
          </p>
          {sel ? (
            <>
              <h2 className={`mt-1 font-display text-3xl font-black ${lang === "am" ? "font-ethiopic" : ""}`}>{sel.title[lang]}</h2>
              <p className="mt-1 text-muted">{sel.goal[lang]}</p>
              {sel.lessons.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                  {sel.lessons.map((l) => {
                    const inner = (
                      <>
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sky-soft text-xl" aria-hidden>
                          {ICON[l.kind]}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-bold uppercase tracking-wide text-muted">{t.kinds[l.kind]}</span>
                          <span className={`block truncate font-display text-lg font-black ${lang === "am" ? "font-ethiopic" : ""}`}>{l.title[lang]}</span>
                        </span>
                        {l.done && (
                          <span className="rounded-full bg-teal/15 px-2.5 py-1 text-sm font-bold text-teal" data-lesson-done="">
                            ✓ {t.done}
                          </span>
                        )}
                      </>
                    );
                    return (
                      <li key={l.key}>
                        {l.href ? (
                          <Link href={l.href} className="flex items-center gap-3 rounded-2xl border-2 border-line p-2.5 transition hover:-translate-y-0.5 hover:border-blue" data-lesson={l.key}>
                            {inner}
                          </Link>
                        ) : (
                          <span className="flex items-center gap-3 rounded-2xl border-2 border-line p-2.5 opacity-60" data-lesson={l.key}>
                            {inner}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {sel.quizHref ? (
                  <Link href={sel.quizHref} className="btn btn-primary" data-take-quiz={sel.id}>
                    {sel.state === "passed" ? t.retakeQuiz : t.takeQuiz}
                  </Link>
                ) : (
                  <span className="btn btn-plain pointer-events-none opacity-60">🔒 {t.quiz}</span>
                )}
                {sel.best && <span className="font-bold text-muted">{t.best(sel.best.score, sel.best.total)}</span>}
              </div>
            </>
          ) : (
            <>
              <h2 className="mt-1 font-display text-3xl font-black">{t.finalTest}</h2>
              <p className="mt-1 text-muted">{t.finalSub}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {final.href ? (
                  <Link href={final.href} className="btn btn-primary" data-take-final="">
                    {t.takeFinal}
                  </Link>
                ) : (
                  <span className="btn btn-plain pointer-events-none opacity-60">🔒 {t.finalTest}</span>
                )}
                {final.best && <span className="font-bold text-muted">{t.best(final.best.score, final.best.total)}</span>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
