import type { Lang, ShelfStory } from '../api';

/**
 * Stories kept on the phone: download, list, read back, sizes and removal.
 * Plain TypeScript with the file system and the key-value store passed in, so it can be tested
 * with stand-ins (tests/downloads.test.ts). The app's real file system is in `file-store.ts`.
 *
 * On the phone each story lives in its own folder inside the app's private document folder:
 *   <document>/stories/<id>-<time>/story.json   the text, with picture and narration file names
 *                                  p0.jpg …       one picture per page (studio stories)
 *                                  a0-en.mp3 …    narration per page and language, when recorded
 * The list of downloads is kept in the key-value store. Paths are kept relative to the stories
 * folder because iOS can move the app's folder when the app is updated.
 */

export interface FileStore {
  /** Absolute URI of the stories folder, ending in "/". */
  root(): string;
  makeDir(rel: string): void;
  /** Downloads `url` to `rel` and answers its size in bytes. Throws on any HTTP error. */
  download(url: string, rel: string): Promise<number>;
  /** Writes text to `rel` and answers its size in bytes. */
  writeText(rel: string, text: string): Promise<number>;
  readText(rel: string): Promise<string>;
  /** Removes a folder and everything in it; quiet if it's already gone. */
  removeDir(rel: string): void;
  /** Names of the folders directly inside the stories folder. */
  listDirs(): string[];
}

export interface KV {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

export type DownloadMeta = {
  id: string;
  /** Folder inside the stories folder. */
  dir: string;
  savedAt: number;
  bytes: number;
  isFree: boolean;
  /** The shelf card: title, colours and picture file names, no page text. */
  card: ShelfStory;
};

export const DOWNLOADS_KEY = 'lali-downloads-v1';
const STORY_FILE = 'story.json';
const LANGS: Lang[] = ['en', 'am'];

function safeName(id: string): string {
  return id.replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 80) || 'story';
}

