"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls, type MotionValue } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";

import type { Lang, Story } from "@/content/stories";
import { setAmbience } from "@/lib/ambient";
import { rememberBookLang, useBookLang } from "@/lib/book-lang";
import { confetti } from "@/lib/confetti";
import { backClip, backTransform, computeCurl, constrain, cornerPath, points, polygon, type Pt } from "@/lib/page-curl";
import { playPageTurn, setPageSoundMuted, usePageSoundMuted } from "@/lib/page-sound";
import { finishStory, useStars } from "@/lib/progress";
import { playTapSound } from "@/lib/tap-sound";
import { askForTilt, useDepth } from "@/lib/use-depth";
import { useMedia } from "@/lib/use-media";
import { useReadAlong } from "@/lib/use-read-along";
import { useNarration, type Clip } from "@/lib/narration/client";
import { timesFit } from "@/lib/narration/shared";
import { useMicListen, useReaderInfo } from "@/lib/read-aloud/client";
import { readThreshold } from "@/lib/read-aloud/match";
import { useMicReader } from "@/lib/read-aloud/use-mic-reader";
import { useLang } from "@/i18n/provider";
import { dict } from "@/i18n/dict";
import { tellApp } from "@/lib/in-app";
import { earnedStickers, goldenStickerId, MILESTONES, storyStickerId } from "@/lib/stickers/catalog";
import { currentBasis, recordFind, recordFinish, recordRead, syncStickers, useFindHints } from "@/lib/stickers/store";
import { useFamilyVoices } from "@/lib/voices/client";
import type { FamilyVoice } from "@/lib/voices/shared";
import { BeeShape, STAR_PATH } from "./characters";
import { FindCounter, HiddenLali } from "./find-lali";
import { StickerBookButton, StickerReward, type RewardSticker } from "./stickers/sticker-reward";
import { ambienceFor } from "./book/ambience";
import { Arrow, Icon, LangToggle, PageDots, RoundButton } from "./book/controls";
import { MicButton, MicPanel } from "./book/mic-reader";
import { CoverBack, CoverFront } from "./book/cover";
import { EndArt, PageArt } from "./book/page-art";
import { READER } from "./book/reader-words";
import { TapZone } from "./book/tappable";

export { PageArt };

// The grown-ups' recorder only opens on request, so its code loads then (not with every story).
const RecordVoiceModal = dynamic(() => import("./voice/record-voice").then((m) => m.RecordVoiceModal), { ssr: false });

/** Page shape on a two-page spread (width / height). */
const PAGE_ASPECT = 1.18;
const TURN_MS = 820;
const LANGS: Lang[] = ["en", "am"];
/** Sparkles kept ready for the page turn (reused round-robin). */
const SPARKS = 18;

function textFont(lang: Lang) {
  return lang === "am" ? "font-ethiopic" : "font-body";
}

/**
 * Both languages stacked in the same spot: the chosen one shows, and switching cross-fades
 * in place. The box is as big as the longer of the two, so nothing around it moves.
 */
function Swap({ lang, block = false, className = "", layerClass = "", children }: { lang: Lang; block?: boolean; className?: string; layerClass?: string; children: (l: Lang) => ReactNode }) {
  const Box = block ? "div" : "span";
  return (
    <Box className={`${block ? "grid" : "inline-grid"} ${className}`}>
      {LANGS.map((l) => (
        <Box
          key={l}
          aria-hidden={l !== lang || undefined}
          className={`lali-lang-layer [grid-area:1/1] ${l === "am" ? "font-ethiopic" : ""} ${l === lang ? "" : "pointer-events-none -translate-y-[0.15em] opacity-0"} ${layerClass}`}
        >
          {children(l)}
        </Box>
      ))}
    </Box>
  );
}

/* ---------- page faces ---------- */

/** Find Lali, as the reader runs it: which pages she was found on during this read. */
type Finder = { found: Set<number>; hints: boolean; onFind: (page: number) => void; bump: number; lang: Lang };

function ArtFace({ story, page, gutter = "right", tap = false, finder }: { story: Story; page: number; gutter?: "right" | "none"; tap?: boolean; finder?: Finder }) {
  const end = page >= story.pages.length;
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: story.color }} data-art-face={end ? "end" : page} data-live={tap ? "" : undefined}>
      <TapZone enabled={tap}>{end ? <EndArt /> : <PageArt story={story} page={page} />}</TapZone>
      {/* Lali hides in the picture; she's clipped by it, so she never covers the words. */}
      {finder && !end && (
        <HiddenLali story={story} page={page} live={tap} found={finder.found.has(page)} hints={finder.hints} onFind={finder.onFind} lang={finder.lang} />
      )}
      {finder && !end && tap && <FindCounter found={finder.found.size} total={story.pages.length} lang={finder.lang} bump={finder.bump} />}
      {gutter === "right" && <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/30 to-transparent" />}
    </div>
  );
}

function PageHeader({ story, page, lang }: { story: Story; page: number; lang: Lang }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[0.8em] font-bold text-[#7A6A45]">
      <Swap lang={lang} className="min-w-0" layerClass="truncate">
        {(l) => <span className={l === "am" ? "font-ethiopic" : "font-display"}>{story.title[l]}</span>}
      </Swap>
      <span className="shrink-0 tabular-nums">
        {page + 1} / {story.pages.length}
      </span>
    </div>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d={STAR_PATH} fill="#FFC83D" stroke="#C98A0A" strokeWidth={1.2} strokeLinejoin="round" />
    </svg>
  );
}

function MoreStoriesLink({ lang }: { lang: Lang }) {
  return (
    <Link
      href="/stories"
      className="btn btn-primary"
      onClick={(e) => {
        if (tellApp({ type: "lali:close" })) e.preventDefault();
      }}
    >
      <Swap lang={lang}>{(l) => READER[l].more}</Swap>
    </Link>
  );
}

function StickersLink({ lang }: { lang: Lang }) {
  return (
    <Link
      href="/stickers"
      className="btn btn-plain"
      data-end-stickers=""
      onClick={(e) => {
        if (tellApp({ type: "lali:stickers" })) e.preventDefault();
      }}
    >
      <Swap lang={lang}>{(l) => dict[l].stickers.myBook}</Swap>
    </Link>
  );
}

