"use client";

import { useSyncExternalStore } from "react";

import { appAuthHeaders, tellApp } from "@/lib/in-app";
import { cleanPosition, EMPTY_BASIS, localDay, type StickerBasis, type StickerPosition } from "./catalog";

/*
  Stickers and Find Lali in the browser.

  Signed-out visitors keep everything in localStorage. For a signed-in child the server is the
  record (finished stories from `completions`, finds and positions from their own tables), read
  once per page load from /api/stickers; changes are shown at once and sent in the background.
  If the server can't keep them (tables not there yet), the child simply sees what's on screen.
*/

const KEY = "lali-stickers-v1";
const HINTS_KEY = "lali-find-hints";

type Mode = "unknown" | "local" | "server";

let mode: Mode = "unknown";
let local: StickerBasis | null = null;
let server: StickerBasis | null = null;
let syncing: Promise<Mode> | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function readLocal(): StickerBasis {
  if (local) return local;
  try {
    const raw = window.localStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as Partial<StickerBasis>) : {};
    local = {
      finished: Array.isArray(v.finished) ? v.finished.filter((s) => typeof s === "string") : [],
      days: Array.isArray(v.days) ? v.days.filter((s) => typeof s === "string") : [],
      finds: v.finds && typeof v.finds === "object" ? v.finds : {},
      positions: v.positions && typeof v.positions === "object" ? v.positions : {},
    };
  } catch {
    local = { ...EMPTY_BASIS };
  }
  return local;
}

function writeLocal(next: StickerBasis) {
  local = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private windows can block storage; the sticker still shows until the page closes.
  }
}

/** The record stickers are worked out from right now. */
export function currentBasis(): StickerBasis {
  if (typeof window === "undefined") return EMPTY_BASIS;
  return mode === "server" && server ? server : readLocal();
}

function update(change: (b: StickerBasis) => StickerBasis) {
  if (mode === "server" && server) server = change(server);
  else writeLocal(change(readLocal()));
  emit();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

export function useStickerBasis(): StickerBasis {
  return useSyncExternalStore(subscribe, currentBasis, () => EMPTY_BASIS);
}

/** Whether the server keeps this child's stickers ("server"), the browser does ("local"), or we don't know yet. */
export function useStickerMode(): Mode {
  return useSyncExternalStore(subscribe, () => mode, () => "unknown" as Mode);
}

/** Asks the server once per page load whether a signed-in child is reading. */
export function syncStickers(): Promise<Mode> {
  if (syncing) return syncing;
  syncing = fetch("/api/stickers", { headers: appAuthHeaders(), cache: "no-store" })
    .then((r) => (r.ok ? r.json() : null))
    .then((body: { signedIn?: boolean; childId?: string | null; basis?: StickerBasis } | null) => {
      if (body?.signedIn && body.childId && body.basis) {
        server = { ...EMPTY_BASIS, ...body.basis };
        mode = "server";
      } else mode = "local";
      emit();
      return mode;
    })
    .catch(() => {
      mode = "local";
      emit();
      return mode;
    });
  return syncing;
}

/** For the sticker book page, which already has the signed-in child's record from the server. */
export function adoptServerBasis(basis: StickerBasis | null) {
  if (typeof window !== "undefined" && basis && mode !== "server") {
    server = basis;
    mode = "server";
    syncing = Promise.resolve(mode);
  }
}

function send(method: "POST" | "PATCH", body: unknown) {
  if (mode !== "server") return;
  fetch("/api/stickers", { method, headers: { "Content-Type": "application/json", ...appAuthHeaders() }, body: JSON.stringify(body) }).catch(() => {});
}

/** The story reached The End. (Signed-in children's finishes are saved by the reader as before.) */
export function recordFinish(storyId: string) {
  const day = localDay();
  update((b) => ({
    ...b,
    finished: b.finished.includes(storyId) ? b.finished : [...b.finished, storyId],
    days: b.days.includes(day) ? b.days : [...b.days, day],
  }));
}

/** Lali was found on this page. */
export function recordFind(storyId: string, page: number) {
  const had = currentBasis().finds[storyId] ?? [];
  if (!had.includes(page)) update((b) => ({ ...b, finds: { ...b.finds, [storyId]: [...(b.finds[storyId] ?? []), page] } }));
  send("POST", { storyId, page });
  tellApp({ type: "lali:found", storyId, page });
}

/** The child stuck a sticker somewhere in the album. */
export function placeSticker(stickerId: string, pos: StickerPosition) {
  const p = cleanPosition(pos);
  if (!p) return;
  update((b) => ({ ...b, positions: { ...b.positions, [stickerId]: p } }));
  send("PATCH", { stickerId, ...p });
}

/* ---------- the Find Lali hint (a grown-up's setting, kept in this browser) ---------- */

const hintListeners = new Set<() => void>();
function readHints(): boolean {
  try {
    return window.localStorage.getItem(HINTS_KEY) !== "off";
  } catch {
    return true;
  }
}
export function setFindHints(on: boolean) {
  try {
    window.localStorage.setItem(HINTS_KEY, on ? "on" : "off");
  } catch {
    // Storage blocked: the setting lasts until the page closes.
  }
  hintListeners.forEach((l) => l());
}
export function useFindHints(): boolean {
  return useSyncExternalStore(
    (l) => {
      hintListeners.add(l);
      return () => {
        hintListeners.delete(l);
      };
    },
    readHints,
    () => true,
  );
}
