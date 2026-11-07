"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Lang } from "@/content/stories";
import { duckAmbience } from "@/lib/ambient";
import { wordAtMs, wordOffsets } from "@/lib/use-read-along";
import { RECORDING_TYPES } from "@/lib/voices/shared";
import { canRecord, recognitionCtor, type SpeechRecognitionLike, type SpeechResultEvent } from "./client";
import { align, countable, heardWords, pageTargets } from "./match";

/*
  "I'll read!": the child reads the page aloud.

  listen  (a grown-up turned on "Listen to my child read" and the browser has speech recognition)
          Words light up as the child says them; enough of the page read earns a reader star.
  record  (everywhere else, and whenever the speech service can't be used)
          The child's voice is recorded on this device only, never uploaded, then played back
          with the words lighting up across the recording; then a "Well read!" star.

  The microphone is asked for only after a friendly line on the first tap. Nothing here is ever
  negative: missed words just wiggle gently ("try this one") and can be tapped to hear them.
*/

export type MicMode = "listen" | "record";
export type MicPhase = "idle" | "explain" | "listening" | "paused" | "recording" | "playback" | "celebrate" | "tooShort" | "denied" | "nomic";

const MAX_RECORD_MS = 60_000;
const MAX_LISTEN_MS = 90_000;
const MAX_RESTARTS = 8;
/** Once enough is read, a moment more to finish the sentence before the celebration. */
const SETTLE_MS = 1400;

/** Asked once per visit: after a grown-up or child said yes, the friendly line isn't repeated. */
let explained = false;

async function micGranted(): Promise<"granted" | "denied" | "prompt"> {
  try {
    const p = await navigator.permissions?.query({ name: "microphone" as PermissionName });
    return (p?.state as "granted" | "denied" | "prompt") ?? "prompt";
  } catch {
    return "prompt";
  }
}

function pickType(): string {
  if (typeof MediaRecorder === "undefined") return "";
  return RECORDING_TYPES.find((t) => MediaRecorder.isTypeSupported?.(t)) ?? "";
}

