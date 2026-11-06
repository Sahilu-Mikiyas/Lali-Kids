"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import type { Lang, Story } from "@/content/stories";
import { HINT_MS, hidingSpot, type Cover, type Peek } from "@/lib/find-lali";
import { playTapSound } from "@/lib/tap-sound";
import { dict } from "@/i18n/dict";
import { Bee, BeeShape } from "./characters";

/*
  Find Lali: a tiny bee hiding on every page of every story, drawn over the picture.
  She sits inside the picture's own box (which clips her), so she can never cover the words,
  and her taps bubble up to the book like any other, so dragging a page from on top of her
  still turns it (the book swallows the click after a drag, so that doesn't count as a find).
*/

/** Which way is "further out of hiding" for each side she can peek from (in her own frame). */
const OUT: Record<Peek, { px: string; py: string; pr: string }> = {
  left: { px: "22%", py: "0%", pr: "6deg" },
  right: { px: "22%", py: "0%", pr: "6deg" },
  top: { px: "0%", py: "22%", pr: "-8deg" },
  bottom: { px: "0%", py: "-24%", pr: "-6deg" },
};

/** Her pose while hidden, and once found. */
function poses(peek: Peek): { hidden: string; found: string; flip: boolean } {
  switch (peek) {
    case "left":
      return { hidden: "translate(-14%, 0) rotate(8deg)", found: "translate(78%, -10%) rotate(0deg) scale(1.2)", flip: false };
    case "right":
      return { hidden: "translate(-14%, 0) rotate(8deg)", found: "translate(78%, -10%) rotate(0deg) scale(1.2)", flip: true };
    case "top":
      return { hidden: "translate(0, -8%) rotate(28deg)", found: "translate(0, 95%) rotate(0deg) scale(1.2)", flip: false };
    default:
      return { hidden: "translate(0, 26%) rotate(-12deg)", found: "translate(0, -70%) rotate(0deg) scale(1.2)", flip: false };
  }
}