function extension(url: string, fallback: string): string {
  const m = url.split(/[?#]/)[0].match(/\.([A-Za-z0-9]{2,5})$/);
  return m ? m[1].toLowerCase() : fallback;
}

const isRemote = (u: string | null | undefined): u is string => typeof u === 'string' && /^https?:\/\//i.test(u);

/** Runs `jobs` with at most `limit` at a time; rejects with the first error. */
async function pool<T>(jobs: (() => Promise<T>)[], limit: number): Promise<T[]> {
  const results: T[] = new Array(jobs.length);
  let next = 0;
  let failed: unknown = null;
  async function worker() {
    while (next < jobs.length && failed === null) {
      const i = next++;
      try {
        results[i] = await jobs[i]();
      } catch (e) {
        failed ??= e;
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, jobs.length) }, worker));
  if (failed !== null) throw failed;
  return results;
}

export function createDownloads(deps: { fs: FileStore; kv: KV; now?: () => number; key?: string; concurrency?: number }) {
  const { fs, kv } = deps;
  const now = deps.now ?? Date.now;
  const key = deps.key ?? DOWNLOADS_KEY;
  const concurrency = deps.concurrency ?? 3;

  function readIndex(): Record<string, DownloadMeta> {
    const raw = kv.get(key);
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw) as Record<string, DownloadMeta>;
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }
  function writeIndex(index: Record<string, DownloadMeta>) {
    kv.set(key, JSON.stringify(index));
  }

  const abs = (dir: string, name: string | null | undefined) => (name ? `${fs.root()}${dir}/${name}` : null);

  /** A stored story with its file names turned into full `file://` addresses. */
  function localize(story: ShelfStory, dir: string): ShelfStory {
    return {
      ...story,
      pictures: story.pictures?.map((p) => abs(dir, p)),
      audio: story.audio?.map((a) => ({ en: abs(dir, a.en ?? null), am: abs(dir, a.am ?? null) })),
    };
  }

  const api = {
    list(): DownloadMeta[] {
      return Object.values(readIndex()).sort((a, b) => b.savedAt - a.savedAt);
    },
    get(id: string): DownloadMeta | null {
      return readIndex()[id] ?? null;
    },
    has(id: string): boolean {
      return Boolean(readIndex()[id]);
    },
    totalBytes(): number {
      return api.list().reduce((sum, d) => sum + d.bytes, 0);
    },

    /** The shelf card with pictures pointing at the files on the phone. */
    card(meta: DownloadMeta): ShelfStory {
      return localize(meta.card, meta.dir);
    },

    /**
     * Saves a whole story (from `GET stories/:id`, or a launch story's text) right away: studio
     * picture and narration links only work for an hour. Replaces an earlier copy only once the
     * new one is complete.
     */
    async save(story: ShelfStory): Promise<DownloadMeta> {
      const dir = `${safeName(story.id)}-${now()}`;
      fs.makeDir(dir);
      try {
        const jobs: (() => Promise<number>)[] = [];
        const pictures = story.pictures?.map((url, i) => {
          if (!isRemote(url)) return null;
          const name = `p${i}.${extension(url, 'jpg')}`;
          jobs.push(() => fs.download(url, `${dir}/${name}`));
          return name;
        });
        const audio = story.audio?.map((byLang, i) => {
          const out: Partial<Record<Lang, string | null>> = {};
          for (const lang of LANGS) {
            const url = byLang?.[lang];
            if (!isRemote(url)) {
              out[lang] = null;
              continue;
            }
            const name = `a${i}-${lang}.${extension(url, 'mp3')}`;
            jobs.push(() => fs.download(url, `${dir}/${name}`));
            out[lang] = name;
          }
          return out;
        });
        const sizes = await pool(jobs, concurrency);
        const stored: ShelfStory = { ...story, pictures, audio, locked: false };
        if (story.pictures === undefined) delete stored.pictures;
        if (story.audio === undefined) delete stored.audio;
        const textBytes = await fs.writeText(`${dir}/${STORY_FILE}`, JSON.stringify(stored));
        const meta: DownloadMeta = {
          id: story.id,
          dir,
          savedAt: now(),
          bytes: sizes.reduce((a, b) => a + b, 0) + textBytes,
          isFree: story.isFree,
          card: { ...stored, pages: [] },
        };
        const index = readIndex();
        const old = index[story.id];
        index[story.id] = meta;
        writeIndex(index);
        if (old && old.dir !== dir) fs.removeDir(old.dir);
        return meta;
      } catch (e) {
        fs.removeDir(dir);
        throw e;
      }
    },

    /** The whole downloaded story, ready for the reader, or null if it isn't on the phone. */
    async read(id: string): Promise<ShelfStory | null> {
      const meta = api.get(id);
      if (!meta) return null;
      try {
        const story = JSON.parse(await fs.readText(`${meta.dir}/${STORY_FILE}`)) as ShelfStory;
        return localize(story, meta.dir);
      } catch {
        return null;
      }
    },

    remove(id: string) {
      const index = readIndex();
      const meta = index[id];
      if (!meta) return;
      delete index[id];
      writeIndex(index);
      fs.removeDir(meta.dir);
    },

    removeAll() {
      const index = readIndex();
      writeIndex({});
      for (const meta of Object.values(index)) fs.removeDir(meta.dir);
      api.cleanUp();
    },

    /** Removes folders the list doesn't know (a download cut short when the app was closed). */
    cleanUp() {
      const known = new Set(Object.values(readIndex()).map((d) => d.dir));
      for (const dir of fs.listDirs()) if (!known.has(dir)) fs.removeDir(dir);
    },
  };
  return api;
}

export type Downloads = ReturnType<typeof createDownloads>;

export const WAITING_KEY = 'lali-downloads-waiting-v1';

/** Stories a grown-up asked to keep while on mobile data (or offline): they start when Wi-Fi is back. */
export function createWaitList(kv: KV, key = WAITING_KEY) {
  const read = (): string[] => {
    try {
      const list = JSON.parse(kv.get(key) ?? '[]') as unknown;
      return Array.isArray(list) ? list.filter((x): x is string => typeof x === 'string') : [];
    } catch {
      return [];
    }
  };
  const write = (ids: string[]) => kv.set(key, JSON.stringify(ids));
  return {
    list: read,
    has: (id: string) => read().includes(id),
    add(id: string) {
      const ids = read();
      if (!ids.includes(id)) write([...ids, id]);
    },
    remove(id: string) {
      write(read().filter((x) => x !== id));
    },
    clear() {
      write([]);
    },
  };
}

export type WaitList = ReturnType<typeof createWaitList>;
