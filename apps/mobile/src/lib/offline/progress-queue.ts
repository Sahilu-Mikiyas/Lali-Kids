import type { KV } from './downloads-core';

/**
 * Stars earned offline. When a signed-in child finishes a story with no connection, the
 * `POST progress` call waits here (in the key-value store) and is sent once the phone is back
 * online, so no star is lost. One entry per child, story and day: finishing the same story
 * again that day offline, or the end screen showing twice, doesn't send it twice.
 */

export type QueuedProgress = {
  key: string;
  childId: string;
  storyId: string;
  itemType: 'story' | 'book';
  /** Local day it was finished, e.g. "2026-11-6". */
  day: string;
  at: number;
};

/** What happened to one send: done, try again later (no connection, server trouble), or give up (the server refused it). */
export type SendResult = 'sent' | 'retry' | 'drop';

export const PROGRESS_KEY = 'lali-progress-queue-v1';

export function progressKey(p: Pick<QueuedProgress, 'childId' | 'storyId' | 'itemType' | 'day'>): string {
  return `${p.childId}|${p.itemType}|${p.storyId}|${p.day}`;
}

export function createProgressQueue(deps: { kv: KV; send: (p: QueuedProgress) => Promise<SendResult>; key?: string }) {
  const { kv, send } = deps;
  const key = deps.key ?? PROGRESS_KEY;
  let flushing: Promise<{ sent: QueuedProgress[]; left: number }> | null = null;

  function read(): QueuedProgress[] {
    const raw = kv.get(key);
    if (!raw) return [];
    try {
      const list = JSON.parse(raw) as QueuedProgress[];
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }
  const write = (list: QueuedProgress[]) => kv.set(key, JSON.stringify(list));

  async function run() {
    const sent: QueuedProgress[] = [];
    for (const item of read()) {
      let result: SendResult;
      try {
        result = await send(item);
      } catch {
        result = 'retry';
      }
      if (result === 'retry') break;
      // Re-read: something may have been added while this one was on its way.
      write(read().filter((x) => x.key !== item.key));
      if (result === 'sent') sent.push(item);
    }
    return { sent, left: read().length };
  }

  return {
    list: read,
    size: () => read().length,

    /** Queues a finished story; false if the same child, story and day is already waiting. */
    add(p: Omit<QueuedProgress, 'key'>): boolean {
      const item = { ...p, key: progressKey(p) };
      const list = read();
      if (list.some((x) => x.key === item.key)) return false;
      write([...list, item]);
      return true;
    },

    /** Sends what's waiting, oldest first, stopping at the first "try later". One flush at a time. */
    flush(): Promise<{ sent: QueuedProgress[]; left: number }> {
      flushing ??= run().finally(() => {
        flushing = null;
      });
      return flushing;
    },

    clear() {
      write([]);
    },
  };
}

export type ProgressQueue = ReturnType<typeof createProgressQueue>;
