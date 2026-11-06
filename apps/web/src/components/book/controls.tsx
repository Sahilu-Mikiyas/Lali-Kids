"use client";

import { motion } from "motion/react";
import { useId, type ReactNode } from "react";

import type { Lang } from "@/content/stories";

export function Arrow({
  dir,
  onClick,
  disabled,
  label,
  pulse,
  big = false,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  label: string;
  pulse?: boolean;
  big?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`grid shrink-0 place-items-center rounded-full text-ink shadow-[0_5px_0_rgba(27,42,78,.22)] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none disabled:pointer-events-none disabled:opacity-25 ${
        big ? "h-16 w-16" : "h-14 w-14"
      } ${pulse ? "animate-[nudge_1.2s_ease-in-out_infinite] bg-gold" : "bg-white"}`}
    >
      <svg viewBox="0 0 24 24" className={big ? "h-8 w-8" : "h-6 w-6"} aria-hidden>
        <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} stroke="currentColor" strokeWidth={3.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/** English ⇄ አማርኛ, with the dark pill gliding across to the chosen language. */
export function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const id = useId();
  return (
    <div className="flex rounded-full bg-white p-1 shadow-[0_3px_0_rgba(27,42,78,.18)]" role="group" aria-label="Story language">
      {(["en", "am"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`relative rounded-full px-3.5 py-1.5 font-bold transition-colors duration-300 sm:px-4 ${lang === l ? "text-white" : "text-muted hover:text-ink"} ${l === "am" ? "font-ethiopic" : ""}`}
        >
          {lang === l && (
            <motion.span layoutId={`lali-lang-pill-${id}`} className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 520, damping: 40 }} />
          )}
          <span className="relative">{l === "en" ? "English" : "አማርኛ"}</span>
        </button>
      ))}
    </div>
  );
}

export function RoundButton({ label, onClick, children, pressed }: { label: string; onClick: () => void; children: ReactNode; pressed?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_3px_0_rgba(27,42,78,.18)] transition hover:-translate-y-0.5 active:translate-y-0.5"
    >
      {children}
    </button>
  );
}

export const Icon = {
  close: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
    </svg>
  ),
  soundOn: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" />
    </svg>
  ),
  soundOff: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      <path d="M16.5 9.5l5 5M21.5 9.5l-5 5" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  ),
  expand: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  shrink: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" stroke="currentColor" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/** One dot per page (a diamond for The End). */
export function PageDots({ total, page, light = false }: { total: number; page: number; light?: boolean }) {
  return (
    <div className="flex max-w-[60vw] flex-wrap items-center justify-center gap-1.5 sm:gap-2" aria-hidden>
      {Array.from({ length: total + 1 }, (_, i) => (
        <span
          key={i}
          className={`h-2.5 rounded-full transition-all duration-300 sm:h-3 ${i === page ? "w-7 bg-coral sm:w-8" : `w-2.5 sm:w-3 ${light ? "bg-white/55" : "bg-[#D9D2BC]"}`} ${
            i === total ? "rotate-45 rounded-[3px]" : ""
          }`}
        />
      ))}
    </div>
  );
}
