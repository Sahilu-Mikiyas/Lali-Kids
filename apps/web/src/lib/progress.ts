"use client";

import { useSyncExternalStore } from "react";

/**
 * Stars and finished stories, kept in this browser until accounts exist.
 * Accounts will move this to the server so progress follows the child across devices.
 */
type Progress = { stars: number; finished: Record<string, number> };

const KEY = "lali-progress-v1";
const EMPTY: Progress = { stars: 0, finished: {} };
const listeners = new Set<() => void>();
let cache: Progress | null = null;

function read(): Progress {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache!;
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function useStars(): number {
  return useSyncExternalStore(subscribe, () => read().stars, () => 0);
}

export function finishStory(id: string) {
  const p = read();
  cache = { stars: p.stars + 1, finished: { ...p.finished, [id]: (p.finished[id] ?? 0) + 1 } };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // Private windows can block storage; the reward still shows.
  }
  listeners.forEach((l) => l());
}
