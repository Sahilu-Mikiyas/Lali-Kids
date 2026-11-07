"use client";

import type { Lang, Story } from "@/content/stories";
import { dict } from "@/i18n/dict";
import { BeeFlight, Pollen, Stars, vars } from "./scenery";
import { PageArt } from "./page-art";

/*
  Two of the reader's phase-4 pages:
  - the bookplate before page 1, "This book belongs to …", when the reader knows the child's name;
  - the choice buttons on a page with `choices`: big picture buttons, each showing a little of
    the page it leads to. There is never a wrong answer.
*/

/** The reader's position for the bookplate (it isn't a page of the story). */
export const PLATE = -1;

/** The bookplate's picture: the story's colour, a honeycomb frame, and Lali looping over an open book. */
export function BookplateArt({ story }: { story: Story }) {
  const hexes = Array.from({ length: 14 }, (_, i) => {
    const top = i < 7;
    const x = 30 + (i % 7) * 57;
    const y = top ? 22 : 278;
    return { x, y, k: i };
  });
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" aria-hidden data-bookplate-art="">
      <defs>
        <radialGradient id="lali-plate-glow" cx="0.5" cy="0.45" r="0.7">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={0.55} />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width={400} height={300} fill={story.color} />
      <rect width={400} height={300} fill="url(#lali-plate-glow)" />
      <Stars seed={9} n={18} top={40} bottom={250} color="#FFF6D8" />
      {hexes.map((h) => (
        <path
          key={h.k}
          d={`M${h.x} ${h.y - 16} l14 8 v16 l-14 8 l-14 -8 v-16Z`}
          fill="#FFD66B"
          stroke="#C98A1A"
          strokeWidth={2}
          opacity={0.85}
          className="lali-pop-in"
          style={vars({ "--delay": `${(0.15 + h.k * 0.05).toFixed(2)}s` })}
        />
      ))}
      {/* an open book */}
      <g transform="translate(200 196)">
        <ellipse cx={0} cy={44} rx={118} ry={10} fill="#000" opacity={0.15} />
        <path d="M0 -6 C-36 -24 -84 -24 -112 -12 V40 C-84 28 -36 28 0 44Z" fill="#FFFDF6" stroke="#E2D6B5" strokeWidth={2} />
        <path d="M0 -6 C36 -24 84 -24 112 -12 V40 C84 28 36 28 0 44Z" fill="#FFF8E8" stroke="#E2D6B5" strokeWidth={2} />
        <path d="M0 -6 V44" stroke="#D8C9A2" strokeWidth={2} />
        {[-1, 1].map((side) =>
          [0, 1, 2].map((r) => <path key={`${side}${r}`} d={`M${side * 22} ${4 + r * 10} C${side * 50} ${-2 + r * 10} ${side * 76} ${-2 + r * 10} ${side * 96} ${2 + r * 10}`} stroke="#E6DABA" strokeWidth={3} fill="none" strokeLinecap="round" />),
        )}
        {/* a heart on the left page, a star on the right */}
        <path d="M-58 -2 c-6 -8 -18 -2 -12 8 l12 10 l12 -10 c6 -10 -6 -16 -12 -8Z" fill="#FF6B8A" className="lali-pulse" />
        <path d="M58 -12 l4 9 l10 1 l-7 7 l2 10 l-9 -5 l-9 5 l2 -10 l-7 -7 l10 -1Z" fill="#FFC83D" stroke="#C98A0A" strokeWidth={1.2} />
      </g>
      <BeeFlight path="M200 70 C270 60 300 110 260 140 C220 170 150 150 140 110 C130 70 170 74 200 70Z" dur={6.5} s={1.6} rest={[262, 118]} trailColor="#FFF2A8" happy />
      <Pollen seed={4} n={8} color="#FFF6C0" top={60} bottom={240} />
    </svg>
  );
}

