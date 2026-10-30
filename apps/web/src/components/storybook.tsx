"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import type { Lang, Story } from "@/content/stories";
import { confetti } from "@/lib/confetti";
import { finishStory, useStars } from "@/lib/progress";
import { useMedia } from "@/lib/use-media";
import { useReadAlong } from "@/lib/use-read-along";
import { Bee, STAR_PATH } from "./characters";
import { Scene } from "./scenes";

const FLIP_MS = 0.9;

function textFont(lang: Lang) {
  return lang === "am" ? "font-ethiopic" : "font-body";
}

/* ---------- page faces ---------- */

function ArtFace({ story, page }: { story: Story; page: number }) {
  const end = page >= story.pages.length;
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: story.color }}>
      {end ? <EndArt /> : <Scene kind={story.scene} page={page} />}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/25 to-transparent" />
    </div>
  );
}

function EndArt() {
  return (
    <div className="relative grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_40%,#3B3F94,#141B45_70%)]">
      <svg viewBox="0 0 24 24" className="w-2/5 animate-float drop-shadow-[0_0_30px_rgba(255,213,74,.7)]" aria-hidden>
        <path d={STAR_PATH} fill="#FFD54A" />
      </svg>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float [animation-delay:-1.5s]">
        <Bee size={64} />
      </div>
    </div>
  );
}

