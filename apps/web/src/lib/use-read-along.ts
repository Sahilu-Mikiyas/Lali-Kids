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

/**
 * Reads a page aloud and reports which word is being spoken.
 * Uses the browser's voice for the language when there is one, with word timing from
 * the speech engine; otherwise it lights words up on a steady beat in silence.
 * When the page has recorded narration, that plays instead and the highlight follows it,
 * spread over the recording by word length (exact word timings can replace this later).
 *
 * If the text changes while it is reading (the reader switched language), it carries on
 * reading the same page in the new language. The scene's soundscape dips while it reads.
 */
export function useReadAlong(text: string, lang: Lang, onFinish?: () => void, audioUrl?: string | null) {
  const words = useMemo(() => text.split(" "), [text]);
  const offsets = useMemo(() => words.map((_, i) => words.slice(0, i).reduce((sum, w) => sum + w.length + 1, 0)), [words]);

  // The highlighted word belongs to one text; a new text (language) starts unlit.
  const [lit, setLit] = useState<{ text: string; i: number }>({ text, i: -1 });
  const active = lit.text === text ? lit.i : -1;
  const [reading, setReading] = useState(false);
  const [silent, setSilent] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const finishRef = useRef(onFinish);
  useEffect(() => {
    finishRef.current = onFinish;
  }, [onFinish]);

  const clearTimers = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (fallback.current) clearTimeout(fallback.current);
    timer.current = null;
    fallback.current = null;
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
      a.ontimeupdate = () => {
        if (!a.duration) return;
        const at = (a.currentTime / a.duration) * text.length;
        let i = 0;
        for (let j = 0; j < offsets.length; j++) if (offsets[j] <= at) i = j;
        setLit({ text, i });
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
  }, [audioUrl, finish, lang, offsets, runBeat, stop, text]);

  const speakWord = useCallback(
    (word: string) => {
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
    [lang, reading, stop],
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
