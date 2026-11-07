"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Lang } from "@/content/stories";
import { duckAmbience } from "./ambient";

const WORD_MS: Record<Lang, number> = { en: 430, am: 560 };

function voiceFor(lang: Lang): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  return window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith(lang)) ?? null;
}

/** Whether the browser can say words out loud in this language. */
export function canSpeak(lang: Lang): boolean {
  return voiceFor(lang) !== null;
}

/** Optional timing for a recording: exact word starts (ms), and its length when the file can't say. */
export type ClipTiming = { wordTimes?: number[] | null; durationMs?: number | null };

/** The word lit at `ms` into a clip: from exact word starts, else spread across it by text length. */
export function wordAtMs(ms: number, durationMs: number, offsets: number[], textLength: number, wordTimes?: number[] | null): number {
  if (wordTimes && wordTimes.length === offsets.length && wordTimes.length > 0) {
    let i = 0;
    for (let j = 0; j < wordTimes.length; j++) if (wordTimes[j] <= ms) i = j;
    return i;
  }
  if (!(durationMs > 0)) return 0;
  const at = (ms / durationMs) * textLength;
  let i = 0;
  for (let j = 0; j < offsets.length; j++) if (offsets[j] <= at) i = j;
  return i;
}

/** The character offset where each word starts. */
export const wordOffsets = (words: string[]) => words.map((_, i) => words.slice(0, i).reduce((sum, w) => sum + w.length + 1, 0));

/**
 * Reads a page aloud and reports which word is being spoken.
 * Uses the browser's voice for the language when there is one, with word timing from
 * the speech engine; otherwise it lights words up on a steady beat in silence.
 * When the page has recorded narration, that plays instead and the highlight follows it: on the
 * exact start of each word when `timing.wordTimes` has one per word, otherwise spread over the
 * recording by word length.
 *
 * If the text changes while it is reading (the reader switched language), it carries on
 * reading the same page in the new language. The scene's soundscape dips while it reads.
 */