function PaperFace({ children, side = "right" }: { children: ReactNode; side?: "left" | "right" }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-paper text-paper-ink ${
        side === "right" ? "shadow-[inset_22px_0_30px_-22px_rgba(0,0,0,.35)]" : "shadow-[inset_-22px_0_30px_-22px_rgba(0,0,0,.35)]"
      }`}
    >
      <div className="flex h-full flex-col gap-4 p-6 sm:p-9">{children}</div>
    </div>
  );
}

/** Static text for a page in motion (no read-along while it turns). */
function StaticText({ story, page, lang }: { story: Story; page: number; lang: Lang }) {
  if (page >= story.pages.length) return <EndText story={story} lang={lang} interactive={false} onAgain={() => {}} />;
  return (
    <PaperFace>
      <PageHeader story={story} page={page} lang={lang} />
      <p className={`${textFont(lang)} text-[clamp(1.35rem,2.3vw,2rem)] leading-[1.55]`}>{story.pages[page][lang]}</p>
    </PaperFace>
  );
}

function PageHeader({ story, page, lang }: { story: Story; page: number; lang: Lang }) {
  return (
    <div className="flex items-center justify-between text-sm font-bold text-[#7A6A45]">
      <span className={lang === "am" ? "font-ethiopic" : "font-display"}>{story.title[lang]}</span>
      <span className="tabular-nums">
        {page + 1} / {story.pages.length}
      </span>
    </div>
  );
}

function LiveText({ story, page, lang, onRead }: { story: Story; page: number; lang: Lang; onRead: () => void }) {
  const text = story.pages[page][lang];
  const { words, active, reading, silent, start, stop, speakWord } = useReadAlong(text, lang, onRead);
  const [popped, setPopped] = useState(-1);
  return (
    <PaperFace>
      <PageHeader story={story} page={page} lang={lang} />
      <p className={`${textFont(lang)} flex-1 text-[clamp(1.35rem,2.3vw,2rem)] leading-[1.55]`} aria-live="polite">
        {words.map((w, i) => (
          <span key={`${i}-${w}`}>
            <button
              type="button"
              onClick={() => {
                setPopped(i);
                speakWord(w);
              }}
              className={`inline-block rounded-lg px-[3px] transition-all duration-200 hover:bg-[#F3E8C6] ${
                i === active ? "-translate-y-[3px] scale-105 bg-gold text-[#2A1A00]" : i < active ? "text-blue" : ""
              } ${i === popped ? "animate-[pop_.45s_cubic-bezier(.3,2,.5,1)]" : ""}`}
              onAnimationEnd={() => setPopped(-1)}
            >
              {w}
            </button>{" "}
          </span>
        ))}
      </p>
      {silent && reading && lang === "am" && (
        <p className="text-center text-sm text-[#7A6A45]">Words light up for now. Recorded Amharic narration is coming.</p>
      )}
      <div className="flex justify-center">
        <button type="button" className="btn btn-primary" onClick={reading ? stop : start}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            {reading ? <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" /> : <path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" fill="currentColor" />}
          </svg>
          {reading ? (lang === "am" ? "አቁም" : "Stop") : lang === "am" ? "አንብብልኝ" : "Read to me"}
        </button>
      </div>
    </PaperFace>
  );
}

function EndText({ story, lang, interactive, onAgain }: { story: Story; lang: Lang; interactive: boolean; onAgain: () => void }) {
  const stars = useStars();
  return (
    <PaperFace>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <p className="font-display text-5xl font-black text-coral">{lang === "am" ? "ተፈጸመ!" : "The End!"}</p>
        <p className="max-w-xs text-lg">
          You finished <b>{story.title.en}</b> and earned a star.
          {interactive && stars > 0 && <> You have <b className="tabular-nums">{stars}</b> now!</>}
        </p>
        {interactive && (
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" className="btn btn-plain" onClick={onAgain}>
              Read again
            </button>
            <Link href="/stories" className="btn btn-primary">
              More stories
            </Link>
          </div>
        )}
      </div>
    </PaperFace>
  );
}

/* ---------- controls ---------- */

function Arrow({ dir, onClick, disabled, label, pulse }: { dir: "left" | "right"; onClick: () => void; disabled?: boolean; label: string; pulse?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_5px_0_var(--color-line)] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none disabled:opacity-30 ${
        pulse ? "animate-[nudge_1.2s_ease-in-out_infinite] bg-gold" : ""
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} stroke="currentColor" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex rounded-full bg-white p-1 shadow-[0_3px_0_var(--color-line)]" role="group" aria-label="Story language">
      {(["en", "am"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`rounded-full px-4 py-1.5 font-bold transition ${lang === l ? "bg-ink text-white" : "text-muted hover:text-ink"} ${l === "am" ? "font-ethiopic" : ""}`}
        >
          {l === "en" ? "English" : "አማርኛ"}
        </button>
      ))}
    </div>
  );
}

/* ---------- the book ---------- */

type Flip = { from: number; to: number } | null;

/**
 * A story as a real book. On wide screens it opens as a two-page spread with
 * 3D page turns; on phones it is a single page you swipe.
 */
export function StoryBook({
  story,
  compact = false,
  onFinish,
}: {
  story: Story;
  compact?: boolean;
  /** Called once when the child reaches The End; the site records it for the signed-in child. */
  onFinish?: (storyId: string) => void;
}) {
  const total = story.pages.length; // index `total` is The End
  const [page, setPage] = useState(0);
  const [lang, setLang] = useState<Lang>("en");
  const [flip, setFlip] = useState<Flip>(null);
  const [pageRead, setPageRead] = useState(false);
  const spread = useMedia("(min-width: 768px)");
  const rotate = useMotionValue(0);
  const shade = useTransform(rotate, [-180, -90, 0, 90, 180], [0, 0.35, 0, 0.35, 0]);
  const awarded = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (to: number) => {
      if (flip || to < 0 || to > total || to === page) return;
      setPageRead(false);
      if (!spread) {
        setPage(to);
        return;
      }
      setFlip({ from: page, to });
      const forward = to > page;
      rotate.set(0);
      animate(rotate, forward ? -180 : 180, { duration: FLIP_MS, ease: [0.6, 0.05, 0.3, 1] }).then(() => {
        setPage(to);
        setFlip(null);
        rotate.set(0);
      });
    },
    [flip, page, rotate, spread, total],
  );

  useEffect(() => {
    if (page === total && !awarded.current) {
      awarded.current = true;
      finishStory(story.id);
      onFinish?.(story.id);
      confetti(0.4);
    }
    if (page < total) awarded.current = false;
  }, [page, story.id, total, onFinish]);

  // Arrow keys turn pages when the book is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const r = rootRef.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > innerHeight) return;
      if ((e.target as HTMLElement)?.closest("input,textarea")) return;
      if (e.key === "ArrowRight") go(page + 1);
      if (e.key === "ArrowLeft") go(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, page]);

  const forward = flip ? flip.to > flip.from : true;
  // What lies underneath the turning leaf.
  const leftUnder = flip ? (forward ? flip.from : flip.to) : page;
  const rightUnder = flip ? (forward ? flip.to : flip.from) : page;

  const rightPage = (idx: number, live: boolean) =>
    idx >= total ? (
      <EndText story={story} lang={lang} interactive={live} onAgain={() => go(0)} />
    ) : live ? (
      <LiveText key={`${idx}-${lang}`} story={story} page={idx} lang={lang} onRead={() => setPageRead(true)} />
    ) : (
      <StaticText story={story} page={idx} lang={lang} />
    );

  return (
    <div ref={rootRef} className="w-full">
      {spread ? (
        <div className="relative mx-auto w-full [perspective:2400px]" style={{ maxWidth: compact ? 980 : 1120 }}>
          {/* hard cover behind the pages */}
          <div className="absolute -inset-3 -bottom-4 rounded-[22px] shadow-[0_12px_0_rgba(0,0,0,.18),0_40px_60px_-20px_rgba(27,42,78,.45)]" style={{ background: story.color }} />
          <div className="relative grid aspect-[2/1.18] grid-cols-2 overflow-visible rounded-[14px]">
            <div className="overflow-hidden rounded-l-[14px]">
              <ArtFace story={story} page={leftUnder} />
            </div>
            <div className="overflow-hidden rounded-r-[14px]">{rightPage(rightUnder, !flip)}</div>

            {/* spine */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent" />

            {flip && (
              <motion.div
                className="absolute inset-y-0 w-1/2 [transform-style:preserve-3d]"
                style={{
                  left: forward ? "50%" : 0,
                  transformOrigin: forward ? "left center" : "right center",
                  rotateY: rotate,
                }}
              >
                {/* face showing before the turn */}
                <div className={`absolute inset-0 overflow-hidden [backface-visibility:hidden] ${forward ? "rounded-r-[14px]" : "rounded-l-[14px]"}`}>
                  {forward ? <StaticText story={story} page={flip.from} lang={lang} /> : <ArtFace story={story} page={flip.from} />}
                  <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
                </div>
                {/* face showing after the turn */}
                <div
                  className={`absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] ${forward ? "rounded-l-[14px]" : "rounded-r-[14px]"}`}
                >
                  {forward ? <ArtFace story={story} page={flip.to} /> : <StaticText story={story} page={flip.to} lang={lang} />}
                  <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative mx-auto max-w-lg overflow-hidden rounded-[26px] shadow-[0_8px_0_rgba(0,0,0,.12)] [perspective:1400px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`${page}-${lang}`}
              initial={{ rotateY: 70, opacity: 0, x: 60 }}
              animate={{ rotateY: 0, opacity: 1, x: 0 }}
              exit={{ rotateY: -70, opacity: 0, x: -60 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) go(page + 1);
                if (info.offset.x > 70) go(page - 1);
              }}
              style={{ transformOrigin: "left center" }}
              className="touch-pan-y"
            >
              <div className="aspect-[4/3]">
                <ArtFace story={story} page={page} />
              </div>
              <div className="min-h-[17rem]">{rightPage(page, true)}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-4">
        <Arrow dir="left" label="Previous page" onClick={() => go(page - 1)} disabled={page === 0} />
        <div className="flex items-center gap-2" aria-hidden>
          {Array.from({ length: total + 1 }, (_, i) => (
            <span
              key={i}
              className={`h-3 rounded-full transition-all duration-300 ${i === page ? "w-8 bg-coral" : "w-3 bg-[#D9D2BC]"} ${i === total ? "rotate-45 rounded-[3px]" : ""}`}
            />
          ))}
        </div>
        <Arrow
          dir="right"
          label={page === total - 1 ? "Finish the story" : "Next page"}
          onClick={() => go(page + 1)}
          disabled={page === total}
          pulse={pageRead && page < total}
        />
        <LangToggle lang={lang} setLang={setLang} />
      </div>
    </div>
  );
}
