"use client";

import { Suspense, useEffect, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { flushSync } from "react-dom";

import type { SceneKind, Story } from "@/content/stories";
import { BeeShape } from "../characters";
import { CoverFront } from "../book/cover";
import { EndArt } from "../book/page-art";
import { BleedScene, fallbackEdges, fitScene, loadEdges, useEdges } from "../book/bleed";
import { SkyGlow, skyFor, skyProps } from "../book/sky";
import { nameTones } from "@/lib/story-names";
import { SceneBody } from "../scenes";
import "./stage";
import { PROMO, PROMO_PAGES, PROMO_VALUE_PAGES, type PromoBeat } from "../../../video/segments";

/*
  The vertical promo for parents: one beat (hook, pages, values, proof, end) drawn at 1080×1920
  for the recorder in apps/web/video/ (video/promo-plan.mjs makes its timeline). Unlike the story
  stage, everything here is drawn from the clock: the recorder's window.__laliFrame(ms) sets the
  time (window.__laliTime), the beat redraws for that moment, and then the scenes' own CSS and
  SVG animations are frozen at it, so each frame is exact however slow the machine is.

  Shorts and Reels put their buttons over the right and the bottom of the picture, so the words
  stay in the column x 60..900 and above y 1500; only decoration goes further.
*/

export const PROMO_W = 1080;
export const PROMO_H = 1920;
/** The column the words keep to. */
const COL = { left: 60, width: 840 };

/* ---------- the clock ---------- */

let now = 0;
const subs = new Set<() => void>();
const subscribe = (f: () => void) => {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
};
/** Seconds into this beat. */
function useSeconds() {
  return useSyncExternalStore(subscribe, () => now, () => 0) / 1000;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t: number) => t * t * (3 - 2 * t);
/** 0→1 over `dur` seconds from `at`, with a little overshoot (things pop in). */
function pop(s: number, at: number, dur = 0.45) {
  const t = clamp01((s - at) / dur);
  const c = 1.9;
  return t === 0 ? 0 : 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
}
/** 0→1 over `dur` seconds from `at`, eased. */
const fade = (s: number, at: number, dur = 0.35) => smooth(clamp01((s - at) / dur));

/** Opacity and a rise for something that pops in at `at`. */
function popIn(s: number, at: number, rise = 50): CSSProperties {
  const p = pop(s, at);
  return { opacity: clamp01(p * 1.6), transform: `translateY(${((1 - p) * rise).toFixed(1)}px) scale(${(0.85 + 0.15 * p).toFixed(4)})` };
}

/* ---------- pieces ---------- */

const FONT = { en: "var(--font-grandstander), sans-serif", am: "var(--font-noto-ethiopic), var(--font-andika), sans-serif" } as const;
const full: CSSProperties = { position: "absolute", inset: 0 };

/** A page of a drawn scene filling the whole frame, its sky and ground carried to the edges. */
function Bleed({ kind, page, color, zoom = 1, anchorY = 0.72 }: { kind: SceneKind; page: number; color: string; zoom?: number; anchorY?: number }) {
  const edges = useEdges(kind, page) ?? fallbackEdges(color);
  const fit = fitScene(PROMO_W, PROMO_H, { x: 0, y: 0, w: PROMO_W, h: PROMO_H }, anchorY);
  return (
    <div style={{ ...full, transform: `scale(${zoom.toFixed(4)})`, transformOrigin: "50% 62%" }}>
      <BleedScene w={PROMO_W} h={PROMO_H} fit={fit} edges={edges}>
        <SceneBody kind={kind} page={page} />
      </BleedScene>
    </div>
  );
}

/** Lali's name badge: the bee, "Lali" and ላሊ. */
function Logo({ size = 1 }: { size?: number }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 18 * size, background: "#FFFDF4", borderRadius: 999, padding: `${8 * size}px ${40 * size}px ${8 * size}px ${22 * size}px`, boxShadow: "0 10px 30px rgba(0,0,0,.3)" }}>
      <svg viewBox="0 0 40 48" width={76 * size} height={91 * size} aria-hidden>
        <BeeShape />
      </svg>
      <span style={{ fontFamily: FONT.en, fontSize: 84 * size, fontWeight: 900, color: "#E89A00" }}>Lali</span>
      <span style={{ fontFamily: FONT.am, fontSize: 70 * size, fontWeight: 700, color: "#7A4A00" }}>ላሊ</span>
    </div>
  );
}

