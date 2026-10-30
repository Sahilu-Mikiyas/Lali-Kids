"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Lang } from "@/content/stories";

const WORD_MS: Record<Lang, number> = { en: 430, am: 560 };

function voiceFor(lang: Lang): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  return window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith(lang)) ?? null;
}

/**
 * Reads a page aloud and reports which word is being spoken.
 * Uses the browser's voice for the language when there is one, with word timing from
 * the speech engine; otherwise it lights words up on a steady beat in silence.
 * Recorded narration with word timings will replace the browser voice.
 */
export function useReadAlong(text: string, lang: Lang, onFinish?: () => void) {
  const words = useMemo(() => text.split(" "), [text]);
  const offsets = useMemo(() => words.map((_, i) => words.slice(0, i).reduce((sum, w) => sum + w.length + 1, 0)), [words]);

  const [active, setActive] = useState(-1);
  const [reading, setReading] = useState(false);
  const [silent, setSilent] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const stop = useCallback(() => {
    clearTimers();
    window.speechSynthesis?.cancel();
    setReading(false);
  }, [clearTimers]);

  const finish = useCallback(() => {
    clearTimers();
    setActive(words.length);
    setReading(false);
    finishRef.current?.();
  }, [clearTimers, words.length]);

  const runBeat = useCallback(() => {
    clearTimers();
    let i = 0;
    setActive(0);
    timer.current = setInterval(() => {
      i += 1;
      if (i >= words.length) finish();
      else setActive(i);
    }, WORD_MS[lang]);
  }, [clearTimers, finish, lang, words.length]);

  const start = useCallback(() => {
    stop();
    setReading(true);
    const voice = voiceFor(lang);
    setSilent(!voice);
    if (!voice) {
      runBeat();
      return;
    }
    let gotBoundary = false;
    const u = new SpeechSynthesisUtterance(text);
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
      setActive(i);
    };
    u.onend = () => {
      if (gotBoundary) finish();
    };
    window.speechSynthesis.speak(u);
    // Some engines never report word boundaries; keep the highlight moving anyway.
    fallback.current = setTimeout(() => {
      if (!gotBoundary) runBeat();
    }, 800);
  }, [finish, lang, offsets, runBeat, stop, text]);

  const speakWord = useCallback(
    (word: string) => {
      const voice = voiceFor(lang);
      if (!voice) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word.replace(/[.,!?"«»።፣]/g, ""));
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = 0.8;
      window.speechSynthesis.speak(u);
    },
    [lang],
  );

  // Stop talking when the page goes away. Callers remount this hook for each page.
  useEffect(() => stop, [stop]);

  return { words, active, reading, silent, start, stop, speakWord };
}
