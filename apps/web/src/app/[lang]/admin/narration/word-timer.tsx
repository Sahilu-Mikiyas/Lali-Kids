"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Lang } from "@/content/stories";
import { pageWords } from "@/lib/narration/shared";
import type { AdminClip } from "./studio";

/*
  The word-timing tool. Play the clip and tap the space bar (or the big button) at the start of
  each word; the highlight moves along as you go. Marks show on the clip's waveform. Pick a word to
  nudge it by 50 ms, or "re-tap from here" to redo the rest. Save stores word_times (ms).
*/

const BARS = 240;
const NUDGE = 50;

/** Loudness of the clip in BARS slices, 0 to 1 (empty when the browser can't decode it). */
async function peaksOf(url: string): Promise<number[]> {
  try {
    const buf = await (await fetch(url)).arrayBuffer();
    const ctx = new AudioContext();
    try {
      const audio = await ctx.decodeAudioData(buf);
      const data = audio.getChannelData(0);
      const size = Math.max(1, Math.floor(data.length / BARS));
      const out: number[] = [];
      for (let b = 0; b < BARS; b++) {
        let peak = 0;
        for (let i = b * size; i < Math.min(data.length, (b + 1) * size); i += 8) peak = Math.max(peak, Math.abs(data[i]));
        out.push(peak);
      }
      const max = Math.max(0.01, ...out);
      return out.map((p) => p / max);
    } finally {
      void ctx.close();
    }
  } catch {
    return [];
  }
}

const sec = (ms: number) => (ms / 1000).toFixed(2);

