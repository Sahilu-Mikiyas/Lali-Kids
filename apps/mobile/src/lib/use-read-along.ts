import * as Speech from 'expo-speech';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { Lang } from './store';

const SPEECH_LANG: Record<Lang, string> = { en: 'en-US', am: 'am-ET' };
const WORD_MS: Record<Lang, number> = { en: 430, am: 560 };

async function hasVoice(lang: Lang): Promise<boolean> {
  try {
    // Some browsers never answer when they have no voices, so don't wait long.
    const voices = await Promise.race([
      Speech.getAvailableVoicesAsync(),
      new Promise<Speech.Voice[]>((resolve) => setTimeout(() => resolve([]), 600)),
    ]);
    return voices.some((v) => v.language?.toLowerCase().startsWith(lang));
  } catch {
    return false;
  }
}

/**
 * Reads a page aloud and reports which word is being spoken.
 * Uses the device voice when one exists for the language, with word timing from
 * the speech engine. Otherwise it lights words up on a steady beat in silence.
 * Recorded narration with word timings will replace the device voice later.
 */
export function useReadAlong(text: string, lang: Lang) {
  const words = useMemo(() => text.split(' '), [text]);
  const offsets = useMemo(
    () => words.map((_, i) => words.slice(0, i).reduce((sum, w) => sum + w.length + 1, 0)),
    [words],
  );

  const [active, setActive] = useState(-1);
  const [reading, setReading] = useState(false);
  const [silent, setSilent] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (fallback.current) clearTimeout(fallback.current);
    timer.current = null;
    fallback.current = null;
  }, []);

  const stop = useCallback(() => {
    clearTimers();
    Speech.stop();
    setReading(false);
  }, [clearTimers]);

  const finish = useCallback(() => {
    clearTimers();
    setActive(words.length);
    setReading(false);
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

  const start = useCallback(async () => {
    stop();
    setReading(true);
    const voice = await hasVoice(lang);
    setSilent(!voice);
    if (!voice) {
      runBeat();
      return;
    }
    let gotBoundary = false;
    Speech.speak(text, {
      language: SPEECH_LANG[lang],
      rate: 0.85,
      pitch: 1.1,
      onBoundary: (e: { charIndex: number }) => {
        gotBoundary = true;
        if (timer.current) clearInterval(timer.current);
        let i = 0;
        for (let j = 0; j < offsets.length; j++) if (offsets[j] <= e.charIndex) i = j;
        setActive(i);
      },
      onDone: () => finish(),
    });
    // Some engines never report word boundaries; keep the highlight moving anyway.
    fallback.current = setTimeout(() => {
      if (!gotBoundary) runBeat();
    }, 800);
  }, [finish, lang, offsets, runBeat, stop, text]);

  const speakWord = useCallback(
    async (word: string) => {
      if (!(await hasVoice(lang))) return;
      Speech.stop();
      Speech.speak(word.replace(/[.,!?"«»።፣]/g, ''), { language: SPEECH_LANG[lang], rate: 0.8, pitch: 1.15 });
    },
    [lang],
  );

  // Stop talking when the page goes away. Callers remount this hook for each page.
  useEffect(() => stop, [stop]);

  return { words, active, reading, silent, start, stop, speakWord };
}