/** The bookplate's words: "This book belongs to" and the child's name, big. */
export function BookplateText({ name, lang }: { name: string; lang: Lang }) {
  const t = dict[lang].storyName;
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[0.5em] text-center" data-bookplate={name}>
      <div className="flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rotate-45 rounded-[3px] bg-gold" />
        ))}
      </div>
      <p className={`text-[0.85em] font-bold uppercase tracking-[0.14em] text-[#7A6A45] ${lang === "am" ? "font-ethiopic normal-case tracking-normal" : ""}`}>{t.belongsTo}</p>
      <p className="name-plate-in max-w-full break-words font-display text-[2.4em] font-black leading-tight text-coral" lang={lang}>
        {name}
      </p>
      <div className="h-[3px] w-24 rounded-full bg-[repeating-linear-gradient(90deg,#E9DDBF_0_8px,transparent_8px_12px)]" aria-hidden />
      <p className={`text-[0.9em] text-[#7A6A45] ${lang === "am" ? "font-ethiopic" : ""}`}>{t.happyReading}</p>
    </div>
  );
}

/** What the reader passes to a page with choices. */
export type ChoiceState = { picked: number | undefined; tried: ReadonlySet<string>; onChoose: (option: number) => void; ready: boolean };

/** The question on the words' side of a choice page: "Which way should Lali go?", pointing at the pictures. */
export function ChoicePrompt({ story, page, lang, picked }: { story: Story; page: number; lang: Lang; picked: number | undefined }) {
  const c = story.pages[page]?.choices;
  if (!c?.options.length) return null;
  const t = dict[lang].choices;
  return (
    <p className={`rounded-[0.8em] bg-[#FFF1C9] px-[0.7em] py-[0.4em] text-center text-[0.85em] font-black text-[#7A3E00] ${lang === "am" ? "font-ethiopic" : ""}`} data-choice-prompt={page}>
      {c.prompt[lang] || t.choose} <span className="font-bold text-[#A0661A]">{picked === undefined ? t.pick : ""}</span>
    </p>
  );
}

/**
 * "What should happen next?": one big button per option, on the page's picture, each with a
 * little window onto the page it leads to. `picked` shows the choice made; options not tried yet
 * get a "New!" badge once the child has read the story another way.
 */
export function ChoiceButtons({ story, page, lang, live, choice }: { story: Story; page: number; lang: Lang; live: boolean; choice: ChoiceState }) {
  const c = story.pages[page]?.choices;
  if (!c?.options.length) return null;
  const t = dict[lang].choices;
  const { picked, tried, onChoose, ready } = choice;
  const anyTried = c.options.some((_, i) => tried.has(`${page}:${i}`));
  return (
    <div className={`grid grid-cols-2 gap-[0.5em] ${lang === "am" ? "font-ethiopic" : ""}`} data-choices={page} role="group" aria-label={c.prompt[lang] || t.choose}>
      {c.options.map((o, i) => {
        const on = picked === i;
        const fresh = anyTried && !tried.has(`${page}:${i}`);
        return (
          <button
            key={i}
            type="button"
            tabIndex={live ? 0 : -1}
            data-choice={i}
            data-picked={on ? "" : undefined}
            aria-pressed={on}
            onClick={() => live && onChoose(i)}
            className={`choice-card group relative flex flex-col overflow-hidden rounded-[0.8em] border-[3px] border-white bg-white text-left shadow-[0_4px_0_rgba(0,0,0,.25)] transition duration-200 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none ${
              on ? "!border-gold ring-4 ring-gold/60" : ""
            } ${ready && picked === undefined ? "choice-glow" : ""}`}
            style={vars({ "--delay": `${i * 0.35}s` })}
          >
            <span className="pointer-events-none relative block aspect-[2/1] w-full overflow-hidden" style={{ background: story.color }} aria-hidden>
              <PageArt story={story} page={o.goTo} />
            </span>
            <span className="flex min-h-[2em] items-center justify-center px-[0.4em] py-[0.2em] text-center text-[0.78em] font-black leading-tight text-ink">{o.label[lang]}</span>
            {on && (
              <span className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-gold text-sm font-black text-ink shadow" aria-hidden>
                ✓
              </span>
            )}
            {fresh && !on && <span className="absolute left-1.5 top-1.5 rounded-full bg-coral px-2 py-0.5 text-[0.62em] font-black text-white shadow">{t.newWay}</span>}
          </button>
        );
      })}
    </div>
  );
}