export function useReadAlong(text: string, lang: Lang, onFinish?: () => void, audioUrl?: string | null, timing?: ClipTiming) {
  const words = useMemo(() => text.split(" "), [text]);
  const offsets = useMemo(() => wordOffsets(words), [words]);
  const wordTimes = timing?.wordTimes ?? null;
  const knownMs = timing?.durationMs ?? null;

  // The highlighted word belongs to one text; a new text (language) starts unlit.
  const [lit, setLit] = useState<{ text: string; i: number }>({ text, i: -1 });
  const active = lit.text === text ? lit.i : -1;
  const [reading, setReading] = useState(false);
  const [silent, setSilent] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frame = useRef<number | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const snippet = useRef<HTMLAudioElement | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const finishRef = useRef(onFinish);
  useEffect(() => {
    finishRef.current = onFinish;
  }, [onFinish]);

  const clearTimers = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (fallback.current) clearTimeout(fallback.current);
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    timer.current = null;
    fallback.current = null;
    frame.current = null;
  }, []);

  /** Silence the voice and timers, but keep `reading` as it is. */
  const hush = useCallback(() => {
    clearTimers();
    if (utterance.current) {
      // Detach first, so a cancelled voice doesn't count as a finished page.
      utterance.current.onend = null;
      utterance.current.onboundary = null;
      utterance.current = null;
    }
    window.speechSynthesis?.cancel();
    if (audio.current) {
      audio.current.pause();
      audio.current.onended = null;
      audio.current.ontimeupdate = null;
      audio.current = null;
    }
    snippet.current?.pause();
    snippet.current = null;
  }, [clearTimers]);

  const stop = useCallback(() => {
    hush();
    setReading(false);
  }, [hush]);

  const finish = useCallback(() => {
    clearTimers();
    utterance.current = null;
    setLit({ text, i: words.length });
    setReading(false);
    finishRef.current?.();
  }, [clearTimers, text, words.length]);

  const runBeat = useCallback(() => {
    clearTimers();
    let i = 0;
    setLit({ text, i: 0 });
    timer.current = setInterval(() => {
      i += 1;
      if (i >= words.length) finish();
      else setLit({ text, i });
    }, WORD_MS[lang]);
  }, [clearTimers, finish, lang, text, words.length]);

  const start = useCallback(() => {
    stop();
    setReading(true);
    if (audioUrl) {
      const a = new Audio(audioUrl);
      audio.current = a;
      setSilent(false);
      setLit({ text, i: 0 });
      // Every frame while it plays, so words light up on their exact start times.
      const follow = () => {
        if (audio.current !== a) return;
        const total = Number.isFinite(a.duration) && a.duration > 0 ? a.duration * 1000 : (knownMs ?? 0);
        const i = wordAtMs(a.currentTime * 1000, total, offsets, text.length, wordTimes);
        setLit((l) => (l.text === text && l.i === i ? l : { text, i }));
        frame.current = requestAnimationFrame(follow);
      };
      a.onplaying = () => {
        if (frame.current === null) frame.current = requestAnimationFrame(follow);
      };
      a.onended = () => {
        audio.current = null;
        finish();
      };
      a.play().catch(() => runBeat());
      return;
    }
    const voice = voiceFor(lang);
    setSilent(!voice);
    if (!voice) {
      runBeat();
      return;
    }
    let gotBoundary = false;
    const u = new SpeechSynthesisUtterance(text);
    utterance.current = u;
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = 0.85;
    u.pitch = 1.1;
    u.onboundary = (e) => {
      if (e.name && e.name !== "word") return;
      gotBoundary = true;
      if (timer.current) clearInterval(timer.current);
      let i = 0;
      for (let j = 0; j < offsets.length; j++) if (offsets[j] <= e.charIndex) i = j;
      setLit({ text, i });
    };
    u.onend = () => {
      if (gotBoundary) finish();
    };
    window.speechSynthesis.speak(u);
    // Some engines never report word boundaries; keep the highlight moving anyway.
    fallback.current = setTimeout(() => {
      if (!gotBoundary) runBeat();
    }, 800);
  }, [audioUrl, finish, knownMs, lang, offsets, runBeat, stop, text, wordTimes]);

  const speakWord = useCallback(
    (word: string, index?: number) => {
      // With timed narration, a tapped word is said in the narrator's own voice.
      if (audioUrl && wordTimes && index !== undefined && wordTimes.length === words.length && index >= 0 && index < words.length) {
        if (reading) stop();
        snippet.current?.pause();
        const a = new Audio(audioUrl);
        snippet.current = a;
        const from = wordTimes[index] / 1000;
        const to = index + 1 < wordTimes.length ? wordTimes[index + 1] / 1000 : from + 1.2;
        const cut = () => {
          if (snippet.current !== a) return;
          if (a.currentTime >= to - 0.02) {
            a.pause();
            return;
          }
          requestAnimationFrame(cut);
        };
        a.preload = "auto";
        a.onloadedmetadata = () => {
          a.currentTime = from;
          a.play().catch(() => {});
        };
        a.onplaying = () => requestAnimationFrame(cut);
        return;
      }
      const voice = voiceFor(lang);
      if (!voice) return;
      if (reading) stop();
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word.replace(/[.,!?"«»።፣፤]/g, ""));
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = 0.8;
      window.speechSynthesis.speak(u);
    },
    [audioUrl, lang, reading, stop, wordTimes, words.length],
  );

  // A language switch while reading: let the words cross-fade, then read on in the new language.
  const readingRef = useRef(false);
  const lastText = useRef(text);
  useEffect(() => {
    readingRef.current = reading;
  }, [reading]);
  useEffect(() => {
    if (lastText.current === text) return;
    lastText.current = text;
    if (!readingRef.current) return;
    // Still "reading" while the words cross-fade, so the Stop button stays put.
    hush();
    const id = setTimeout(() => {
      if (readingRef.current) start();
    }, 380);
    return () => clearTimeout(id);
  }, [text, start, hush]);

  // The soundscape dips under the voice.
  useEffect(() => {
    if (!reading) return;
    duckAmbience(true);
    return () => duckAmbience(false);
  }, [reading]);

  // Stop talking when the page goes away. Callers remount this hook for each page.
  useEffect(() => stop, [stop]);

  return { words, active, reading, silent, start, stop, speakWord };
}