function CoverArt({ cover }: { cover: Cover }) {
  if (cover === "edge") return null;
  if (cover === "cloud") {
    return (
      <svg viewBox="0 0 60 30" className="pointer-events-none absolute -left-[35%] -top-[22%] w-[170%]" aria-hidden>
        <path d="M6 22 Q2 12 12 10 Q14 2 24 4 Q30 -2 38 4 Q48 2 50 10 Q60 12 54 22Z" fill="#fff" />
        <path d="M10 20 Q30 26 52 20" stroke="#E4F2FF" strokeWidth={3} fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (cover === "flower") {
    return (
      <svg viewBox="0 0 50 40" className="pointer-events-none absolute -bottom-[34%] -left-[12%] w-[124%]" aria-hidden>
        <path d="M6 40 Q10 22 4 12 M16 40 Q16 24 22 16 M44 40 Q40 26 46 16 M34 40 Q34 28 30 20" stroke="#3E9F5C" strokeWidth={5} fill="none" strokeLinecap="round" />
        <ellipse cx={12} cy={34} rx={10} ry={4} fill="#4DBA74" transform="rotate(-25 12 34)" />
        <ellipse cx={38} cy={33} rx={10} ry={4} fill="#4DBA74" transform="rotate(25 38 33)" />
        <g transform="translate(25 22)">
          {Array.from({ length: 6 }, (_, i) => (
            <ellipse key={i} cx={0} cy={-7} rx={4.2} ry={7} fill="#FF8FA3" transform={`rotate(${i * 60})`} />
          ))}
          <circle r={4.6} fill="#FFD23F" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 50 30" className="pointer-events-none absolute -bottom-[22%] -left-[14%] w-[128%]" aria-hidden>
      <path d="M2 30 Q8 14 6 4 Q14 16 14 30 M12 30 Q16 10 24 2 Q22 16 22 30 M20 30 Q28 12 36 6 Q30 18 30 30 M28 30 Q38 16 48 12 Q40 22 40 30Z" fill="#4DBA74" />
      <path d="M8 30 Q18 18 16 8 Q22 20 20 30Z M30 30 Q34 18 42 16 Q36 24 36 30Z" fill="#2E9A5B" />
    </svg>
  );
}

export function HiddenLali({
  story,
  page,
  live,
  found,
  hints,
  onFind,
  lang,
}: {
  story: Story;
  page: number;
  live: boolean;
  found: boolean;
  hints: boolean;
  onFind: (page: number) => void;
  lang: Lang;
}) {
  const spot = hidingSpot(story, page);
  const { hidden, found: out, flip } = poses(spot.peek);
  const [hint, setHint] = useState(false);
  const [burst, setBurst] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // A gentle hint: after a while on the page without finding her, she wiggles a little.
  useEffect(() => {
    if (!live || found || !hints) return;
    const id = setTimeout(() => setHint(true), HINT_MS);
    return () => {
      clearTimeout(id);
      setHint(false);
    };
  }, [live, found, hints]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const tap = () => {
    if (!live) return;
    playTapSound("giggle");
    if (found) {
      setBurst((b) => b + 1);
      return;
    }
    // A giggle, then a happy buzz loop while she zooms out of hiding.
    for (const ms of [260, 560, 860]) timers.current.push(setTimeout(() => playTapSound("buzz"), ms));
    setBurst((b) => b + 1);
    onFind(page);
  };

  const o = OUT[spot.peek];
  const box: CSSProperties = {
    left: `${spot.x * 100}%`,
    top: `${spot.y * 100}%`,
    width: "clamp(26px, 7.5%, 54px)",
  };
  return (
    <button
      type="button"
      tabIndex={live ? 0 : -1}
      aria-label={found ? dict[lang].findLali.foundHer : dict[lang].findLali.hiding}
      data-find-lali={found ? "found" : "hidden"}
      data-hint={hint ? "" : undefined}
      onClick={tap}
      className={`absolute z-[6] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full outline-none after:absolute after:-inset-[45%] after:content-[''] focus-visible:ring-4 focus-visible:ring-gold ${live ? "cursor-pointer" : "pointer-events-none"}`}
      style={box}
    >
      <span className={`absolute inset-0 ${flip ? "-scale-x-100" : ""}`}>
        <span
          className="find-move absolute inset-0"
          style={{ transform: found ? out : hidden, transition: "transform 0.7s cubic-bezier(.3,1.5,.5,1)" }}
        >
          <span
            className={`absolute inset-0 ${found ? "find-hover" : "find-peek"}`}
            style={{ "--px": o.px, "--py": o.py, "--pr": o.pr, animationDelay: `${-((page * 1.7) % 7)}s` } as CSSProperties}
          >
            <span key={burst} className={`absolute inset-0 ${hint && !found ? "find-hint" : ""} ${burst ? "find-pop" : ""}`}>
              <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_1px_1px_rgba(0,0,0,.35)]" aria-hidden>
                <BeeShape />
              </svg>
            </span>
          </span>
        </span>
      </span>
      {!found && <CoverArt cover={spot.cover} />}
      {burst > 0 && (
        <span key={`s${burst}`} className="pointer-events-none absolute inset-0" aria-hidden>
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="find-spark" style={{ "--a": `${i * 45}deg`, "--d": `${i % 2 ? 120 : 170}%` } as CSSProperties} />
          ))}
        </span>
      )}
    </button>
  );
}

/** "Found Lali 4 / 13", in the picture's top-left corner. */
export function FindCounter({ found, total, lang, bump }: { found: number; total: number; lang: Lang; bump: number }) {
  return (
    <div
      className={`pointer-events-none absolute left-2 top-2 z-[7] flex items-center gap-1 rounded-full bg-white/90 py-0.5 pl-1 pr-2.5 text-[13px] font-black text-ink shadow-[0_2px_0_rgba(27,42,78,.18)] sm:left-3 sm:top-3 sm:text-sm ${lang === "am" ? "font-ethiopic" : "font-display"}`}
      data-find-counter=""
      aria-live="polite"
    >
      <span key={bump} className={bump ? "find-bump inline-block" : "inline-block"}>
        <Bee size={22} />
      </span>
      <span className="tabular-nums">{dict[lang].findLali.counter(found, total)}</span>
    </div>
  );
}