function EndText({
  lang,
  interactive,
  onAgain,
  starLanded,
  finds,
  readAloud,
}: {
  lang: Lang;
  interactive: boolean;
  onAgain: () => void;
  starLanded: boolean;
  /** How many pages Lali was found on this time. */
  finds?: { found: number; total: number };
  /** Pages the child read aloud this time (reader stars). */
  readAloud?: { read: number; total: number };
}) {
  const stars = useStars();
  // The new star is counted when the flying star lands.
  const shown = starLanded ? stars : Math.max(0, stars - 1);
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[0.55em] text-center">
      <p className="font-display text-[2.2em] font-black leading-none text-coral">
        <Swap lang={lang}>{(l) => READER[l].theEnd}</Swap>
      </p>
      {interactive && (
        <div
          data-star-counter=""
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 font-display text-[1.15em] font-black text-ink shadow-[0_3px_0_rgba(27,42,78,.15)]"
          aria-label={`${shown} stars`}
        >
          <StarIcon className="h-[1.3em] w-[1.3em]" />
          <span className="tabular-nums">{shown}</span>
        </div>
      )}
      <p className="max-w-xs text-[0.85em]">
        <Swap lang={lang}>
          {(l) => (
            <>
              {READER[l].finished}
              {interactive && stars > 0 && (
                // Room is kept for it, so nothing moves when the star lands.
                <span className={`transition-opacity duration-500 ${starLanded ? "" : "opacity-0"}`}> {READER[l].starsNow(stars)}</span>
              )}
            </>
          )}
        </Swap>
      </p>
      {interactive && finds && (
        <p className="flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-[0.8em] font-bold text-[#7A3E00]" data-end-finds="">
          <svg viewBox="0 0 40 40" className="h-[1.4em] w-[1.4em] shrink-0" aria-hidden>
            <BeeShape />
          </svg>
          <Swap lang={lang}>
            {(l) =>
              finds.found === 0
                ? dict[l].findLali.endingNone
                : finds.found >= finds.total
                  ? dict[l].findLali.endingAll(finds.total)
                  : dict[l].findLali.ending(finds.found, finds.total)
            }
          </Swap>
        </p>
      )}
      {interactive && readAloud && readAloud.read > 0 && (
        <p className="flex items-center gap-1.5 rounded-full bg-[#DDF5D9] px-3 py-1 text-[0.8em] font-bold text-[#13723F]" data-end-read-aloud={readAloud.read}>
          <span aria-hidden className="tracking-[-0.2em]">
            {"⭐".repeat(Math.min(5, readAloud.read))}
          </span>
          <Swap lang={lang}>{(l) => (readAloud.read >= readAloud.total ? dict[l].mic.readAll : dict[l].mic.readPages(readAloud.read))}</Swap>
        </p>
      )}
      {interactive && (
        <div className="flex flex-wrap justify-center gap-3 text-base">
          <button type="button" className="btn btn-plain" onClick={onAgain}>
            <Swap lang={lang}>{(l) => READER[l].readAgain}</Swap>
          </button>
          <StickersLink lang={lang} />
          <MoreStoriesLink lang={lang} />
        </div>
      )}
    </div>
  );
}

type WordMode = "hidden" | "arrive" | "swap";

