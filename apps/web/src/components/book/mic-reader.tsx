"use client";

import type { CSSProperties } from "react";

import type { Lang } from "@/content/stories";
import { dict } from "@/i18n/dict";
import type { MicReader } from "@/lib/read-aloud/use-mic-reader";
import { STAR_PATH } from "../characters";

/*
  The read-along microphone's controls on a page: the "🎤 I'll read!" button beside "Read to me",
  and the little panel that takes the buttons' place while the child reads.
*/

export function MicGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="8.5" y="3" width="7" height="12" rx="3.5" fill="currentColor" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M8.5 21h7" stroke="currentColor" strokeWidth={2.2} fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Star({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d={STAR_PATH} fill="#FFC83D" stroke="#C98A0A" strokeWidth={1.2} strokeLinejoin="round" />
    </svg>
  );
}

export function MicButton({ lang, live, onClick }: { lang: Lang; live: boolean; onClick: () => void }) {
  const t = dict[lang].mic;
  return (
    <button
      type="button"
      tabIndex={live ? 0 : -1}
      data-mic-start=""
      aria-label={t.buttonLabel}
      onClick={onClick}
      className="btn !bg-[#1E9E5A] !text-base !text-white ![--edge:#13723F] shadow-[0_6px_0_#13723F]"
    >
      <MicGlyph />
      <span className={lang === "am" ? "font-ethiopic" : ""}>{t.button}</span>
    </button>
  );
}

