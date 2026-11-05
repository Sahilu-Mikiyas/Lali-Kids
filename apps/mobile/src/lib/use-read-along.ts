import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { Lang } from './api';

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
 * When the page has recorded narration, that plays and the highlight follows it, spread over the
 * recording by text length (the same way the website does). Otherwise it uses the device voice
 * when there is one for the language, with word timing from the speech engine, or lights the
 * words up on a steady beat in silence.
 */
export function useReadAlong(text: string, lang: Lang, audioUrl?: string | null) {
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
  const player = useRef<AudioPlayer | null>(null);

  const clearTimers = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (fallback.current) clearTimeout(fallback.current);
    timer.current = null;
    fallback.current = null;
  }, []);

  const dropPlayer = useCallback(() => {
    const p = player.current;
    player.current = null;
    if (!p) return;
    try {
      p.pause();
      p.remove();
    } catch {
      // Already gone.
    }
  }, []);

  const stop = useCallback(() => {
    clearTimers();
    dropPlayer();
    Speech.stop();
    setReading(false);
  }, [clearTimers, dropPlayer]);

  const finish = useCallback(() => {
    clearTimers();
    dropPlayer();
    setActive(words.length);
    setReading(false);
  }, [clearTimers, dropPlayer, words.length]);

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

  const wordAt = useCallback(
    (charIndex: number) => {
      let i = 0;
      for (let j = 0; j < offsets.length; j++) if (offsets[j] <= charIndex) i = j;
      return i;
    },
    [offsets],
  );

  const playRecording = useCallback(
    (url: string) => {
      setSilent(false);
      setActive(0);
      let started = false;
      try {
        const p = createAudioPlayer({ uri: url }, { updateInterval: 120 });
        player.current = p;
        p.addListener('playbackStatusUpdate', (status) => {
          if (player.current !== p) return;
          if (status.duration > 0 && status.currentTime > 0) {
            started = true;
            setActive(wordAt((status.currentTime / status.duration) * text.length));
          }
          if (status.didJustFinish) finish();
        });
        p.play();
      } catch {
        runBeat();
        return;
      }
      // A recording that never starts (bad link, no connection) falls back to the beat.
      fallback.current = setTimeout(() => {
        if (!started && player.current) {
          dropPlayer();
          runBeat();
        }
      }, 6000);
    },
    [dropPlayer, finish, runBeat, text.length, wordAt],
  );

  const start = useCallback(async () => {
    stop();
    setReading(true);
    if (audioUrl) {
      playRecording(audioUrl);
      return;
    }
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
        setActive(wordAt(e.charIndex));
      },
      onDone: () => finish(),
    });
    // Some engines never report word boundaries; keep the highlight moving anyway.
    fallback.current = setTimeout(() => {
      if (!gotBoundary) runBeat();
    }, 800);
  }, [audioUrl, finish, lang, playRecording, runBeat, stop, text, wordAt]);

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

  return { words, active, reading, silent, recorded: Boolean(audioUrl), start, stop, speakWord };
}