/** The words of a page. When live, the read-along works: tap a word, or "Read to me". */
function TextFace({
  story,
  page,
  lang,
  live,
  onRead,
  onAgain,
  fontSize,
  shadow = "left",
  reduce,
  starLanded = false,
  finds,
  voice,
  voiceCount = 0,
  onNextVoice,
  clip = null,
  micListen = false,
  micThreshold = 0.7,
  onReadAloud,
  readAloud,
}: {
  story: Story;
  page: number;
  lang: Lang;
  live: boolean;
  onRead: () => void;
  onAgain: () => void;
  fontSize: number;
  shadow?: "left" | "none";
  reduce: boolean;
  starLanded?: boolean;
  finds?: { found: number; total: number };
  /** A family member's recording of this story, read with "Read by Grandma ♥". */
  voice?: FamilyVoice | null;
  voiceCount?: number;
  onNextVoice?: () => void;
  /** Voice-actor narration of this page in this language, if any: "Read to me" plays it. */
  clip?: Clip | null;
  /** A grown-up let the browser's speech service listen to the child read. */
  micListen?: boolean;
  micThreshold?: number;
  onReadAloud?: (page: number, how: "listened" | "recorded") => void;
  readAloud?: { read: number; total: number };
}) {
  const end = page >= story.pages.length;
  const text = end ? "" : story.pages[page][lang];
  // Narration first (exactly on its word times when they fit this text), else the browser's voice.
  const own = useReadAlong(text, lang, onRead, end ? null : (clip?.url ?? null), {
    wordTimes: clip && timesFit(clip.wordTimes, text) ? clip.wordTimes : null,
    durationMs: clip?.durationMs ?? null,
  });
  const mic = useMicReader({
    text,
    lang,
    live: live && !end,
    wantListen: micListen,
    threshold: micThreshold,
    onRead: (how) => onReadAloud?.(page, how),
  });
  // A family recording of this page plays instead of the browser's voice when there is one.
  const familyUrl = end ? null : (voice?.pages[lang]?.[page] ?? null);
  const family = useReadAlong(text, lang, onRead, familyUrl);
  const [usedFamily, setUsedFamily] = useState(true);
  const ra = family.reading || (!own.reading && usedFamily && familyUrl) ? family : own;
  const { words, active, silent, speakWord } = { ...own, active: ra.active, silent: ra.silent };
  const reading = own.reading || family.reading;
  const ownStop = own.stop;
  const familyStop = family.stop;
  const stop = useCallback(() => {
    ownStop();
    familyStop();
  }, [ownStop, familyStop]);
  const readOwn = () => {
    familyStop();
    setUsedFamily(false);
    own.start();
  };
  const readFamily = () => {
    ownStop();
    setUsedFamily(true);
    family.start();
  };
  const [popped, setPopped] = useState(-1);
  // The words arrive the first time this page lies open...
  const [opened, setOpened] = useState(live);
  if (live && !opened) setOpened(true);
  // ...and each switch of language brings the other language's words in afresh.
  const [shownLang, setShownLang] = useState(lang);
  const [gen, setGen] = useState<Record<Lang, number>>({ en: 0, am: 0 });
  if (lang !== shownLang) {
    setShownLang(lang);
    if (opened) setGen((g) => ({ ...g, [lang]: g[lang] + 1 }));
  }
  useEffect(() => {
    if (!live) stop();
  }, [live, stop]);

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-paper text-paper-ink ${shadow === "left" ? "shadow-[inset_26px_0_30px_-24px_rgba(0,0,0,.4)]" : ""}`}
      style={{ fontSize }}
    >
      {/* soft paper grain */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,transparent_55%,rgba(180,150,90,.12))]" />
      <div className="relative flex h-full flex-col gap-[0.7em] overflow-y-auto p-[1.1em] sm:p-[1.3em]">
        {end ? (
          <EndText lang={lang} interactive={live} onAgain={onAgain} starLanded={starLanded} finds={finds} readAloud={readAloud} />
        ) : (
          <>
            <PageHeader story={story} page={page} lang={lang} />
            <div className="grid flex-1 content-start">
              {LANGS.map((l) => {
                const on = l === lang;
                if (!on) {
                  // The other language waits underneath as plain text (light to mount), spaced like
                  // the word buttons so it takes the same room: the page never changes height.
                  return (
                    <p
                      key={`${l}-${gen[l]}`}
                      aria-hidden
                      className={`lali-lang-layer pointer-events-none -translate-y-[0.2em] pl-[3px] leading-[1.55] opacity-0 [grid-area:1/1] [word-spacing:6px] ${textFont(l)}`}
                    >
                      {story.pages[page][l]}
                    </p>
                  );
                }
                const ws = words;
                const mode: WordMode = !opened && !reduce ? "hidden" : gen[l] > 0 ? "swap" : "arrive";
                return (
                  <p
                    key={`${l}-${gen[l]}`}
                    aria-live={live ? "polite" : undefined}
                    className={`lali-lang-layer [grid-area:1/1] leading-[1.55] ${textFont(l)}`}
                  >
                    {ws.map((w, i) => {
                      const anim: CSSProperties | undefined =
                        mode === "hidden"
                          ? { opacity: 0 }
                          : mode === "arrive"
                            ? { animationDelay: `${Math.round(120 + Math.min(i * 45, (1300 * i) / Math.max(1, ws.length)))}ms` }
                            : { animationDelay: `${Math.min(i * 16, 420)}ms` };
                      const cls = mode === "arrive" ? "lali-word-in" : mode === "swap" ? "lali-word-swap" : "";
                      const said = mic.heard.has(i) || (mic.playIndex >= 0 && i <= mic.playIndex);
                      const tryIt = mic.missed.indexOf(i);
                      return (
                        <span key={`${i}-${w}`}>
                          <span className={`inline-block ${cls}`} style={anim}>
                            <button
                              type="button"
                              tabIndex={live ? 0 : -1}
                              data-on={i === active ? "" : undefined}
                              data-heard={said ? "" : undefined}
                              data-try={tryIt === 0 ? dict[l].mic.tryThis : tryIt > 0 ? "" : undefined}
                              onClick={() => {
                                if (!live) return;
                                setPopped(i);
                                speakWord(w, i);
                              }}
                              className={`lali-word inline-block rounded-lg px-[3px] transition-[transform,color,background-color] duration-200 hover:bg-[#F3E8C6] ${
                                i === active ? "-translate-y-[0.18em] scale-110 text-[#7A3E00]" : i < active ? "text-blue" : ""
                              } ${said ? "mic-heard" : ""} ${i === mic.playIndex ? "-translate-y-[0.14em] scale-110" : ""} ${tryIt >= 0 ? "mic-try" : ""} ${
                                i === popped ? "animate-[pop_.45s_cubic-bezier(.3,2,.5,1)] text-coral" : ""
                              }`}
                              onAnimationEnd={() => setPopped(-1)}
                            >
                              {w}
                            </button>
                          </span>{" "}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
            </div>
            {mic.phase !== "idle" ? (
              <div className="pb-1">
                <MicPanel mic={mic} lang={lang} live={live} />
              </div>
            ) : (
            <div className="relative flex flex-wrap items-center justify-center gap-2 pb-1">
              {silent && reading && lang === "am" && (
                <p className="lali-fade absolute inset-x-0 bottom-full mb-2 text-center text-[0.65em] text-[#7A6A45] font-ethiopic">{READER.am.silent}</p>
              )}
              {familyUrl && voice && (
                // Family voices come first; "Read to me" stays right beside it.
                <span className="inline-flex items-center gap-1">
                  <button
                    type="button"
                    tabIndex={live ? 0 : -1}
                    data-read-family={voice.name}
                    className="btn !bg-berry !text-base !text-white ![--edge:#A12456] shadow-[0_6px_0_#A12456]"
                    onClick={family.reading ? stop : readFamily}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                      {family.reading ? (
                        <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
                      ) : (
                        <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 5.3 3 1.7-1.8 3.2-3 5.3-3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" fill="currentColor" />
                      )}
                    </svg>
                    <Swap lang={lang}>{(l) => (family.reading ? READER[l].stop : dict[l].voices.readBy(voice.name))}</Swap>
                  </button>
                  {voiceCount > 1 && onNextVoice && (
                    <button
                      type="button"
                      tabIndex={live ? 0 : -1}
                      aria-label="Another family voice"
                      onClick={() => {
                        stop();
                        onNextVoice();
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white text-berry shadow-[0_3px_0_rgba(27,42,78,.15)]"
                    >
                      ⇄
                    </button>
                  )}
                </span>
              )}
              <button
                type="button"
                tabIndex={live ? 0 : -1}
                className={`btn !text-base ${familyUrl ? "btn-plain" : "btn-primary"}`}
                onClick={own.reading ? stop : readOwn}
                data-read-own=""
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  {own.reading ? (
                    <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
                  ) : (
                    <path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" fill="currentColor" />
                  )}
                </svg>
                <Swap lang={lang}>{(l) => (own.reading ? READER[l].stop : READER[l].readToMe)}</Swap>
              </button>
              <MicButton
                lang={lang}
                live={live}
                onClick={() => {
                  stop();
                  void mic.begin();
                }}
              />
              {clip?.narrator && (
                <p className="w-full text-center text-[0.62em] font-bold text-[#7A6A45]" data-narrator={clip.narrator}>
                  {dict[lang].narration.credit(clip.narrator)}
                </p>
              )}
            </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/** After the celebration: a calm card for the parent, with things to talk about and try. */
function GrownUpsCard({ story, lang, onAgain, onClose }: { story: Story; lang: Lang; onAgain: () => void; onClose: () => void }) {
  const g = story.grownUps!;
  return (
    <div className="absolute inset-0 z-[60] grid place-items-center px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-[72px] sm:px-6 sm:pb-6">
      <div className="lali-fade absolute inset-0 bg-[#0B1030]/55" onClick={onClose} aria-hidden />
      <section
        role="dialog"
        aria-label={READER[lang].forGrownUps}
        data-grown-ups=""
        className="lali-card-in relative max-h-full w-full max-w-lg overflow-y-auto rounded-[28px] bg-[#FFFBF0] p-5 text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,.55)] sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={READER[lang].backToBook}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-muted transition hover:bg-black/5 hover:text-ink"
        >
          {Icon.close}
        </button>
        <Swap lang={lang} block>
          {(l) => (
            <div className={`pr-8 text-left ${l === "am" ? "font-ethiopic" : ""}`}>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-teal">{READER[l].forGrownUps}</p>
              <p className="mt-1 text-[0.95rem] text-muted">{READER[l].grownUpsNote}</p>
              <h3 className={`mt-4 text-lg font-black ${l === "am" ? "" : "font-display"}`}>{READER[l].talkAbout}</h3>
              <ol className="mt-2 space-y-2.5">
                {g.talkAbout[l].map((q, i) => (
                  <li key={i} className="flex gap-3 leading-snug">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sky-soft text-sm font-black text-blue">{i + 1}</span>
                    <span className="pt-0.5">{q}</span>
                  </li>
                ))}
              </ol>
              <h3 className={`mt-5 text-lg font-black ${l === "am" ? "" : "font-display"}`}>{READER[l].tryThis}</h3>
              <p className="mt-2 rounded-2xl bg-gold/15 p-3.5 leading-snug">{g.activity[l]}</p>
            </div>
          )}
        </Swap>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" className="btn btn-plain" onClick={onAgain}>
            <Swap lang={lang}>{(l) => READER[l].readAgain}</Swap>
          </button>
          <MoreStoriesLink lang={lang} />
        </div>
      </section>
    </div>
  );
}

/* ---------- sizing ---------- */

function useSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const r = e.contentRect;
      setSize((s) => (Math.abs(s.w - r.width) < 1 && Math.abs(s.h - r.height) < 1 ? s : { w: r.width, h: r.height }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

const subscribeFullscreen = (cb: () => void) => {
  document.addEventListener("fullscreenchange", cb);
  return () => document.removeEventListener("fullscreenchange", cb);
};

/* ---------- the book ---------- */

/** A page turn in progress: the leaf `leaf` is turning over (0 = flat on the right, 1 = landed on the left). */
type Turn = { leaf: number; cornerY: number; from: number };

type Drag = {
  id: number;
  x0: number;
  y0: number;
  started: boolean;
  forward: boolean;
  lastX: number;
  lastT: number;
  vx: number;
};

/**
 * A story as a real book. On wide screens it opens as a two-page spread; on phones it is
 * one page at a time. Pages curl over as they turn: drag a corner (or swipe), press the
 * arrows, or use the arrow keys. Without `compact` it takes over the whole screen and
 * starts with the cover opening.
 *
 * Inside: a soundscape for each scene, pictures with depth that follow the mouse or the
 * phone's tilt, characters that react to taps, words that arrive and light up, and a
 * celebration at the end followed by a card for grown-ups.
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
  const immersive = !compact;
  const router = useRouter();
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const muted = usePageSoundMuted();
  const [page, setPage] = useState(0);
  // Books open in the language this child last chose here, else the website's language.
  const siteLang = useLang();
  const storedLang = useBookLang();
  const [chosenLang, setChosenLang] = useState<Lang | null>(null);
  const lang: Lang = chosenLang ?? storedLang ?? siteLang;
  const setLang = useCallback((l: Lang) => {
    setChosenLang(l);
    rememberBookLang(l);
  }, []);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [pageRead, setPageRead] = useState(false);
  const [cover, setCover] = useState<"closed" | "opening" | "open">(immersive ? "closed" : "open");
  const [starLanded, setStarLanded] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  /* ----- Find Lali, stickers and family voices ----- */
  const hints = useFindHints();
  const [found, setFound] = useState<Set<number>>(() => new Set());
  const [foundBump, setFoundBump] = useState(0);
  const [reward, setReward] = useState<RewardSticker[] | null>(null);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voices, reloadVoices] = useFamilyVoices(story.id);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const voice = voices.voices.length ? voices.voices[voiceIndex % voices.voices.length] : null;
  // Voice-actor narration, the grown-up's microphone choice, and pages read aloud this time.
  const clipFor = useNarration(story);
  const micListen = useMicListen();
  const readerInfo = useReaderInfo();
  const micThreshold = readThreshold(readerInfo?.ageBand ?? (story.ageBands[0] === "3-5" ? "3-5" : null));
  const [readAloud, setReadAloud] = useState<Set<number>>(() => new Set());
  const onReadAloud = useCallback(
    (p: number, how: "listened" | "recorded") => {
      setReadAloud((r) => (r.has(p) ? r : new Set(r).add(p)));
      recordRead(story.id, p, lang, how);
      playTapSound("chime");
      confetti(0.5);
    },
    [story.id, lang],
  );
  // Stickers earned before this read, so the ending knows which ones are new.
  const earnedBefore = useRef<Set<string> | null>(null);
  const pageCount = useCallback((id: string) => (id === story.id ? total : undefined), [story.id, total]);
  useEffect(() => {
    let alive = true;
    syncStickers().then(() => {
      if (alive && !earnedBefore.current) earnedBefore.current = earnedStickers(currentBasis(), pageCount);
    });
    return () => {
      alive = false;
    };
  }, [pageCount]);
  const onFind = useCallback(
    (p: number) => {
      setFound((f) => (f.has(p) ? f : new Set(f).add(p)));
      setFoundBump((b) => b + 1);
      recordFind(story.id, p);
    },
    [story.id],
  );
  const finder: Finder = { found, hints, onFind, bump: foundBump, lang };
  const wide = useMedia("(min-width: 768px)");
  const fullscreen = useSyncExternalStore(subscribeFullscreen, () => Boolean(document.fullscreenElement), () => false);
  const canFullscreen = useSyncExternalStore(subscribeFullscreen, () => Boolean(document.fullscreenEnabled), () => false);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const sparkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sparkAt = useRef({ i: 0, t: 0 });
  const size = useSize(stageRef);

  // Page size in pixels.
  const spread = wide;
  let W = 0;
  let H = 0;
  if (size.w > 0) {
    if (spread) {
      const room = immersive ? size.w - (size.w > 1000 ? 200 : 150) : size.w - 24;
      W = Math.max(150, Math.min(room / 2, (immersive ? size.h - 16 : 9999) * PAGE_ASPECT, 640));
      H = W / PAGE_ASPECT;
    } else {
      W = Math.max(220, Math.min(size.w - (immersive ? 24 : 0), immersive ? size.h * 0.74 : 9999, 560));
      H = immersive ? Math.min(size.h - 8, W * 2) : W * 1.62;
    }
  }
  const artH = spread ? H : Math.min(W * 0.86, H * 0.52);
  const fontSize = spread ? Math.max(15, Math.min(30, W * 0.047)) : Math.max(16, Math.min(22, W * 0.058));

  /* ----- the curl, applied straight to the DOM every frame ----- */
  const dims = useRef({ W: 0, H: 0, spread: true });
  useLayoutEffect(() => {
    dims.current = { W, H, spread };
  }, [W, H, spread]);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const underRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<SVGPolygonElement>(null);
  const shadeRef = useRef<SVGPolygonElement>(null);
  const shadowGrad = useRef<SVGLinearGradientElement>(null);
  const shadeGrad = useRef<SVGLinearGradientElement>(null);
  const pRef = useRef<Pt>({ x: 0, y: 0 });
  const turnRef = useRef<Turn | null>(null);
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const pending = useRef<{ target: 0 | 1; strength: number } | null>(null);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);

  /** A few sparkles fly off the fold of the turning page (transforms and opacity only). */
  const sparkle = useCallback((c: ReturnType<typeof computeCurl>) => {
    const now = performance.now();
    if (now - sparkAt.current.t < 55 || c.t < 0.04 || c.t > 0.96 || c.lifted.length < 3) return;
    sparkAt.current.t = now;
    const edge = c.lifted.filter((v) => Math.abs((v.x - c.M.x) * c.n.x + (v.y - c.M.y) * c.n.y) < 1);
    if (edge.length < 2) return;
    const a = edge[0];
    const b = edge[edge.length - 1];
    const k = Math.random();
    const ox = dims.current.spread ? dims.current.W : 0;
    const x = a.x + (b.x - a.x) * k + ox;
    const y = a.y + (b.y - a.y) * k;
    const el = sparkRefs.current[sparkAt.current.i++ % SPARKS];
    if (!el) return;
    const dist = 26 + Math.random() * 44;
    const dx = -c.n.x * dist + (Math.random() - 0.5) * 18;
    const dy = -c.n.y * dist - 12 - Math.random() * 22;
    const s = 0.6 + Math.random() * 0.9;
    el.animate(
      [
        { transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(s * 0.4).toFixed(2)}) rotate(0deg)`, opacity: 0 },
        { transform: `translate(${(x + dx * 0.3).toFixed(1)}px, ${(y + dy * 0.3).toFixed(1)}px) scale(${s.toFixed(2)}) rotate(45deg)`, opacity: 1, offset: 0.25 },
        { transform: `translate(${(x + dx).toFixed(1)}px, ${(y + dy).toFixed(1)}px) scale(${(s * 0.3).toFixed(2)}) rotate(120deg)`, opacity: 0 },
      ],
      { duration: 700 + Math.random() * 350, easing: "cubic-bezier(.2,.6,.3,1)" },
    );
  }, []);

  /** A soft band of light sweeps over newly arrived pages. */
  const sweep = useCallback(() => {
    sweepRef.current?.animate(
      [
        { transform: "translateX(-120%) skewX(-14deg)", opacity: 0 },
        { transform: "translateX(40%) skewX(-14deg)", opacity: 1, offset: 0.3 },
        { transform: "translateX(290%) skewX(-14deg)", opacity: 0 },
      ],
      { duration: 1000, easing: "cubic-bezier(.3,.1,.3,1)" },
    );
  }, []);

  const applyCurl = useCallback(
    (P: Pt) => {
      const t = turnRef.current;
      const { W: w, H: h } = dims.current;
      if (!t || !w) return;
      pRef.current = P;
      const c = computeCurl(constrain(P, w, h, t.cornerY), w, h, t.cornerY);
      const front = frontRef.current;
      const back = backRef.current;
      const under = underRef.current;
      if (front) front.style.clipPath = polygon(c.front);
      if (back) {
        back.style.visibility = c.lifted.length > 2 ? "visible" : "hidden";
        back.style.transform = backTransform(c, w);
        back.style.clipPath = backClip(c, w);
      }
      if (under) {
        under.style.opacity = String(0.5 + 0.5 * Math.min(1, c.t * 1.6));
        under.style.transform = `translateX(${((1 - c.t) * 18).toFixed(1)}px)`;
      }
      // Light and shade: a shadow on the page underneath, and a curved highlight on the flap.
      const fade = Math.min(1, (1 - c.t) * 5, c.depth / 30);
      const reach = Math.min(c.depth, w * 0.45) + 1;
      const toSvg = (p: Pt) => ({ x: p.x + w, y: p.y });
      const m = toSvg(c.M);
      if (shadowRef.current && shadowGrad.current) {
        shadowRef.current.setAttribute("points", points(c.lifted, w));
        shadowRef.current.style.opacity = String(fade);
        const g = shadowGrad.current;
        g.setAttribute("x1", String(m.x));
        g.setAttribute("y1", String(m.y));
        g.setAttribute("x2", String(m.x + c.n.x * reach * 0.8));
        g.setAttribute("y2", String(m.y + c.n.y * reach * 0.8));
      }
      if (shadeRef.current && shadeGrad.current) {
        shadeRef.current.setAttribute("points", points(c.flap, w));
        shadeRef.current.style.opacity = String(fade);
        const g = shadeGrad.current;
        g.setAttribute("x1", String(m.x));
        g.setAttribute("y1", String(m.y));
        g.setAttribute("x2", String(m.x - c.n.x * reach));
        g.setAttribute("y2", String(m.y - c.n.y * reach));
      }
      sparkle(c);
    },
    [sparkle],
  );

  const clearCurl = useCallback(() => {
    for (const el of [frontRef.current, backRef.current, underRef.current]) {
      if (!el) continue;
      el.style.clipPath = "";
      el.style.transform = "";
      el.style.opacity = "";
      el.style.visibility = "";
    }
  }, []);

  const finishTurn = useCallback(
    (target: 0 | 1) => {
      const t = turnRef.current;
      if (!t) return;
      clearCurl();
      turnRef.current = null;
      anim.current = null;
      const landed = target === 1 ? t.leaf + 1 : t.leaf;
      setTurn(null);
      setPage(landed);
      // The page lands with a little bounce, and light sweeps over it.
      if (landed !== t.from) {
        bookRef.current?.animate(
          [
            { transform: "translateY(0)" },
            { transform: "translateY(3px) scale(0.997, 1.003)" },
            { transform: "translateY(-1px)" },
            { transform: "translateY(0)" },
          ],
          { duration: 420, easing: "ease-out" },
        );
        sweep();
      }
    },
    [clearCurl, sweep],
  );

  /** Move the corner from wherever it is to flat (0) or turned (1). */
  const runTo = useCallback(
    (target: 0 | 1) => {
      const t = turnRef.current;
      const { W: w, H: h } = dims.current;
      if (!t) return;
      const from = { ...pRef.current };
      const to = cornerPath(target, w, h, t.cornerY);
      const startU = Math.min(1, Math.max(0, (w - from.x) / (2 * w)));
      const distance = Math.abs(target - startU);
      anim.current?.stop();
      anim.current = animate(0, 1, {
        duration: Math.max(0.25, (TURN_MS / 1000) * distance),
        ease: [0.4, 0.05, 0.25, 1],
        onUpdate: (v) => {
          const u = startU + (target - startU) * v;
          const path = cornerPath(u, w, h, t.cornerY);
          // Blend from the finger's spot onto the natural arc of a turning page.
          const k = Math.min(1, v * 1.6);
          applyCurl({ x: from.x + (to.x - from.x) * v * (1 - k) + (path.x - from.x) * k, y: from.y + (path.y - from.y) * k });
        },
        onComplete: () => finishTurn(target),
      });
    },
    [applyCurl, finishTurn],
  );

  /** Start turning a leaf. `at` 0 starts it flat on the right, 1 starts it landed on the left. */
  const beginTurn = useCallback((leaf: number, cornerY: number, at: 0 | 1, then?: { target: 0 | 1; strength: number }) => {
    const { W: w, H: h } = dims.current;
    const tr = { leaf, cornerY, from: at === 0 ? leaf : leaf + 1 };
    turnRef.current = tr;
    pRef.current = cornerPath(at, w, h, cornerY);
    pending.current = then ?? null;
    setTurn(tr);
  }, []);

  // After the turning pages mount: place them, then start any pending animation.
  useLayoutEffect(() => {
    if (!turn) return;
    applyCurl(pRef.current);
    const p = pending.current;
    if (p) {
      pending.current = null;
      runTo(p.target);
    }
  }, [turn, applyCurl, runTo]);

  const busy = turn !== null || cover !== "open";

  /** Leaving the end page puts the celebration away. */
  const leave = useCallback(() => {
    setPageRead(false);
    setStarLanded(false);
    setCardOpen(false);
    setReward(null);
  }, []);

  const go = useCallback(
    (to: number) => {
      if (busy || to < 0 || to > total || to === page || !W) return;
      leave();
      if (reduce || Math.abs(to - page) !== 1) {
        setPage(to);
        return;
      }
      playPageTurn(0.9);
      if (to > page) beginTurn(page, H, 0, { target: 1, strength: 1 });
      else beginTurn(to, H, 1, { target: 0, strength: 1 });
    },
    [busy, total, page, W, H, reduce, beginTurn, leave],
  );

  /* ----- the cover: it swings open in 3D while the book slides to the middle ----- */
  const rot = useMotionValue(immersive ? 0 : -180);
  const coverFade = useMotionValue(1);
  const shift = useMotionValue(0);
  const leftShown = useTransform(rot, [-172, -180], [0, 1]);
  useLayoutEffect(() => {
    if (cover === "closed") shift.set(spread ? -W / 2 : 0);
  }, [cover, spread, W, shift]);
  useEffect(() => {
    if (cover !== "opening") return;
    let alive = true;
    const ease = [0.55, 0.05, 0.25, 1] as const;
    const a = animate(rot, -180, { duration: 1.5, ease });
    const b = animate(shift, 0, { duration: 1.5, ease });
    a.then(() => {
      if (!alive) return;
      sweep();
      animate(coverFade, 0, { duration: 0.35 }).then(() => alive && setCover("open"));
    });
    return () => {
      alive = false;
      a.stop();
      b.stop();
    };
  }, [cover, rot, shift, coverFade, sweep]);

  const openCover = useCallback(() => {
    if (cover !== "closed") return;
    if (reduce) {
      rot.set(-180);
      shift.set(0);
      setCover("open");
      return;
    }
    playPageTurn(0.6);
    setCover("opening");
  }, [cover, reduce, rot, shift]);

  // The cover opens by itself after a moment.
  useEffect(() => {
    if (cover !== "closed" || !W) return;
    const id = setTimeout(openCover, reduce ? 0 : 1100);
    return () => clearTimeout(id);
  }, [cover, W, openCover, reduce]);

  /* ----- the ending: a star flies to the counter, confetti, then the grown-ups card ----- */
  const atEnd = page === total && cover === "open";
  const flyStar = useCallback(
    (done: () => void) => {
      const from = bookRef.current?.querySelector("[data-end-star]")?.getBoundingClientRect();
      const to = rootRef.current?.querySelector("[data-star-counter] svg")?.getBoundingClientRect();
      const el = flyRef.current;
      if (reduce || !from || !to || !el || from.width === 0) {
        done();
        return;
      }
      const sx = from.left + from.width / 2 - 24;
      const sy = from.top + from.height / 2 - 24;
      const ex = to.left + to.width / 2 - 24;
      const ey = to.top + to.height / 2 - 24;
      const mx = (sx + ex) / 2;
      const my = Math.min(sy, ey) - Math.max(60, Math.abs(ex - sx) * 0.2);
      const s0 = from.width / 48;
      const s1 = to.width / 48;
      const at = (x: number, y: number, s: number, r: number) => `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${s.toFixed(3)}) rotate(${r}deg)`;
      el.animate(
        [
          { transform: at(sx, sy, s0, 0), opacity: 0 },
          { transform: at(sx, sy - 10, s0 * 1.15, -10), opacity: 1, offset: 0.14 },
          { transform: at(mx, my, Math.max(s0, s1) * 1.1, 200), opacity: 1, offset: 0.55 },
          { transform: at(ex, ey, s1, 360), opacity: 1, offset: 0.94 },
          { transform: at(ex, ey, s1, 360), opacity: 0 },
        ],
        { duration: 1300, easing: "cubic-bezier(.45,0,.3,1)" },
      ).onfinish = done;
    },
    [reduce],
  );

  useEffect(() => {
    if (!atEnd) return;
    finishStory(story.id);
    onFinish?.(story.id);
    // The stickers this read earned: the story's own, its golden one, milestones.
    const before = earnedBefore.current ?? earnedStickers(currentBasis(), pageCount);
    recordFinish(story.id);
    const after = earnedStickers(currentBasis(), pageCount);
    earnedBefore.current = after;
    const fresh = [...after].filter((id) => !before.has(id)).map((id) => rewardSticker(id, story));
    const timers: ReturnType<typeof setTimeout>[] = [];
    const landed = () => {
      setStarLanded(true);
      playTapSound("chime");
      confetti(0.4);
      rootRef.current
        ?.querySelector("[data-star-counter]")
        ?.animate([{ transform: "scale(1)" }, { transform: "scale(1.4)" }, { transform: "scale(1)" }], { duration: 520, easing: "cubic-bezier(.3,1.6,.5,1)" });
      // New stickers fly into the sticker book first; the grown-ups card comes after them.
      if (fresh.length) timers.push(setTimeout(() => setReward(fresh), reduce ? 300 : 900));
      else if (immersive && story.grownUps) timers.push(setTimeout(() => setCardOpen(true), reduce ? 1200 : 2600));
    };
    timers.push(setTimeout(() => flyStar(landed), reduce ? 0 : 700));
    return () => timers.forEach(clearTimeout);
    // Only when arriving at the end.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atEnd]);

  /* ----- sound and depth ----- */
  // The scene's soundscape (full-screen book only). It shares the sound toggle.
  const mood = immersive && cover !== "closed" ? ambienceFor(story, page) : null;
  useEffect(() => {
    setAmbience(mood);
  }, [mood]);
  useEffect(() => () => setAmbience(null), []);
  // Layers in the pictures drift with the mouse or the phone's tilt.
  useDepth(stageRef, !reduce && cover === "open", `${page}|${turn ? turn.leaf : "-"}|${cardOpen}`);

  // Arrow keys turn pages (when the book is on screen); Escape closes the card, then the full-screen book.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const r = rootRef.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > innerHeight) return;
      if ((e.target as HTMLElement)?.closest("input,textarea")) return;
      if (voiceOpen) return;
      if (e.key === "Escape" && cardOpen) {
        setCardOpen(false);
        return;
      }
      if (e.key === "ArrowRight") {
        if (cover === "closed") openCover();
        else go(page + 1);
      }
      if (e.key === "ArrowLeft") go(page - 1);
      if (e.key === "Escape" && immersive && !document.fullscreenElement && !tellApp({ type: "lali:close" })) router.push("/stories");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, page, cover, openCover, immersive, router, cardOpen, voiceOpen]);

  // The full-screen book owns the page: no scrolling underneath.
  useEffect(() => {
    if (!immersive) return;
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = before;
    };
  }, [immersive]);

  /* ----- dragging a page with a finger or the mouse ----- */

  const toSpine = (clientX: number, clientY: number): Pt => {
    const r = bookRef.current?.getBoundingClientRect();
    if (!r) return { x: 0, y: 0 };
    return { x: clientX - r.left - (dims.current.spread ? dims.current.W : 0), y: clientY - r.top };
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    if (busy || reduce || (e.pointerType === "mouse" && e.button !== 0)) return;
    const p = toSpine(e.clientX, e.clientY);
    drag.current = { id: e.pointerId, x0: p.x, y0: p.y, started: false, forward: true, lastX: e.clientX, lastT: e.timeStamp, vx: 0 };
    suppressClick.current = false;
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const { W: w, H: h, spread: sp } = dims.current;
    const p = toSpine(e.clientX, e.clientY);
    if (!d.started) {
      const dx = p.x - d.x0;
      const dy = p.y - d.y0;
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      const forward = sp ? d.x0 >= 0 : dx < 0;
      if (forward ? page >= total : page <= 0) {
        drag.current = null;
        return;
      }
      d.started = true;
      d.forward = forward;
      suppressClick.current = true;
      leave();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      const cornerY = d.y0 < h / 2 ? 0 : h;
      if (forward) beginTurn(page, cornerY, 0);
      else beginTurn(page - 1, cornerY, 1);
    }
    const tr = turnRef.current;
    if (!tr) return;
    const dt = Math.max(1, e.timeStamp - d.lastT);
    d.vx = 0.7 * d.vx + 0.3 * ((e.clientX - d.lastX) / dt);
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    let x: number;
    if (d.forward) {
      const left = sp ? -w : 0;
      x = -w + ((p.x - left) / Math.max(30, d.x0 - left)) * 2 * w;
    } else {
      const right = w;
      x = -w + ((p.x - d.x0) / Math.max(30, right - d.x0)) * 2 * w;
    }
    x = Math.min(w, Math.max(-w, x));
    applyCurl({ x, y: tr.cornerY + (p.y - d.y0) });
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.started || d.id !== e.pointerId || !turnRef.current) return;
    const { W: w } = dims.current;
    const t = Math.min(1, Math.max(0, (w - pRef.current.x) / (2 * w)));
    let target: 0 | 1;
    if (d.forward) target = t > 0.3 || d.vx < -0.45 ? 1 : 0;
    else target = t < 0.7 || d.vx > 0.45 ? 0 : 1;
    const turned = d.forward ? target === 1 : target === 0;
    if (turned) playPageTurn(Math.min(1, 0.5 + Math.abs(d.vx)));
    runTo(target);
  };

  /* ----- what lies where ----- */

  const live = !turn && cover === "open";
  // Reading again starts a fresh hunt for Lali.
  const again = () => {
    setFound(new Set());
    setReadAloud(new Set());
    go(0);
  };
  const textFace = (idx: number, isLive: boolean, shadow: "left" | "none" = "left") => (
    <TextFace
      story={story}
      page={idx}
      lang={lang}
      live={isLive}
      onRead={() => setPageRead(true)}
      onAgain={again}
      fontSize={fontSize}
      shadow={shadow}
      reduce={reduce}
      starLanded={starLanded}
      finds={{ found: found.size, total }}
      voice={voice}
      voiceCount={voices.voices.length}
      onNextVoice={() => setVoiceIndex((v) => v + 1)}
      clip={idx < total ? clipFor(idx, lang) : null}
      micListen={micListen}
      micThreshold={micThreshold}
      onReadAloud={onReadAloud}
      readAloud={{ read: readAloud.size, total }}
    />
  );

  const layer = (z: number): CSSProperties => ({ position: "absolute", inset: 0, zIndex: z, willChange: turn ? "transform, clip-path" : undefined });

  let pages: ReactNode = null;
  if (W > 0) {
    if (spread) {
      const L = turn?.leaf ?? -1;
      const left = turn ? [L, L + 1] : [page];
      const right = turn ? [L + 1, L] : [page];
      pages = (
        <>
          <motion.div className="absolute top-0" style={{ left: 0, width: W, height: H, opacity: leftShown }}>
            {left.map((i) => (
              <div
                key={`a${i}`}
                ref={turn && i === L + 1 ? backRef : undefined}
                className="overflow-hidden rounded-l-[16px] rounded-r-[4px]"
                style={{ ...layer(turn && i === L + 1 ? 30 : 5), transformOrigin: "0 0" }}
              >
                <ArtFace story={story} page={i} tap={live} finder={finder} />
              </div>
            ))}
          </motion.div>
          <div className="absolute top-0" style={{ left: W, width: W, height: H }}>
            {right.map((i) => (
              <div
                key={`t${i}`}
                ref={turn ? (i === L ? frontRef : underRef) : undefined}
                className="overflow-hidden rounded-r-[16px] rounded-l-[4px]"
                style={layer(turn && i === L ? 20 : 10)}
              >
                {textFace(i, live)}
                {!turn && i < total && cover === "open" && <CornerHint />}
              </div>
            ))}
          </div>
          {/* spine */}
          <div className="pointer-events-none absolute top-0 z-[25] w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/15 to-transparent" style={{ left: W, height: H }} />
        </>
      );
    } else {
      const L = turn?.leaf ?? -1;
      const cards = turn ? [L + 1, L] : [page];
      const card = (i: number, isLive: boolean) => (
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-paper">
          <div className="relative shrink-0" style={{ height: artH }}>
            <ArtFace story={story} page={i} gutter="none" tap={isLive} finder={finder} />
          </div>
          <div className="min-h-0 flex-1">{textFace(i, isLive, "none")}</div>
        </div>
      );
      pages = (
        <>
          {cards.map((i) => (
            <div
              key={`c${i}`}
              ref={turn ? (i === L ? frontRef : underRef) : undefined}
              className="rounded-[22px]"
              style={layer(turn && i === L ? 20 : 10)}
            >
              {card(i, live)}
              {!turn && i < total && cover === "open" && <CornerHint />}
            </div>
          ))}
          {turn && (
            <div
              ref={backRef}
              className="absolute top-0 rounded-[22px] bg-[linear-gradient(100deg,#F4ECD8,#FFFDF6_60%,#EFE4CA)]"
              style={{ left: -W, width: W, height: H, zIndex: 30, transformOrigin: "0 0", visibility: "hidden" }}
            />
          )}
        </>
      );
    }
  }

  const bookWidth = spread ? 2 * W : W;

  const book = (
    <motion.div
      ref={bookRef}
      // While a page turns, the pictures hold still (see .lali-turning in globals.css).
      className={`relative touch-pan-y select-none ${turn ? "lali-turning" : ""}`}
      style={{ width: bookWidth, height: H, x: shift }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={(e) => {
        if (suppressClick.current) {
          e.preventDefault();
          e.stopPropagation();
          suppressClick.current = false;
        }
      }}
    >
      {/* the hard cover behind the pages */}
      {spread && (
        <motion.div
          className="absolute -inset-3 -bottom-4 rounded-[24px] shadow-[0_12px_0_rgba(0,0,0,.18),0_40px_60px_-20px_rgba(27,42,78,.5)]"
          style={{ background: story.color, opacity: leftShown }}
        />
      )}
      {!spread && <div className="absolute inset-0 translate-y-2 rounded-[22px] bg-black/15" />}
      {reduce ? (
        <motion.div key={page} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
          {pages}
        </motion.div>
      ) : (
        pages
      )}
      {/* light and shade on the turning page */}
      {turn && W > 0 && (
        <svg className="pointer-events-none absolute top-0 z-[40] overflow-visible" style={{ left: spread ? 0 : -W, width: 2 * W, height: H }} aria-hidden>
          <defs>
            <linearGradient ref={shadowGrad} id="lali-curl-shadow" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1B1408" stopOpacity={0.42} />
              <stop offset="0.35" stopColor="#1B1408" stopOpacity={0.12} />
              <stop offset="1" stopColor="#1B1408" stopOpacity={0} />
            </linearGradient>
            <linearGradient ref={shadeGrad} id="lali-curl-shade" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#000" stopOpacity={0.32} />
              <stop offset="0.05" stopColor="#000" stopOpacity={0.08} />
              <stop offset="0.16" stopColor="#fff" stopOpacity={0.42} />
              <stop offset="0.34" stopColor="#fff" stopOpacity={0.06} />
              <stop offset="0.75" stopColor="#000" stopOpacity={0.06} />
              <stop offset="1" stopColor="#000" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <polygon ref={shadowRef} fill="url(#lali-curl-shadow)" />
          <polygon ref={shadeRef} fill="url(#lali-curl-shade)" />
        </svg>
      )}
      {/* the magic of a page turn: a sweep of light on arrival, and sparkles off the fold */}
      {W > 0 && !reduce && (
        <>
          <div className={`pointer-events-none absolute inset-0 z-[44] overflow-hidden ${spread ? "rounded-[16px]" : "rounded-[22px]"}`} aria-hidden>
            <div ref={sweepRef} className="lali-sweep" />
          </div>
          <div className="pointer-events-none absolute inset-0 z-[45]" aria-hidden>
            {Array.from({ length: SPARKS }, (_, i) => (
              <div
                key={i}
                ref={(el) => {
                  sparkRefs.current[i] = el;
                }}
                className="lali-spark"
              />
            ))}
          </div>
        </>
      )}
      {cover !== "open" && W > 0 && <BookCover story={story} W={W} H={H} spread={spread} opening={cover === "opening"} onOpen={openCover} rot={rot} fade={coverFade} />}
    </motion.div>
  );

  const prev = <Arrow dir="left" big={immersive} label="Previous page" onClick={() => go(page - 1)} disabled={page === 0 || busy} />;
  const next = (
    <Arrow
      dir="right"
      big={immersive}
      label={cover === "closed" ? "Open the book" : page === total - 1 ? "Finish the story" : "Next page"}
      onClick={() => (cover === "closed" ? openCover() : go(page + 1))}
      disabled={page === total || (busy && cover !== "closed")}
      pulse={(pageRead && page < total) || cover === "closed"}
    />
  );

  // The star that flies from the end picture to the counter.
  const flyingStar = (
    <div ref={flyRef} className="pointer-events-none fixed left-0 top-0 z-[90] h-12 w-12 opacity-0 will-change-transform" aria-hidden>
      <div className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(255,226,122,.7),rgba(255,226,122,0)_70%)]" />
      <StarIcon className="relative h-12 w-12" />
    </div>
  );

  // The sticker reward at the end, and the grown-ups' recorder.
  const extras = (
    <>
      {reward && atEnd && (
        <StickerReward
          stickers={reward}
          lang={lang}
          reduce={reduce}
          onDone={() => {
            setReward(null);
            if (immersive && story.grownUps) setTimeout(() => setCardOpen(true), reduce ? 400 : 900);
          }}
        />
      )}
      {voiceOpen && (
        <RecordVoiceModal story={story} lang={lang} status={voices.status} voices={voices.voices} onClose={() => setVoiceOpen(false)} onSaved={reloadVoices} />
      )}
    </>
  );

  if (!immersive) {
    return (
      <div ref={rootRef} className="w-full">
        <div ref={stageRef} className="mx-auto flex w-full justify-center" style={{ maxWidth: spread ? 980 : 480 }}>
          {book}
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-4">
          {prev}
          <PageDots total={total} page={page} />
          {next}
          <LangToggle lang={lang} setLang={setLang} />
          <StickerBookButton lang={lang} />
          <RoundButton label={dict[lang].voices.openTools} onClick={() => setVoiceOpen(true)}>
            <MicIcon />
          </RoundButton>
        </div>
        {extras}
        {flyingStar}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={story.title[lang]}
      lang={lang}
      className="fixed inset-0 z-[70] flex flex-col overflow-hidden"
      style={{
        background: `radial-gradient(120% 90% at 50% 25%, color-mix(in oklab, ${story.color} 26%, #FFF8E8), color-mix(in oklab, ${story.color} 78%, #0B1030))`,
      }}
      // iOS asks before a page may read the tilt, and only from a tap.
      onPointerUpCapture={askForTilt}
    >
      <BackdropSparkles />
      {/* above the grown-ups card, so its language can still be switched */}
      <div className="relative z-[65] flex items-center gap-2 px-3 pt-3 sm:gap-3 sm:px-5 sm:pt-4">
        <Link
          href="/stories"
          onClick={(e) => {
            if (tellApp({ type: "lali:close" })) e.preventDefault();
          }}
          aria-label="Close the book and go back to the shelf"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_3px_0_rgba(27,42,78,.18)] transition hover:-translate-y-0.5"
        >
          {Icon.close}
        </Link>
        <p className="hidden min-w-0 flex-1 truncate text-center font-display text-lg font-black text-white [text-shadow:0_2px_0_rgba(0,0,0,.2)] md:block">
          <Swap lang={lang} className="max-w-full" layerClass="truncate">
            {(l) => story.title[l]}
          </Swap>
        </p>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <LangToggle lang={lang} setLang={setLang} />
          <StickerBookButton lang={lang} />
          <RoundButton label={dict[lang].voices.openTools} onClick={() => setVoiceOpen(true)}>
            <MicIcon />
          </RoundButton>
          <RoundButton label={muted ? "Turn sounds on" : "Turn sounds off"} pressed={!muted} onClick={() => setPageSoundMuted(!muted)}>
            {muted ? Icon.soundOff : Icon.soundOn}
          </RoundButton>
          {canFullscreen && (
            <RoundButton
              label={fullscreen ? "Leave full screen" : "Full screen"}
              onClick={() => {
                if (document.fullscreenElement) void document.exitFullscreen();
                else void rootRef.current?.requestFullscreen().catch(() => {});
              }}
            >
              {fullscreen ? Icon.shrink : Icon.expand}
            </RoundButton>
          )}
        </div>
      </div>

      <div ref={stageRef} className="relative min-h-0 flex-1">
        <div className="absolute inset-0 grid place-items-center">{book}</div>
        {spread && W > 0 && (
          <>
            <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 lg:left-6">{prev}</div>
            <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2 lg:right-6">{next}</div>
          </>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-center gap-3 px-3 pb-[max(14px,env(safe-area-inset-bottom))] pt-3">
        {!spread && prev}
        <PageDots total={total} page={page} light />
        {!spread && next}
      </div>
      {cardOpen && atEnd && story.grownUps && (
        <GrownUpsCard
          story={story}
          lang={lang}
          onClose={() => setCardOpen(false)}
          onAgain={() => {
            setCardOpen(false);
            again();
          }}
        />
      )}
      {extras}
      {flyingStar}
    </div>
  );
}

/** What the end-of-story sheet shows for a sticker id. */
function rewardSticker(id: string, story: Story): RewardSticker {
  if (id === storyStickerId(story.id)) return { id, color: story.color, title: story.title };
  if (id === goldenStickerId(story.id)) return { id, color: story.color, title: { en: `Golden ${story.title.en}`, am: `የወርቅ ${story.title.am}` } };
  const m = MILESTONES.find((x) => x.id === id);
  return { id, color: m?.color ?? story.color, title: m?.title ?? story.title };
}

/** A microphone, for the grown-ups' "Record your voice". */
function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <rect x="8.5" y="3" width="7" height="12" rx="3.5" fill="currentColor" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M8.5 21h7" stroke="currentColor" strokeWidth={2.2} fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** A folded-down corner on the page, nudging small readers to drag it. */
function CornerHint() {
  return (
    <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-9 w-9 overflow-hidden rounded-br-[16px]" aria-hidden>
      <div className="lali-peek absolute bottom-0 right-0 h-9 w-9 bg-[linear-gradient(135deg,transparent_50%,#E9DDBF_50%,#F7F0DC_80%)] shadow-[-2px_-2px_6px_rgba(0,0,0,.12)]" />
    </div>
  );
}

/** Faint sparkles drifting in the backdrop around the book. */
function BackdropSparkles() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      {[
        [8, 20, 0],
        [92, 14, -1],
        [16, 78, -2],
        [86, 70, -0.5],
        [50, 92, -1.5],
        [70, 8, -2.4],
        [30, 6, -3],
      ].map(([x, y, d], i) => (
        <circle key={i} cx={`${x}%`} cy={`${y}%`} r={i % 2 ? 2.5 : 3.5} fill="#fff" opacity={0.5} className="lali-twinkle" style={{ "--delay": `${d}s` } as CSSProperties} />
      ))}
    </svg>
  );
}