/** Stars filling up towards "enough of the page read". */
function Progress({ value, goal }: { value: number; goal: number }) {
  const pct = Math.round(Math.min(1, value / goal) * 100);
  return (
    <div className="flex w-full max-w-[16em] items-center gap-2" aria-hidden>
      <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-[#E3F4E7]">
        <div className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#57C77F,#1E9E5A)] transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      <Star className={`h-6 w-6 shrink-0 transition-transform duration-300 ${pct >= 100 ? "scale-125" : "opacity-60 grayscale"}`} />
    </div>
  );
}

const fmt = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export function MicPanel({ mic, lang, live }: { mic: MicReader; lang: Lang; live: boolean }) {
  const t = dict[lang].mic;
  const tab = live ? 0 : -1;
  const small = "btn !px-4 !py-2 !text-[0.95rem]";
  const font = lang === "am" ? "font-ethiopic" : "";

  let body: React.ReactNode;
  switch (mic.phase) {
    case "explain":
      body = (
        <>
          <p className="font-bold">🎤 {t.hello}</p>
          <p className="text-[0.8em] text-[#5E5232]">
            {mic.mode === "listen" ? t.helloListen : t.helloRecord} {t.askNote}
            {mic.mode === "record" && <> {t.staysHere}</>}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" tabIndex={tab} data-mic="go" className={`${small} !bg-[#1E9E5A] !text-white shadow-[0_5px_0_#13723F]`} onClick={mic.allow}>
              {t.go}
            </button>
            <button type="button" tabIndex={tab} className={`${small} btn-plain`} onClick={mic.close}>
              {t.notNow}
            </button>
          </div>
        </>
      );
      break;
    case "listening":
    case "recording":
      body = (
        <>
          <div className="flex items-center gap-3">
            <span className={`mic-live relative grid h-12 w-12 shrink-0 place-items-center rounded-full text-white ${mic.phase === "recording" ? "bg-coral" : "bg-[#1E9E5A]"}`}>
              <MicGlyph className="h-6 w-6" />
            </span>
            <p className="text-left font-bold" aria-live="polite">
              {mic.phase === "listening" ? t.listening : t.recording}
              {mic.phase === "recording" && <span className="ml-2 tabular-nums text-[#7A6A45]">{fmt(mic.elapsed)}</span>}
            </p>
          </div>
          {mic.phase === "listening" ? <Progress value={mic.progress} goal={mic.goal} /> : <p className="text-[0.75em] text-[#5E5232]">🔒 {t.staysHere}</p>}
          <button type="button" tabIndex={tab} data-mic="done" className={`${small} btn-primary`} onClick={mic.done}>
            ■ {t.done}
          </button>
        </>
      );
      break;
    case "playback":
      body = (
        <>
          <p className="font-bold" aria-live="polite">
            🎧 {t.playback}
          </p>
          <button type="button" tabIndex={tab} data-mic="stop" className={`${small} btn-plain`} onClick={mic.done}>
            ■ {t.stop}
          </button>
        </>
      );
      break;
    case "paused":
      body = (
        <>
          <p className="font-bold">🌟 {t.keepGoing}</p>
          <Progress value={mic.progress} goal={mic.goal} />
          {mic.missed.length > 0 && <p className="text-[0.8em] text-[#5E5232]">{t.keepGoingSub}</p>}
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" tabIndex={tab} data-mic="keep" className={`${small} !bg-[#1E9E5A] !text-white shadow-[0_5px_0_#13723F]`} onClick={mic.keepGoing}>
              🎤 {t.keepReading}
            </button>
            <button type="button" tabIndex={tab} className={`${small} btn-plain`} onClick={mic.close}>
              {t.close}
            </button>
          </div>
        </>
      );
      break;
    case "celebrate":
      body = (
        <>
          <div className="relative grid place-items-center">
            <span className="mic-burst absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,214,90,.75),rgba(255,214,90,0)_70%)]" aria-hidden />
            <Star className="mic-star relative h-16 w-16 drop-shadow-[0_4px_0_rgba(201,138,10,.35)]" />
          </div>
          <p className="font-display text-[1.35em] font-black leading-tight text-[#13723F]" data-mic-celebrate={mic.mode}>
            <span className={font}>{mic.mode === "listen" ? t.readIt : t.wellRead}</span>
          </p>
          <p className="text-[0.8em] font-bold text-[#7A3E00]">⭐ {t.starPage}</p>
          {mic.missed.length > 0 && <p className="text-[0.75em] text-[#5E5232]">{t.keepGoingSub}</p>}
          <div className="flex flex-wrap justify-center gap-2">
            {mic.mode === "record" && mic.hasClip() && (
              <button type="button" tabIndex={tab} data-mic="listen" className={`${small} btn-plain`} onClick={mic.playBack}>
                🎧 {t.listenAgain}
              </button>
            )}
            <button type="button" tabIndex={tab} data-mic="again" className={`${small} btn-plain`} onClick={mic.again}>
              🎤 {t.readAgain}
            </button>
            <button type="button" tabIndex={tab} data-mic="close" className={`${small} btn-primary`} onClick={mic.close}>
              {t.ok}
            </button>
          </div>
        </>
      );
      break;
    case "tooShort":
      body = (
        <>
          <p className="font-bold">🎤 {t.tooShort}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" tabIndex={tab} className={`${small} !bg-[#1E9E5A] !text-white shadow-[0_5px_0_#13723F]`} onClick={mic.again}>
              {t.tryAgain}
            </button>
            <button type="button" tabIndex={tab} className={`${small} btn-plain`} onClick={mic.close}>
              {t.notNow}
            </button>
          </div>
        </>
      );
      break;
    case "denied":
    case "nomic":
      body = (
        <>
          <p className="text-[0.85em] font-bold" data-mic-problem={mic.phase}>
            💛 {mic.phase === "denied" ? t.denied : t.noMic}
          </p>
          <button type="button" tabIndex={tab} className={`${small} btn-plain`} onClick={mic.close}>
            {t.ok}
          </button>
        </>
      );
      break;
    default:
      return null;
  }

  return (
    <div
      className={`lali-fade relative flex w-full flex-col items-center gap-2 rounded-[20px] bg-[#F3FBF4] px-3 py-3 text-center text-[0.9em] shadow-[inset_0_0_0_2px_#BFE8CB] ${font}`}
      data-mic-panel={mic.phase}
      data-mic-mode={mic.mode}
      lang={lang}
    >
      {body}
    </div>
  );
}
