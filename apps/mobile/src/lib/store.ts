import { useSyncExternalStore } from 'react';

import { readItem, writeItem } from './storage';

export type Lang = 'en' | 'am';

type State = {
  stars: number;
  /** Times each story has been finished, by story id. */
  finished: Record<string, number>;
  bedtime: boolean;
  lang: Lang;
  /** Stories allowed per night. 0 means no limit. */
  nightlyLimit: number;
  tonight: { date: string; count: number };
};

const KEY = 'lali-state-v1';

const initial: State = {
  stars: 0,
  finished: {},
  bedtime: false,
  lang: 'en',
  nightlyLimit: 3,
  tonight: { date: '', count: 0 },
};

function load(): State {
  const raw = readItem(KEY);
  if (!raw) return initial;
  try {
    return { ...initial, ...JSON.parse(raw) };
  } catch {
    return initial;
  }
}

let state: State | null = null;
const listeners = new Set<() => void>();

function current(): State {
  if (!state) state = load();
  return state;
}

function update(fn: (s: State) => State) {
  state = fn(current());
  writeItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Select a primitive or stable value from the store. */
export function useAppState<T>(select: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => select(current()), () => select(initial));
}

export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function storiesTonight(s: State): number {
  return s.tonight.date === today() ? s.tonight.count : 0;
}

export function isLimitReached(s: State): boolean {
  return s.nightlyLimit > 0 && storiesTonight(s) >= s.nightlyLimit;
}

export const actions = {
  finishStory(id: string) {
    update((s) => ({
      ...s,
      stars: s.stars + 1,
      finished: { ...s.finished, [id]: (s.finished[id] ?? 0) + 1 },
      tonight: { date: today(), count: storiesTonight(s) + 1 },
    }));
  },
  setLang(lang: Lang) {
    update((s) => ({ ...s, lang }));
  },
  toggleBedtime() {
    update((s) => ({ ...s, bedtime: !s.bedtime }));
  },
  setNightlyLimit(nightlyLimit: number) {
    update((s) => ({ ...s, nightlyLimit }));
  },
  unlockTonight() {
    update((s) => ({ ...s, tonight: { date: today(), count: 0 } }));
  },
  resetProgress() {
    update((s) => ({ ...initial, lang: s.lang, bedtime: s.bedtime, nightlyLimit: s.nightlyLimit }));
  },
};
