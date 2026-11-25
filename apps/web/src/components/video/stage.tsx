"use client";

import type { CSSProperties } from "react";

import type { SceneKind } from "@/content/stories";
import { BeeShape } from "../characters";
import { EndArt } from "../book/page-art";
import { Scene } from "../scenes";

/*
  The video stage: one segment of a story video (the intro, a page, or the end card) drawn at
  1920×1080 for the recorder in apps/web/video/. Nothing here moves on its own clock: the
  recorder calls window.__laliFrame(ms, word, camera) for every frame, which pauses every CSS
  and SVG animation at that moment, lights up the word being read and moves the camera.
  Only served when LALI_VIDEO_STAGE=1 (never in production; see video/README.md).
*/

export type StageSegment =
  | { kind: "intro"; title: string; scene: SceneKind; coverPage: number; tagline: string }
  | { kind: "page"; scene: SceneKind; page: number; lines: string[][] }
  | { kind: "end"; title: string; lines: readonly string[]; url: string };

declare global {
  interface Window {
    __laliFrame?: (ms: number, word: number, cam: { zoom: number; x: number; y: number }) => void;
    __laliReady?: boolean;
  }
}

if (typeof window !== "undefined") {
  window.__laliFrame = (ms, word, cam) => {
    // CSS animations and transitions, frozen at this moment of the segment.
    for (const a of document.getAnimations()) {
      a.pause();
      a.currentTime = ms;
    }
    // SVG (SMIL) motion, such as Lali's flight paths.
    document.querySelectorAll("svg").forEach((s) => {
      s.pauseAnimations();
      s.setCurrentTime(ms / 1000);
    });
    const camera = document.getElementById("stage-camera");
    if (camera) camera.style.transform = `translate(${cam.x}px, ${cam.y}px) scale(${cam.zoom})`;
    // The words: the line holding the current word is shown, and the word is lit.
    let shownLine = -1;
    document.querySelectorAll<HTMLElement>("[data-w]").forEach((el) => {
      const i = Number(el.dataset.w);
      el.classList.toggle("stage-word-on", i === word);
      el.classList.toggle("stage-word-read", i < word);
      if (i === Math.max(word, 0)) shownLine = Number(el.dataset.line);
    });
    document.querySelectorAll<HTMLElement>("[data-line-box]").forEach((el) => {
      el.style.opacity = Number(el.dataset.lineBox) === shownLine ? "1" : "0";
    });
  };
}

const full: CSSProperties = { position: "absolute", inset: 0 };

/** The picture card: the whole 4:3 scene, framed like a page of a book. */
const CARD = { left: 340, top: 18, width: 1240, height: 930 };

/** A woven tibeb band, the border pattern of a netela, down one side of the frame. */
function Tibeb({ x }: { x: number }) {
  return (
    <svg style={{ position: "absolute", left: x, top: 0 }} width={120} height={1080} viewBox="0 0 120 1080" aria-hidden>
      <defs>
        <pattern id={`tibeb-${x}`} width={60} height={60} patternUnits="userSpaceOnUse" x={30}>
          <rect width={60} height={60} fill="#2E9A8A" />
          <path d="M30 4 L56 30 L30 56 L4 30Z" fill="#F5B21E" />
          <path d="M30 16 L44 30 L30 44 L16 30Z" fill="#D9472B" />
          <circle cx={30} cy={30} r={4} fill="#FFFDF4" />
        </pattern>
      </defs>
      <rect x={30} width={60} height={1080} fill={`url(#tibeb-${x})`} />
      <rect x={20} width={6} height={1080} fill="#F5B21E" />
      <rect x={94} width={6} height={1080} fill="#F5B21E" />
    </svg>
  );
}

