import { useSyncExternalStore } from 'react';

import { bundledShelf } from '@/content/stories';
import { api, isApiError, type ShelfStory } from './api';
import { createDownloads, createWaitList, type DownloadMeta } from './offline/downloads-core';
import { downloadsSupported, fileStore } from './offline/file-store';
import { canDownload, downloadLocked, hasText, isLaunchStory, waitReason } from './offline/policy';
import { readItem, writeItem } from './storage';
import { getState, planOpen, shelfOf } from './store';

export { downloadsSupported } from './offline/file-store';

/**
 * Stories kept on the phone for reading without data (native builds only).
 * The storage work is in `offline/downloads-core.ts`; this file connects it to the app: the API,
 * the "Wi-Fi only" setting, waiting for Wi-Fi, and a small store the screens can follow.
 */

const kv = { get: readItem, set: writeItem };
const core = createDownloads({ fs: fileStore, kv });
const waitList = createWaitList(kv);
const WIFI_ONLY_KEY = 'lali-wifi-only-v1';

export type KeepResult = 'saved' | 'saving' | 'waiting-wifi' | 'waiting-offline' | 'locked' | 'failed';

export type DownloadCard = { story: ShelfStory; isFree: boolean; bytes: number; savedAt: number };

type DState = {
  items: DownloadMeta[];
  /** Shelf cards with pictures pointing at the phone's files; the same array until something changes. */
  cards: DownloadCard[];
  ids: Set<string>;
  waiting: string[];
  busy: string[];
  wifiOnly: boolean;
  totalBytes: number;
};

function snapshot(prev?: DState): DState {
  const items = downloadsSupported ? core.list() : [];
  return {
    items,
    cards: items.map((m) => ({ story: core.card(m), isFree: m.isFree, bytes: m.bytes, savedAt: m.savedAt })),
    ids: new Set(items.map((m) => m.id)),
    waiting: downloadsSupported ? waitList.list() : [],
    busy: prev?.busy ?? [],
    wifiOnly: readItem(WIFI_ONLY_KEY) !== '0',
    totalBytes: items.reduce((a, b) => a + b.bytes, 0),
  };
}

let state: DState | null = null;
const listeners = new Set<() => void>();
const current = () => (state ??= snapshot());
function refresh(patch?: Partial<DState>) {
  state = { ...snapshot(current()), ...patch };
  listeners.forEach((l) => l());
}

const emptyState: DState = { items: [], cards: [], ids: new Set(), waiting: [], busy: [], wifiOnly: true, totalBytes: 0 };

/** Select a stable value from the downloads. */
export function useDownloads<T>(select: (d: DState) => T): T {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
    () => select(current()),
    () => select(emptyState),
  );
}

export function getDownload(id: string): DownloadMeta | null {
  return downloadsSupported ? (current().items.find((m) => m.id === id) ?? null) : null;
}

/** Is a downloaded story locked now (paid, and the plan has ended or hasn't been checked for 7 days)? */
export function isDownloadLocked(meta: Pick<DownloadMeta, 'isFree'>): boolean {
  return downloadLocked(meta, planOpen(getState()));
}

/** The whole downloaded story, with `file://` pictures and narration. */
export function readLocalStory(id: string): Promise<ShelfStory | null> {
  return downloadsSupported ? core.read(id) : Promise.resolve(null);
}

function shelfCopy(id: string): ShelfStory | undefined {
  return shelfOf(getState()).find((s) => s.id === id) ?? bundledShelf().find((s) => s.id === id);
}

function setBusy(id: string, on: boolean) {
  const busy = current().busy.filter((x) => x !== id);
  refresh({ busy: on ? [...busy, id] : busy });
}

async function start(id: string): Promise<KeepResult> {
  if (current().busy.includes(id)) return 'saving';
  setBusy(id, true);
  try {
    let story: ShelfStory;
    try {
      // Fetch and save straight away: studio picture and narration links work for one hour.
      story = (await api.story(id)).story;
    } catch (e) {
      if (isApiError(e, 'plan')) {
        waitList.remove(id);
        return 'locked';
      }
      // A launch story's words are already on the phone; that's all it needs.
      const copy = shelfCopy(id);
      if (copy && isLaunchStory(copy) && hasText(copy) && !copy.locked) story = copy;
      else throw e;
    }
    if (story.locked) {
      waitList.remove(id);
      return 'locked';
    }
    await core.save(story);
    waitList.remove(id);
    return 'saved';
  } catch (e) {
    if (isApiError(e, 'offline')) {
      waitList.add(id);
      return 'waiting-offline';
    }
    waitList.remove(id);
    return 'failed';
  } finally {
    setBusy(id, false);
  }
}

let resuming = false;

export const downloads = {
  /**
   * A grown-up asked to keep a story. It must be one the family can open now. On mobile data with
   * "Wi-Fi only" on (or with no connection) it waits, and starts when Wi-Fi is back.
   */
  async keep(id: string): Promise<KeepResult> {
    if (!downloadsSupported) return 'failed';
    const copy = shelfCopy(id);
    if (copy && !canDownload(copy)) return 'locked';
    const reason = waitReason(getState().net, current().wifiOnly);
    if (reason) {
      waitList.add(id);
      refresh();
      return reason === 'wifi' ? 'waiting-wifi' : 'waiting-offline';
    }
    return start(id);
  },

  /** Starts the stories that were waiting, if the connection now allows it. */
  async resume() {
    if (!downloadsSupported || resuming) return;
    resuming = true;
    try {
      for (const id of waitList.list()) {
        if (waitReason(getState().net, current().wifiOnly)) break;
        const result = await start(id);
        if (result === 'waiting-offline') break;
      }
    } finally {
      resuming = false;
      refresh();
    }
  },

  cancelWaiting(id: string) {
    waitList.remove(id);
    refresh();
  },

  remove(id: string) {
    core.remove(id);
    refresh();
  },

  removeAll() {
    core.removeAll();
    waitList.clear();
    refresh();
  },

  setWifiOnly(on: boolean) {
    writeItem(WIFI_ONLY_KEY, on ? '1' : '0');
    refresh();
    void downloads.resume();
  },

  /** At start-up: tidy folders left by a download the app was closed during. */
  init() {
    if (!downloadsSupported) return;
    try {
      core.cleanUp();
    } catch {
      // Not important.
    }
    refresh();
  },
};