/** The closed book. It swings open in 3D, and the book slides to the middle as it does. */
function BookCover({
  story,
  W,
  H,
  spread,
  opening,
  onOpen,
  rot,
  fade,
}: {
  story: Story;
  W: number;
  H: number;
  spread: boolean;
  opening: boolean;
  onOpen: () => void;
  rot: MotionValue<number>;
  fade: MotionValue<number>;
}) {
  const frontOpacity = useTransform(rot, [-89, -91], [1, 0]);
  const backOpacity = useTransform(rot, [-89, -91], [0, 1]);
  const edges = useTransform(rot, [0, -30], [1, 0]);
  return (
    <motion.div className="absolute inset-0 z-50 [perspective:2200px]" style={{ opacity: fade }}>
        <motion.button
          type="button"
          aria-label={`Open ${story.title.en}`}
          onClick={onOpen}
          className="absolute top-0 block cursor-pointer [transform-style:preserve-3d]"
          style={{ left: spread ? W : 0, width: W, height: H, rotateY: rot, transformOrigin: "0% 50%" }}
          whileHover={opening ? undefined : { rotateY: -8 }}
        >
          <motion.div className="absolute inset-0 shadow-[0_18px_40px_-10px_rgba(0,0,0,.45)]" style={{ opacity: frontOpacity, borderRadius: 18 }}>
            <CoverFront story={story} scale={Math.min(1.3, W / 420)} />
          </motion.div>
          <motion.div className="absolute inset-0 [transform:scaleX(-1)]" style={{ opacity: backOpacity }}>
            <CoverBack color={story.color} />
          </motion.div>
        </motion.button>
        {/* the pages' edges, seen under the cover while it is closed */}
        <motion.div
          className="absolute top-1.5 rounded-r-[14px] bg-[repeating-linear-gradient(0deg,#FFFDF6_0_3px,#E9E1CB_3px_4px)]"
          style={{ left: spread ? W + 4 : 4, width: W - 2, height: H - 6, zIndex: -1, opacity: edges }}
        />
    </motion.div>
  );
}