export function useMicReader({
  text,
  lang,
  live,
  wantListen,
  threshold,
  onRead,
  names,
}: {
  text: string;
  lang: Lang;
  /** The page is open in front of the child; everything stops when it isn't. */
  live: boolean;
  /** The grown-up's choice to use the browser's speech service. */
  wantListen: boolean;
  /** Share of the page that counts as read (0.6 or 0.7). */
  threshold: number;
  /** The page was read aloud: once per page and visit. */
  onRead: (how: "listened" | "recorded") => void;
  /** Words of the page that are the child's own name ({name} in the story): any try counts. */
  names?: ReadonlySet<number>;
}) {
  const words = useMemo(() => text.split(" "), [text]);
  const targets = useMemo(() => pageTargets(words, lang), [words, lang]);
  const offsets = useMemo(() => wordOffsets(words), [words]);
  const need = Math.max(1, countable(targets));

  const [phase, setPhase] = useState<MicPhase>("idle");
  const [fellBack, setFellBack] = useState(false);
  const mode: MicMode = wantListen && !fellBack && recognitionCtor() ? "listen" : "record";
  const [heard, setHeard] = useState<Set<number>>(() => new Set());
  const [playIndex, setPlayIndex] = useState(-1);
  const [elapsed, setElapsed] = useState(0);

  const heardRef = useRef<Set<number>>(new Set());
  const cursor = useRef(0);
  const rec = useRef<SpeechRecognitionLike | null>(null);
  const active = useRef(false);
  const restarts = useRef(0);
  const listenStart = useRef(0);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const clip = useRef<{ url: string; durationMs: number } | null>(null);
  const player = useRef<HTMLAudioElement | null>(null);
  const frame = useRef<number | null>(null);
  const rewarded = useRef(false);
  const onReadRef = useRef(onRead);
  const namesRef = useRef(names);
  useEffect(() => {
    onReadRef.current = onRead;
    namesRef.current = names;
  }, [onRead, names]);

  const reached = (n: number) => n / need >= threshold;

  /* ---------- letting go of everything ---------- */

  const stopRecognition = useCallback(() => {
    active.current = false;
    if (settle.current) clearTimeout(settle.current);
    settle.current = null;
    const r = rec.current;
    rec.current = null;
    if (r) {
      r.onresult = null;
      r.onerror = null;
      r.onend = null;
      try {
        r.abort();
      } catch {
        // already stopped
      }
    }
  }, []);

  const releaseMic = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.ondataavailable = null;
      recorder.current.onstop = null;
      recorder.current.stop();
    }
    recorder.current = null;
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
  }, []);

  const stopPlayback = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    if (player.current) {
      player.current.onended = null;
      player.current.pause();
    }
    player.current = null;
  }, []);

  const dropClip = useCallback(() => {
    if (clip.current) URL.revokeObjectURL(clip.current.url);
    clip.current = null;
  }, []);

  const resetWords = useCallback(() => {
    heardRef.current = new Set();
    cursor.current = 0;
    setHeard(new Set());
    setPlayIndex(-1);
  }, []);

  /** Lets go of the microphone, the recogniser, playback and the recording (no re-render). */
  const release = useCallback(() => {
    stopRecognition();
    releaseMic();
    stopPlayback();
    dropClip();
    heardRef.current = new Set();
    cursor.current = 0;
    rewarded.current = false;
  }, [dropClip, releaseMic, stopPlayback, stopRecognition]);

  /** Back to the "I'll read!" button. */
  const close = useCallback(() => {
    release();
    resetWords();
    setPhase("idle");
  }, [release, resetWords]);

  const celebrate = useCallback(
    (how: "listened" | "recorded") => {
      setPhase("celebrate");
      if (!rewarded.current) {
        rewarded.current = true;
        onReadRef.current(how);
      }
    },
    [],
  );

  /* ---------- listening with speech recognition ---------- */

  const finishListening = useCallback(() => {
    const n = heardRef.current.size;
    stopRecognition();
    if (reached(n)) celebrate("listened");
    else setPhase("paused");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celebrate, stopRecognition, need, threshold]);

  // Defined below; the recogniser falls back to recording when the speech service can't be used.
  const startRecordingRef = useRef<() => void>(() => {});

  const startListening = useCallback(() => {
    const R = recognitionCtor();
    if (!R) {
      setFellBack(true);
      startRecordingRef.current();
      return;
    }
    stopRecognition();
    const r = new R();
    rec.current = r;
    r.lang = lang === "am" ? "am-ET" : "en-US";
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 3;
    active.current = true;
    restarts.current = 0;
    listenStart.current = performance.now();

    r.onresult = (e: SpeechResultEvent) => {
      if (rec.current !== r) return;
      const add: number[] = [];
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        let best = { hits: [] as number[], next: cursor.current };
        for (let a = 0; a < res.length; a++) {
          const tries = [align(targets, heardWords(res[a].transcript, lang), lang, cursor.current, namesRef.current)];
          // Started the page again from the top? Line it up from the first word too.
          if (cursor.current > 0) tries.push(align(targets, heardWords(res[a].transcript, lang), lang, 0, namesRef.current));
          for (const t of tries) if (t.hits.filter((h) => !heardRef.current.has(h)).length > best.hits.filter((h) => !heardRef.current.has(h)).length) best = t;
        }
        add.push(...best.hits);
        if (res.isFinal) cursor.current = Math.max(cursor.current, best.next);
      }
      const fresh = add.filter((h) => !heardRef.current.has(h));
      if (fresh.length) {
        const next = new Set(heardRef.current);
        fresh.forEach((h) => next.add(h));
        heardRef.current = next;
        setHeard(next);
      }
      const n = heardRef.current.size;
      if (n >= need) finishListening();
      else if (reached(n) && !settle.current) settle.current = setTimeout(finishListening, SETTLE_MS);
    };
    r.onerror = (e) => {
      if (rec.current !== r) return;
      const err = e.error;
      if (err === "no-speech" || err === "aborted") return; // onend restarts or settles
      if (err === "audio-capture") {
        stopRecognition();
        setPhase("nomic");
        return;
      }
      stopRecognition();
      if (err === "not-allowed") {
        // Either the microphone is blocked, or this browser/web view won't let pages use its speech service.
        void micGranted().then((state) => {
          if (state === "denied") setPhase("denied");
          else {
            setFellBack(true);
            startRecordingRef.current();
          }
        });
        return;
      }
      // network, service-not-allowed, language-not-supported…: record on the device instead.
      setFellBack(true);
      startRecordingRef.current();
    };
    r.onend = () => {
      if (rec.current !== r || !active.current) return;
      // Recognition stops after a silence; keep listening for a while, then rest.
      const longEnough = performance.now() - listenStart.current > MAX_LISTEN_MS;
      if (reached(heardRef.current.size)) finishListening();
      else if (restarts.current < MAX_RESTARTS && !longEnough) {
        restarts.current += 1;
        try {
          r.start();
        } catch {
          finishListening();
        }
      } else finishListening();
    };
    try {
      r.start();
      setPhase("listening");
    } catch {
      setFellBack(true);
      startRecordingRef.current();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishListening, lang, need, stopRecognition, targets, threshold]);

  /* ---------- recording on the device, then listening back ---------- */

  const playBack = useCallback(() => {
    const c = clip.current;
    if (!c) return;
    stopPlayback();
    const a = new Audio(c.url);
    player.current = a;
    setPlayIndex(0);
    setPhase("playback");
    const follow = () => {
      if (player.current !== a) return;
      const total = Number.isFinite(a.duration) && a.duration > 0 ? a.duration * 1000 : c.durationMs;
      setPlayIndex(wordAtMs(a.currentTime * 1000, total, offsets, text.length));
      frame.current = requestAnimationFrame(follow);
    };
    a.onplaying = () => {
      if (frame.current === null) frame.current = requestAnimationFrame(follow);
    };
    a.onended = () => {
      stopPlayback();
      setPlayIndex(words.length);
      celebrate("recorded");
    };
    a.play().catch(() => {
      stopPlayback();
      setPlayIndex(words.length);
      celebrate("recorded");
    });
  }, [celebrate, offsets, stopPlayback, text.length, words.length]);

  const stopRecording = useCallback(() => {
    if (recorder.current && recorder.current.state !== "inactive") recorder.current.stop();
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
  }, []);

  const startRecording = useCallback(async () => {
    stopPlayback();
    dropClip();
    setPlayIndex(-1);
    if (!canRecord()) {
      setPhase("nomic");
      return;
    }
    try {
      if (!stream.current) stream.current = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (e) {
      const name = (e as { name?: string })?.name;
      setPhase(name === "NotAllowedError" || name === "SecurityError" ? "denied" : "nomic");
      return;
    }
    const type = pickType();
    let r: MediaRecorder;
    try {
      r = new MediaRecorder(stream.current, type ? { mimeType: type, audioBitsPerSecond: 48_000 } : undefined);
    } catch {
      r = new MediaRecorder(stream.current);
    }
    recorder.current = r;
    const chunks: Blob[] = [];
    const t0 = performance.now();
    r.ondataavailable = (e) => {
      if (e.data.size) chunks.push(e.data);
    };
    r.onstop = () => {
      const durationMs = Math.min(MAX_RECORD_MS, performance.now() - t0);
      recorder.current = null;
      // The microphone goes off as soon as the reading is done.
      stream.current?.getTracks().forEach((t) => t.stop());
      stream.current = null;
      const blob = new Blob(chunks, { type: r.mimeType || type || "audio/webm" });
      if (durationMs < 900 || blob.size === 0) {
        setPhase("tooShort");
        return;
      }
      // Kept in this tab's memory only, and let go when the page turns.
      clip.current = { url: URL.createObjectURL(blob), durationMs };
      playBack();
    };
    r.start(250);
    setElapsed(0);
    setPhase("recording");
    tick.current = setInterval(() => {
      const ms = performance.now() - t0;
      setElapsed(ms);
      if (ms >= MAX_RECORD_MS) stopRecording();
    }, 200);
  }, [dropClip, playBack, stopPlayback, stopRecording]);

  useEffect(() => {
    startRecordingRef.current = () => void startRecording();
  }, [startRecording]);

  /* ---------- what the buttons do ---------- */

  const go = useCallback(() => {
    resetWords();
    rewarded.current = false;
    if (mode === "listen") startListening();
    else void startRecording();
  }, [mode, resetWords, startListening, startRecording]);

  /** "I'll read!": a friendly line first, unless the microphone is already allowed. */
  const begin = useCallback(async () => {
    if (explained) {
      go();
      return;
    }
    const state = await micGranted();
    if (state === "granted") {
      explained = true;
      go();
    } else setPhase("explain");
  }, [go]);

  /** "Let's go!" after the friendly line: now the browser asks. */
  const allow = useCallback(() => {
    explained = true;
    go();
  }, [go]);

  /** "Keep reading" after a pause: carries on, keeping the words already read. */
  const keepGoing = useCallback(() => {
    if (mode === "listen") startListening();
    else void startRecording();
  }, [mode, startListening, startRecording]);

  /** "I'm done" while listening or recording. */
  const done = useCallback(() => {
    if (phase === "listening") finishListening();
    else if (phase === "recording") stopRecording();
    else if (phase === "playback") {
      stopPlayback();
      setPlayIndex(words.length);
      celebrate("recorded");
    }
  }, [celebrate, finishListening, phase, stopPlayback, stopRecording, words.length]);

  // The page closed or turned, or the language changed: stop listening, recording and playback,
  // forget the recording, and start the page afresh.
  const [shown, setShown] = useState({ text, live });
  if (shown.text !== text || shown.live !== live) {
    setShown({ text, live });
    if (shown.text !== text || !live) {
      setPhase("idle");
      setHeard(new Set());
      setPlayIndex(-1);
    }
  }
  useEffect(() => {
    if (!live) release();
  }, [live, release]);
  useEffect(() => release, [release, text]);

  // The soundscape dips while the child reads or listens back.
  const busy = phase === "listening" || phase === "recording" || phase === "playback";
  useEffect(() => {
    if (!busy) return;
    duckAmbience(true);
    return () => duckAmbience(false);
  }, [busy]);

  /** Words skipped so far (before the furthest word heard), or every word left once paused. Up to three wiggle at a time. */
  const missed = useMemo(() => {
    if (mode !== "listen" || !(phase === "listening" || phase === "paused" || phase === "celebrate")) return [] as number[];
    const furthest = heard.size ? Math.max(...heard) : -1;
    const upTo = phase === "listening" ? furthest : targets.length;
    const out: number[] = [];
    for (let i = 0; i < upTo && out.length < 3; i++) if (targets[i] && !heard.has(i)) out.push(i);
    return out;
  }, [heard, mode, phase, targets]);

  return {
    mode,
    phase,
    heard,
    missed,
    /** While listening back to a recording: the word being said. */
    playIndex: phase === "playback" ? playIndex : -1,
    progress: Math.min(1, heard.size / need),
    goal: threshold,
    elapsed,
    maxMs: MAX_RECORD_MS,
    hasClip: () => clip.current !== null,
    begin,
    allow,
    keepGoing,
    done,
    playBack,
    again: go,
    close,
  };
}

export type MicReader = ReturnType<typeof useMicReader>;