/** The words column, with a soft shade behind it so white words read on any picture. */
function Column({ top, children, style }: { top: number; children: ReactNode; style?: CSSProperties }) {
  return <div style={{ position: "absolute", left: COL.left, width: COL.width, top, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", ...style }}>{children}</div>;
}

const shadeTop: CSSProperties = { position: "absolute", left: 0, right: 0, top: 0, height: 900, background: "linear-gradient(rgba(16,20,56,.72), rgba(16,20,56,.45) 55%, rgba(16,20,56,0))" };

/* ---------- the beats ---------- */

type Copy = { hook: string; values: readonly string[]; contrast: string; cta: string };
type BeatProps = { lang: "en" | "am"; copy: Copy; story: Story; pageCount: number; pages: string[]; both: { en: string; am: string }[]; covers: Story[] };

/** Splits a line into its sentences (they come in one by one). */
const sentences = (s: string) => s.split(/(?<=[?.!።])\s+/).filter(Boolean);

/** Times, from 0 to `seconds`, at which each of `parts` starts when read at an even pace. */
function partTimes(parts: readonly string[], seconds: number) {
  const w = parts.map((p) => p.length + 6);
  const total = w.reduce((a, b) => a + b, 0);
  let acc = 0;
  return w.map((x) => {
    const at = (acc / total) * seconds;
    acc += x;
    return at;
  });
}

/** 1. The hook, over Anbessa's home. */
function Hook({ lang, copy, story }: BeatProps) {
  const s = useSeconds();
  const parts = sentences(copy.hook);
  // In time with the voice (4.6 s from 0.3 s); the Amharic video keeps the same pace.
  const times = partTimes(parts, 4.0).map((t) => 0.25 + t);
  const sizes = lang === "am" ? [96, 72, 84] : [118, 80, 96];
  return (
    <>
      <Bleed kind={story.scene!} page={0} color={story.color} zoom={1.0 + 0.05 * smooth(clamp01(s / 5))} />
      <div style={shadeTop} />
      <Column top={190} style={{ gap: 34 }}>
        {parts.map((p, i) => (
          <p
            key={i}
            style={{
              ...popIn(s, times[i]),
              margin: 0,
              fontFamily: FONT[lang],
              fontSize: sizes[Math.min(i, sizes.length - 1)],
              fontWeight: 900,
              lineHeight: 1.15,
              color: i === parts.length - 1 ? "#FFD54A" : "#fff",
              textShadow: "0 6px 0 rgba(20,20,60,.55), 0 12px 40px rgba(0,0,0,.45)",
            }}
          >
            {p}
          </p>
        ))}
      </Column>
    </>
  );
}

/** 2. Pages turning, their words lighting up as if read. */
function Pages({ lang, story, pageCount, pages, both }: BeatProps) {
  const s = useSeconds();
  const PER = 2.2;
  const TURN = 0.55;
  return (
    <>
      {PROMO_PAGES.map((page, k) => {
        // Page k shows from k*PER; in its last TURN seconds it turns away (but not the last one).
        const turnAt = (k + 1) * PER - TURN;
        const u = k < PROMO_PAGES.length - 1 ? smooth(clamp01((s - turnAt) / TURN)) : 0;
        const words = pages[k].split(" ");
        const from = k * PER + 0.15;
        const lit = clamp01((s - from) / (PER - TURN - 0.35)) * words.length;
        return (
          <div
            key={page}
            style={{
              ...full,
              zIndex: 10 - k,
              transformOrigin: "0% 50%",
              transform: `perspective(2600px) rotateY(${(-100 * u).toFixed(2)}deg)`,
              visibility: u >= 1 || s < k * PER - TURN ? "hidden" : "visible",
              backfaceVisibility: "hidden",
            }}
          >
            <Bleed kind={story.scene!} page={page} color={story.color} zoom={1.02 + 0.04 * clamp01((s - k * PER) / PER)} />
            {/* the shade of the turning page */}
            <div style={{ ...full, background: "linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,.35))", opacity: u }} />
            <PageWords story={story} page={page} cast={both} en={both[k].en} lang={lang} words={words} lit={lit} pageCount={pageCount} />
          </div>
        );
      })}
      {/* what the voice says over the pages */}
      <Column top={150} style={{ zIndex: 20 }}>
        <p style={{ ...popIn(s, 0.3), margin: 0, fontFamily: FONT[lang], fontSize: lang === "am" ? 42 : 40, fontWeight: 800, whiteSpace: "nowrap", color: "#fff", background: "rgba(14,140,128,.95)", borderRadius: 999, padding: "12px 30px", boxShadow: "0 8px 24px rgba(0,0,0,.25)" }}>
          {PROMO[lang].care}
        </p>
      </Column>
    </>
  );
}

/** Where a page's scene goes in the frame (as `Bleed` places it, before its slow zoom). */
const PAGE_FIT = fitScene(PROMO_W, PROMO_H, { x: 0, y: 0, w: PROMO_W, h: PROMO_H }, 0.72);

/**
 * A page's words as the reader sets them: straight on the picture's sky, over a soft glow of the
 * sky's own colour (book/sky.tsx), names in their colours, the word being read on a gold mark.
 */
function PageWords({
  story,
  page,
  cast,
  en,
  lang,
  words,
  lit,
  pageCount,
}: {
  story: Story;
  page: number;
  /** The promo's pages in both languages: they say who the characters are. */
  cast: { en: string; am: string }[];
  en: string;
  lang: "en" | "am";
  words: string[];
  lit: number;
  pageCount: number;
}) {
  const edges = useEdges(story.scene, page) ?? fallbackEdges(story.color);
  const sp = skyProps(skyFor({ x: COL.left, y: 290, w: COL.width, h: 520 }, PAGE_FIT, edges));
  const tones = nameTones({ pages: cast }, words, lang, en);
  return (
    <div className={sp.className} style={{ ...sp.style, position: "absolute", left: COL.left, width: COL.width, top: 300, fontSize: lang === "am" ? 64 : 70 }}>
      <SkyGlow />
      <div style={{ position: "relative" }}>
        <p className="lali-sky-head" style={{ margin: "0 0 14px", fontFamily: FONT.en, fontSize: 30, fontWeight: 800, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: FONT[lang] }}>{story.title[lang]}</span>
          <span>
            {page + 1} / {pageCount}
          </span>
        </p>
        <p className={lang === "am" ? "lali-story-am" : "lali-story-en"} style={{ margin: 0, lineHeight: lang === "am" ? 1.6 : 1.42 }}>
          {words.map((w, i) => {
            const on = clamp01(lit - i);
            const now = i === Math.floor(lit) && lit < words.length;
            return (
              <span key={i}>
                <span
                  className="lali-word"
                  data-tone={tones[i]}
                  data-on={now ? "" : undefined}
                  data-read={!now && on >= 1 && lit < words.length ? "" : undefined}
                  style={{ opacity: 0.3 + 0.7 * on, borderRadius: 14, padding: "0 4px", margin: "0 -4px" }}
                >
                  {w}
                </span>{" "}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

const BADGE = [
  ["#E8513B", "#fff"],
  ["#0E8C80", "#fff"],
  ["#F5B21E", "#2A1A00"],
  ["#D63B72", "#fff"],
  ["#2F5BD3", "#fff"],
] as const;

/** 3. The values, one by one, each over its own picture. */
function Values({ lang, copy, story }: BeatProps) {
  const s = useSeconds();
  // In time with the voice (5.7 s from 0.3 s).
  const times = partTimes(copy.values, 5.72).map((t) => 0.2 + t);
  const shown = times.reduce((n, t, i) => (s >= t ? i : n), 0);
  return (
    <>
      {PROMO_VALUE_PAGES.map((page, k) => (
        <div key={k} style={{ ...full, opacity: k === 0 ? 1 : fade(s, times[k] - 0.1, 0.3), visibility: k <= shown + 1 ? "visible" : "hidden" }}>
          <Bleed kind={story.scene!} page={page} color={story.color} zoom={1.03 + 0.05 * clamp01((s - times[k]) / 2)} />
        </div>
      ))}
      <div style={{ ...shadeTop, height: 1500, background: "linear-gradient(rgba(16,20,56,.6), rgba(16,20,56,.35) 70%, rgba(16,20,56,0))" }} />
      <Column top={220} style={{ gap: 40 }}>
        {copy.values.map((v, k) => (
          <p
            key={v}
            style={{
              ...popIn(s, times[k], 80),
              margin: 0,
              fontFamily: FONT[lang],
              fontSize: lang === "am" ? 84 : 96,
              fontWeight: 900,
              lineHeight: 1.2,
              padding: "14px 56px",
              borderRadius: 999,
              background: BADGE[k][0],
              color: BADGE[k][1],
              boxShadow: "0 10px 0 rgba(0,0,0,.22), 0 24px 50px rgba(0,0,0,.3)",
              rotate: `${[-3, 2, -1.5, 2.5, -2][k]}deg`,
            }}
          >
            {v}
          </p>
        ))}
      </Column>
    </>
  );
}

/** 4. Over 280 stories: the shelf flies past. */
function Proof({ lang, covers }: BeatProps) {
  const s = useSeconds();
  const n = Math.round(280 * smooth(clamp01((s - 0.3) / 1.4)));
  const p = PROMO[lang];
  // Three lanes of covers drifting up and across, at different speeds.
  const lanes = [
    { x: -40, speed: 260, scale: 0.62, tilt: -8 },
    { x: 330, speed: 380, scale: 0.78, tilt: 5 },
    { x: 720, speed: 300, scale: 0.66, tilt: -4 },
  ];
  const CW = 340;
  const CH = 440;
  return (
    <>
      <div style={{ ...full, background: "radial-gradient(ellipse at 50% 35%, #2A3E9E, #141B45 75%)" }} />
      {covers.map((c, i) => {
        const lane = lanes[i % lanes.length];
        const row = Math.floor(i / lanes.length);
        const h = CH * lane.scale + 70;
        const y = 1960 + row * h - s * lane.speed - (i % lanes.length) * 120;
        // Every cover stays mounted (off the frame when not passing), so its picture has loaded
        // before the first frame; a picture still loading never hides the rest (Suspense).
        const off = y < -h || y > 2000;
        return (
          <div
            key={c.id}
            style={{ position: "absolute", visibility: off ? "hidden" : "visible", left: lane.x, top: y, width: CW, height: CH, transform: `scale(${lane.scale}) rotate(${lane.tilt + Math.sin(i * 1.7 + s) * 2}deg)`, transformOrigin: "0 0", filter: "drop-shadow(0 20px 30px rgba(0,0,0,.45))" }}
          >
            <Suspense fallback={null}>
              <CoverFront story={c} scale={1} />
            </Suspense>
          </div>
        );
      })}
      <div style={{ ...full, background: "radial-gradient(ellipse 70% 32% at 45% 32%, rgba(16,20,56,.88), rgba(16,20,56,.55) 60%, rgba(16,20,56,0))" }} />
      <Column top={300} style={{ gap: 10 }}>
        <p style={{ ...popIn(s, 0.2), margin: 0, fontFamily: FONT[lang], fontSize: lang === "am" ? 150 : 170, fontWeight: 900, lineHeight: 1.05, color: "#FFD54A", textShadow: "0 8px 0 #7A3E12, 0 18px 50px rgba(0,0,0,.5)", fontVariantNumeric: "tabular-nums" }}>
          {p.over(n)}
        </p>
        <p style={{ ...popIn(s, 0.9), margin: 0, fontFamily: FONT[lang], fontSize: lang === "am" ? 120 : 130, fontWeight: 900, lineHeight: 1.1, color: "#fff", textShadow: "0 8px 0 rgba(0,0,0,.35)" }}>
          {p.stories}
        </p>
        <p style={{ ...popIn(s, 2.2), margin: "30px 0 0", fontFamily: FONT[lang], fontSize: lang === "am" ? 54 : 60, fontWeight: 800, lineHeight: 1.3, color: "#fff", background: "rgba(14,140,128,.92)", borderRadius: 40, padding: "18px 40px" }}>
          {p.proofSub}
        </p>
      </Column>
    </>
  );
}

/** 5. No ads, just good stories, and the way in: Lali, the call and the address. */
function End({ lang, copy }: BeatProps) {
  const s = useSeconds();
  const parts = sentences(copy.contrast);
  // In time with the voice (4.8 s from 0.3 s), then the call (from 5.3 s).
  const times = partTimes(parts, 4.2).map((t) => 0.3 + t);
  const ctaAt = 4.9;
  return (
    <>
      <div style={{ ...full, background: "#141B45" }} />
      {/* the ending's star sits low, under the words, fading in from the night above */}
      <div style={{ position: "absolute", left: -420, top: 980, width: 1920, height: 1440, opacity: 0.9, maskImage: "linear-gradient(transparent, #000 22%)" }}>
        <EndArt />
      </div>
      <div style={{ ...full, background: "linear-gradient(rgba(20,27,69,.85), rgba(20,27,69,.55) 45%, rgba(20,27,69,.1) 75%)" }} />
      <Column top={150} style={{ gap: 26 }}>
        <div style={popIn(s, 0.05)}>
          <Logo />
        </div>
        <div style={{ height: 40 }} />
        {parts.map((p, i) => (
          <p key={i} style={{ ...popIn(s, times[i]), margin: 0, fontFamily: FONT[lang], fontSize: i === parts.length - 1 ? (lang === "am" ? 88 : 100) : lang === "am" ? 72 : 84, fontWeight: 900, lineHeight: 1.2, color: i === parts.length - 1 ? "#FFD54A" : "#fff", textShadow: "0 6px 0 rgba(0,0,0,.35)" }}>
            {p}
          </p>
        ))}
        <div style={{ height: 30 }} />
        <p style={{ ...popIn(s, ctaAt, 60), margin: 0, fontFamily: FONT[lang], fontSize: lang === "am" ? 64 : 72, fontWeight: 900, color: "#fff", background: "#E8513B", borderRadius: 36, padding: "22px 54px", boxShadow: "0 10px 0 #B83826, 0 24px 50px rgba(0,0,0,.4)" }}>
          {copy.cta}
        </p>
        <p style={{ ...popIn(s, ctaAt + 0.5), margin: "12px 0 0", fontFamily: FONT.en, fontSize: 56, fontWeight: 800, color: "#141B45", background: "#FFD54A", borderRadius: 999, padding: "12px 44px" }}>
          {PROMO[lang].url}
        </p>
      </Column>
    </>
  );
}

const BEATS: Record<PromoBeat, (p: BeatProps) => ReactNode> = { hook: Hook, pages: Pages, values: Values, proof: Proof, end: End };

export function PromoStage({ beat, ...props }: { beat: PromoBeat } & BeatProps) {
  // The recorder sets the time before it freezes the animations (video/stage.tsx).
  useEffect(() => {
    window.__laliTime = (ms) => {
      now = ms;
      flushSync(() => subs.forEach((f) => f()));
    };
    loadEdges(props.story.scene);
    return () => {
      window.__laliTime = undefined;
    };
  }, [props.story.scene]);
  const Beat = BEATS[beat];
  return (
    <div style={{ position: "fixed", left: 0, top: 0, width: PROMO_W, height: PROMO_H, overflow: "hidden", background: "#141B45" }}>
      <Beat {...props} />
      <style>{`
        html, body { margin: 0; background: #000; overflow: hidden; }
        nextjs-portal { display: none !important; }
      `}</style>
    </div>
  );
}