export function VideoStage({ segment, lang }: { segment: StageSegment; lang: "en" | "am" }) {
  const font = lang === "am" ? "var(--font-noto-ethiopic), var(--font-andika), sans-serif" : "var(--font-grandstander), sans-serif";
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        overflow: "hidden",
        background: segment.kind === "end" ? "#141B45" : "radial-gradient(ellipse at 50% 40%, #FFF3D6 0%, #F6DDA6 70%, #EBC27F 100%)",
      }}
    >
      {segment.kind === "end" ? (
        // The end card fills the frame: the star sits to the right, the words on the left.
        <div id="stage-camera" style={{ ...full, transformOrigin: "70% 50%" }}>
          <div style={{ position: "absolute", left: 440, top: -180, width: 1920, height: 1440 }}>
            <EndArt />
          </div>
        </div>
      ) : (
        <>
          <Tibeb x={60} />
          <Tibeb x={1740} />
          <div style={{ position: "absolute", ...CARD, borderRadius: 40, overflow: "hidden", boxShadow: "0 0 0 10px #FFFDF4, 0 18px 50px rgba(90,50,0,.35)" }}>
            <div id="stage-camera" style={{ ...full, transformOrigin: "50% 60%" }}>
              <Scene kind={segment.scene} page={segment.kind === "page" ? segment.page : segment.coverPage} />
            </div>
          </div>
        </>
      )}

      {segment.kind === "intro" && (
        <div
          style={{
            position: "absolute",
            ...CARD,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 26,
            borderRadius: 40,
            background: "radial-gradient(ellipse at 50% 50%, rgba(40,20,0,.5), rgba(40,20,0,.12) 70%)",
          }}
        >
          <div
            className="stage-badge"
            style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "var(--font-grandstander), sans-serif", background: "#FFFDF4", borderRadius: 999, padding: "8px 36px 8px 20px", boxShadow: "0 8px 24px rgba(0,0,0,.25)" }}
          >
            <svg viewBox="0 0 40 48" width={70} height={84} aria-hidden>
              <BeeShape />
            </svg>
            <span style={{ fontSize: 76, fontWeight: 900, color: "#E89A00" }}>Lali</span>
            <span style={{ fontSize: 64, fontWeight: 700, color: "#7A4A00", fontFamily: "var(--font-noto-ethiopic), sans-serif" }}>ላሊ</span>
          </div>
          <h1
            className="stage-title"
            style={{ fontFamily: font, fontSize: lang === "am" ? 128 : 136, fontWeight: 900, color: "#fff", margin: 0, textAlign: "center", lineHeight: 1.1, padding: "0 60px", textShadow: "0 8px 0 #7A3E12, 0 14px 40px rgba(0,0,0,.45)" }}
          >
            {segment.title}
          </h1>
          <p className="stage-tagline" style={{ fontFamily: font, fontSize: 50, fontWeight: 700, color: "#fff", margin: 0, background: "rgba(122,62,18,.85)", borderRadius: 999, padding: "12px 44px" }}>
            {segment.tagline}
          </p>
        </div>
      )}

      {segment.kind === "page" &&
        segment.lines.map((line, li) => {
          const first = segment.lines.slice(0, li).reduce((n, l) => n + l.length, 0);
          return (
            <div
              key={li}
              data-line-box={li}
              style={{ position: "absolute", left: 200, right: 200, top: CARD.top + CARD.height + 12, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0 }}
            >
              <p style={{ margin: 0, fontFamily: font, fontSize: lang === "am" ? 54 : 58, fontWeight: 700, lineHeight: 1.2, whiteSpace: "nowrap", color: "#3B2410" }}>
                {line.map((w, wi) => (
                  <span key={wi}>
                    <span data-w={first + wi} data-line={li} className="stage-word">
                      {w}
                    </span>{" "}
                  </span>
                ))}
              </p>
            </div>
          );
        })}

      {segment.kind === "end" && (
        <div style={{ position: "absolute", left: 130, top: 0, bottom: 0, width: 900, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: 26 }}>
          <h2 className="stage-end-title" style={{ fontFamily: font, fontSize: 120, fontWeight: 900, color: "#FFE9A0", margin: 0, textShadow: "0 8px 0 #0B1030" }}>
            {segment.title}
          </h2>
          {segment.lines.map((l, i) => (
            <p key={i} className="stage-end-line" style={{ fontFamily: font, fontSize: 52, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.3, animationDelay: `${0.6 + i * 0.5}s` }}>
              {l}
            </p>
          ))}
          <p
            className="stage-end-line"
            style={{ fontFamily: "var(--font-grandstander), sans-serif", fontSize: 46, fontWeight: 800, color: "#141B45", background: "#FFD54A", borderRadius: 999, padding: "12px 40px", margin: "16px 0 0", animationDelay: "2s" }}
          >
            {segment.url}
          </p>
        </div>
      )}

      <style>{`
        html, body { margin: 0; background: #000; overflow: hidden; }
        nextjs-portal { display: none !important; }
        .stage-word { border-radius: 14px; padding: 0 6px; margin: 0 -6px; }
        .stage-word-read { color: #9A6A3B; }
        .stage-word-on { background: #FFD54A; color: #3B2410; box-shadow: 0 0 0 4px #FFD54A; }
        @keyframes stage-rise { from { opacity: 0; transform: translateY(40px) scale(.9); } to { opacity: 1; transform: none; } }
        .stage-badge { animation: stage-rise .8s .2s both cubic-bezier(.2,1.4,.4,1); }
        .stage-title { animation: stage-rise 1s .7s both cubic-bezier(.2,1.4,.4,1); }
        .stage-tagline { animation: stage-rise .8s 1.5s both ease-out; }
        .stage-end-title { animation: stage-rise 1s .2s both cubic-bezier(.2,1.4,.4,1); }
        .stage-end-line { animation: stage-rise .8s both ease-out; }
      `}</style>
    </div>
  );
}
