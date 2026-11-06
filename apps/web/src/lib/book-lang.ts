"use client";

import { useSyncExternalStore } from "react";

import type { Lang } from "@/content/stories";

/*
  The language each child last read in, remembered in this browser. The child is the one
  chosen on the stories page (the "lali-child" cookie); without one, it is kept for "guest".
*/

const listeners = new Set<() => void>();
const cache = new Map<string, Lang | null>();

function childKey(): string {
  const m = document.cookie.match(/(?:^|;\s*)lali-child=([^;]+)/);
  return `lali-book-lang:${m ? decodeURIComponent(m[1]) : "guest"}`;
}

function read(): Lang | null {
  const key = childKey();
  if (cache.has(key)) return cache.get(key)!;
  let v: Lang | null = null;
  try {
    const raw = window.localStorage.getItem(key);
    v = raw === "en" || raw === "am" ? raw : null;
  } catch {
    v = null;
  }
  cache.set(key, v);
  return v;
}

/** The current child's last book language, or null if they haven't chosen one here yet. */
export function useBookLang(): Lang | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
    read,
    () => null,
  );
}

export function rememberBookLang(lang: Lang) {
  const key = childKey();
  cache.set(key, lang);
  try {
    window.localStorage.setItem(key, lang);
  } catch {
    // Private windows can block storage; the choice lasts until the page closes.
  }
  listeners.forEach((l) => l());
}