export function WordTimer({
  storyId,
  lang,
  page,
  text,
  clip,
  onClose,
  onSaved,
}: {
  storyId: string;
  lang: Lang;
  page: number;
  text: string;
  clip: AdminClip;
  onClose: () => void;
  onSaved: () => void;
}) {
  const words = useMemo(() => pageWords(text), [text]);
  const n = words.length;
  const startTimes = clip.wordTimes.length === n ? clip.wordTimes : [];
  const [times, setTimes] = useState<number[]>(startTimes);
  const [cursor, setCursor] = useState(startTimes.length);
  const [tapping, setTapping] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [now, setNow] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [rate, setRate] = useState(1);
  const [peaks, setPeaks] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState<{ text: string; bad?: boolean } | null>(null);
  const [pulse, setPulse] = useState(0);
  const [durationMs, setDurationMs] = useState(clip.durationMs);
  const audio = useRef<HTMLAudioElement | null>(null);
  const frame = useRef<number | null>(null);
  const tapRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let alive = true;
    if (clip.url) peaksOf(clip.url).then((p) => alive && setPeaks(p));
    return () => {
      alive = false;
    };
  }, [clip.url]);

  // One audio element for the whole session.
  useEffect(() => {
    if (!clip.url) return;
    const a = new Audio(clip.url);
    a.preload = "auto";
    audio.current = a;
    a.onloadedmetadata = () => {
      if (Number.isFinite(a.duration) && a.duration > 0) setDurationMs(Math.round(a.duration * 1000));
    };
    a.onplay = () => setPlaying(true);
    a.onpause = () => setPlaying(false);
    a.onended = () => {
      setPlaying(false);
      setTapping(false);
    };
    const follow = () => {
      setNow(Math.round(a.currentTime * 1000));
      frame.current = requestAnimationFrame(follow);
    };
    frame.current = requestAnimationFrame(follow);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      a.pause();
      audio.current = null;
    };
  }, [clip.url]);

  useEffect(() => {
    if (audio.current) audio.current.playbackRate = rate;
  }, [rate]);

  const play = useCallback((fromMs?: number) => {
    const a = audio.current;
    if (!a) return;
    if (fromMs !== undefined) a.currentTime = Math.max(0, fromMs / 1000);
    void a.play().catch(() => setNote({ text: "The browser wouldn't play the clip.", bad: true }));
  }, []);

  const pause = useCallback(() => audio.current?.pause(), []);

  /** Tap: the word at the cursor starts now. */
  const tap = useCallback(() => {
    const a = audio.current;
    if (!a || !tapping || cursor >= n) return;
    const at = Math.round(a.currentTime * 1000);
    setTimes((t) => {
      const next = t.slice(0, cursor);
      next[cursor] = Math.max(at, next[cursor - 1] ?? 0);
      return next;
    });
    setPulse((p) => p + 1);
    const nextCursor = cursor + 1;
    setCursor(nextCursor);
    if (nextCursor >= n) setTapping(false);
  }, [cursor, n, tapping]);

  /** From the first word: clears the timings and starts the clip. */
  const startTapping = () => {
    setTimes([]);
    setCursor(0);
    setSelected(null);
    setTapping(true);
    setNote(null);
    play(0);
    tapRef.current?.focus();
  };

  /** Keeps the timings before `i` and taps again from word `i`, a moment before it. */
  const retapFrom = (i: number) => {
    setTimes((t) => t.slice(0, i));
    setCursor(i);
    setTapping(true);
    setNote(null);
    play(i > 0 ? Math.max(0, times[i - 1] - 300) : 0);
    tapRef.current?.focus();
  };

  const nudge = (i: number, by: number) => {
    setTimes((t) => {
      if (t[i] === undefined) return t;
      const next = [...t];
      const lo = i > 0 ? next[i - 1] : 0;
      const hi = i + 1 < next.length ? next[i + 1] : durationMs;
      next[i] = Math.min(hi, Math.max(lo, next[i] + by));
      return next;
    });
  };

  const save = async () => {
    if (times.length !== n) return;
    setSaving(true);
    setNote(null);
    const r = await fetch("/api/admin/narration", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ story: storyId, lang, page, wordTimes: times }),
    }).catch(() => null);
    const b = r ? ((await r.json().catch(() => ({}))) as { error?: string }) : {};
    setSaving(false);
    if (!r?.ok) {
      setNote({ text: b.error ?? "Couldn't save.", bad: true });
      return;
    }
    setNote({ text: "Saved ✓ The words now light up on these times." });
    onSaved();
  };

  // Space taps while tapping (and plays/pauses otherwise); Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest("input,textarea,select")) return;
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        if (tapping) tap();
        else if (audio.current?.paused) play();
        else pause();
      } else if (e.key === "Escape") onClose();
      else if (selected !== null && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        nudge(selected, e.key === "ArrowLeft" ? -NUDGE : NUDGE);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // The word lit right now: by the taps so far.
  let lit = -1;
  for (let j = 0; j < times.length; j++) if (times[j] <= now) lit = j;
  const total = Math.max(1, durationMs);
  const x = (ms: number) => (ms / total) * 1000;

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-[#0B1030]/60 px-3 py-6" data-word-timer="">
      <section role="dialog" aria-modal="true" aria-label={`Time the words of page ${page + 1}`} className="relative max-h-full w-full max-w-3xl space-y-4 overflow-y-auto rounded-[28px] bg-[#FFFBF0] p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,.55)] sm:p-6">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-2xl text-muted hover:bg-black/5">
          ×
        </button>
        <div className="pr-10">
          <h2 className="font-display text-2xl font-black">Time the words · page {page + 1}</h2>
          <p className="text-sm text-muted">
            Press <b>Start tapping</b>, then tap <kbd className="rounded border border-line bg-white px-1.5">Space</kbd> or the big button at the
            start of each word. Pick a word to nudge it (← → or the buttons) or to re-tap from there.
          </p>
        </div>

        {/* the words, with the next one to tap and the one being heard */}
        <p className={`flex flex-wrap gap-1.5 rounded-2xl bg-paper p-3 text-lg leading-relaxed text-paper-ink ${lang === "am" ? "font-ethiopic" : ""}`} data-timer-words="">
          {words.map((w, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(selected === i ? null : i)}
              data-word={i}
              data-lit={i === lit ? "" : undefined}
              data-next={tapping && i === cursor ? "" : undefined}
              className={`rounded-lg px-1.5 transition-colors ${
                i === lit ? "bg-gold text-ink" : tapping && i === cursor ? "bg-teal/20 ring-2 ring-teal" : times[i] !== undefined ? "text-blue" : "text-muted"
              } ${selected === i ? "outline outline-2 outline-offset-1 outline-coral" : ""}`}
              title={times[i] !== undefined ? `${sec(times[i])} s` : "not timed yet"}
            >
              {w}
            </button>
          ))}
        </p>

        {/* the waveform with a mark at each word's start */}
        <svg
          viewBox="0 0 1000 90"
          preserveAspectRatio="none"
          className="h-24 w-full cursor-pointer rounded-2xl bg-white shadow-[inset_0_0_0_2px_var(--color-line)]"
          onClick={(e) => {
            const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
            const ms = ((e.clientX - r.left) / r.width) * total;
            if (audio.current) audio.current.currentTime = ms / 1000;
          }}
          data-timer-bar=""
          aria-label="The clip, with a mark at the start of each word"
        >
          {peaks.length > 0 ? (
            peaks.map((p, i) => {
              const h = Math.max(2, p * 70);
              return <rect key={i} x={(i / peaks.length) * 1000} y={45 - h / 2} width={1000 / peaks.length - 1} height={h} fill="#C9D6F2" />;
            })
          ) : (
            <rect x={0} y={42} width={1000} height={6} rx={3} fill="#E6DEC9" />
          )}
          {times.map((t, i) => (
            <g key={i} data-mark={i}>
              <line x1={x(t)} x2={x(t)} y1={6} y2={84} stroke={selected === i ? "#E8513B" : i === lit ? "#F5B21E" : "#2F5BD3"} strokeWidth={selected === i ? 4 : 2.5} vectorEffect="non-scaling-stroke" />
            </g>
          ))}
          <line x1={x(now)} x2={x(now)} y1={0} y2={90} stroke="#1B2A4E" strokeWidth={2} vectorEffect="non-scaling-stroke" data-playhead="" />
        </svg>
        <div className="flex justify-between text-xs tabular-nums text-muted">
          <span>{sec(now)} s</span>
          <span>
            {times.length} / {n} words timed
          </span>
          <span>{sec(durationMs)} s</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn btn-plain !py-2 !text-base" onClick={() => (playing ? pause() : play(now >= durationMs - 50 ? 0 : undefined))} data-timer="play">
            {playing ? "❚❚ Pause" : "▶ Play"}
          </button>
          <button type="button" className="btn btn-plain !py-2 !text-base" onClick={startTapping} data-timer="start">
            ⏱ Start tapping{times.length ? " again" : ""}
          </button>
          <label className="flex items-center gap-1 text-sm font-bold text-muted">
            Speed
            <select value={rate} onChange={(e) => setRate(Number(e.target.value))} className="rounded-lg border-2 border-line bg-white px-2 py-1">
              <option value={1}>1×</option>
              <option value={0.75}>0.75×</option>
              <option value={0.5}>0.5×</option>
            </select>
          </label>
        </div>

        <button
          ref={tapRef}
          type="button"
          key={pulse}
          disabled={!tapping}
          onPointerDown={(e) => {
            e.preventDefault();
            tap();
          }}
          onKeyDown={(e) => {
            // Space is handled once, by the page.
            if (e.key === " ") e.preventDefault();
          }}
          className={`grid h-28 w-full place-items-center rounded-[24px] font-display text-2xl font-black text-white transition disabled:opacity-40 ${tapping ? "narr-tapped bg-teal shadow-[0_6px_0_var(--color-teal-deep)]" : "bg-muted"}`}
          data-timer="tap"
        >
          {tapping ? (
            <span className={lang === "am" ? "font-ethiopic" : ""}>
              TAP · “{words[cursor]}” <span className="text-base font-bold opacity-80">({cursor + 1}/{n})</span>
            </span>
          ) : times.length === n ? (
            "All words timed ✓"
          ) : (
            "Press “Start tapping”"
          )}
        </button>

        {selected !== null && (
          <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-sky-soft p-3" data-timer-selected={selected}>
            <span className={`font-bold ${lang === "am" ? "font-ethiopic" : ""}`}>
              “{words[selected]}” {times[selected] !== undefined ? `at ${sec(times[selected])} s` : "(not timed yet)"}
            </span>
            <button type="button" className="rounded-xl border-2 border-line bg-white px-3 py-1 font-bold" disabled={times[selected] === undefined} onClick={() => nudge(selected, -NUDGE)} data-timer="earlier">
              −50 ms
            </button>
            <button type="button" className="rounded-xl border-2 border-line bg-white px-3 py-1 font-bold" disabled={times[selected] === undefined} onClick={() => nudge(selected, NUDGE)} data-timer="later">
              +50 ms
            </button>
            <button type="button" className="rounded-xl border-2 border-line bg-white px-3 py-1 font-bold" disabled={times[selected] === undefined} onClick={() => play(Math.max(0, times[selected] - 400))}>
              ▶ Hear it
            </button>
            <button type="button" className="rounded-xl border-2 border-teal bg-white px-3 py-1 font-bold text-teal" disabled={selected > times.length} onClick={() => retapFrom(selected)} data-timer="retap">
              ↺ Re-tap from here
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 border-t-2 border-line pt-4">
          <button type="button" className="btn btn-primary !text-base" disabled={times.length !== n || saving} onClick={() => void save()} data-timer="save">
            {saving ? "Saving…" : "Save timings"}
          </button>
          <button type="button" className="font-bold text-muted hover:text-ink" onClick={onClose}>
            Close
          </button>
          {times.length !== n && <span className="text-sm text-muted">Tap every word to save ({times.length} of {n}).</span>}
          {note && <span className={`text-sm font-bold ${note.bad ? "text-coral-deep" : "text-teal"}`}>{note.text}</span>}
        </div>
      </section>
    </div>
  );
}
