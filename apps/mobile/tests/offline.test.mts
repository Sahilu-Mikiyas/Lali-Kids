/// <reference types="node" />
// Quick tests for the offline storage logic, with the file system and key-value store swapped
// for stand-ins. Run with: npm test  (node --test; Node 22.18+ runs TypeScript directly)
import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { FamilyPlan, ShelfStory } from '../src/lib/api.ts';
import { createDownloads, createWaitList, type FileStore, type KV } from '../src/lib/offline/downloads-core.ts';
import { canDownload, dayOf, formatBytes, offlineShelf, PLAN_TRUST_MS, planOpenAt, waitReason } from '../src/lib/offline/policy.ts';
import { createProgressQueue, type QueuedProgress, type SendResult } from '../src/lib/offline/progress-queue.ts';

function memoryKv(): KV & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return { data, get: (k) => data.get(k) ?? null, set: (k, v) => void data.set(k, v) };
}

/** A pretend file system: files are a map of path to size; a URL containing "broken" fails. */
function memoryFs(): FileStore & { files: Map<string, string | number>; downloaded: string[] } {
  const files = new Map<string, string | number>();
  const dirs = new Set<string>();
  const downloaded: string[] = [];
  return {
    files,
    downloaded,
    root: () => 'file:///docs/stories/',
    makeDir: (rel) => void dirs.add(rel),
    async download(url, rel) {
      downloaded.push(url);
      if (url.includes('broken')) throw new Error('HTTP 403');
      files.set(rel, 1000);
      return 1000;
    },
    async writeText(rel, text) {
      files.set(rel, text);
      return text.length;
    },
    async readText(rel) {
      const v = files.get(rel);
      if (typeof v !== 'string') throw new Error('missing');
      return v;
    },
    removeDir(rel) {
      dirs.delete(rel);
      for (const k of [...files.keys()]) if (k.startsWith(`${rel}/`)) files.delete(k);
    },
    listDirs: () => [...dirs],
  };
}

const studio: ShelfStory = {
  id: 'studio-1',
  title: { en: 'Fidel Friends', am: 'የፊደል ጓደኞች' },
  category: 'Fidel',
  ageBands: ['3-5'],
  color: '#7A4FD1',
  coverPage: 0,
  pages: [
    { en: 'Ha is for hare.', am: 'ሀ' },
    { en: 'Le is for lion.', am: 'ለ' },
  ],
  pictures: ['https://cdn.example/p/one.png?token=abc', 'https://cdn.example/p/two.jpg?token=abc'],
  audio: [{ en: 'https://cdn.example/a/1-en.m4a?t=1', am: null }, { en: null, am: 'https://cdn.example/a/2-am.mp3?t=1' }],
  isFree: false,
};

const launch: ShelfStory = {
  id: 'lost-moon',
  title: { en: 'Anbessa and the Lost Moon', am: 'አንበሳ' },
  category: 'Bedtime',
  ageBands: ['3-5'],
  color: '#2B3A8C',
  scene: 'moon',
  coverPage: 3,
  pages: [{ en: 'One night…', am: 'አንድ ምሽት…' }],
  isFree: true,
};

test('saves a studio story: text, pictures and narration, with sizes', async () => {
  const fs = memoryFs();
  const kv = memoryKv();
  const d = createDownloads({ fs, kv, now: () => 1000 });
  const meta = await d.save(studio);

  assert.equal(fs.downloaded.length, 4);
  assert.equal(meta.dir, 'studio-1-1000');
  assert.ok(fs.files.has('studio-1-1000/p0.png'));
  assert.ok(fs.files.has('studio-1-1000/p1.jpg'));
  assert.ok(fs.files.has('studio-1-1000/a0-en.m4a'));
  assert.ok(fs.files.has('studio-1-1000/a1-am.mp3'));
  const text = fs.files.get('studio-1-1000/story.json') as string;
  assert.ok(!text.includes('token='), 'no short-lived links are kept');
  assert.equal(meta.bytes, 4000 + text.length);
  assert.equal(d.totalBytes(), meta.bytes);
  assert.deepEqual(d.card(meta).pages, [], 'the shelf card has no text');

  const story = await d.read('studio-1');
  assert.equal(story?.pictures?.[0], 'file:///docs/stories/studio-1-1000/p0.png');
  assert.equal(story?.audio?.[0]?.en, 'file:///docs/stories/studio-1-1000/a0-en.m4a');
  assert.equal(story?.audio?.[0]?.am, null);
  assert.equal(story?.pages[1].en, 'Le is for lion.');
});

test('a launch story saves just its text', async () => {
  const fs = memoryFs();
  const d = createDownloads({ fs, kv: memoryKv(), now: () => 5 });
  const meta = await d.save(launch);
  assert.equal(fs.downloaded.length, 0);
  assert.equal([...fs.files.keys()].join(), 'lost-moon-5/story.json');
  const story = await d.read('lost-moon');
  assert.equal(story?.pictures, undefined, 'still drawn by the app');
  assert.equal(story?.pages[0].en, 'One night…');
  assert.ok(meta.isFree);
});

test('a failed download leaves nothing behind and keeps the old copy', async () => {
  const fs = memoryFs();
  const kv = memoryKv();
  let t = 1;
  const d = createDownloads({ fs, kv, now: () => t++ });
  await d.save(studio);
  const before = d.get('studio-1');
  await assert.rejects(d.save({ ...studio, pictures: ['https://cdn.example/broken.png', null] }));
  assert.deepEqual(d.get('studio-1'), before);
  assert.ok([...fs.files.keys()].every((k) => k.startsWith(`${before!.dir}/`)));
});

test('saving again replaces the old folder; remove, remove all and tidy-up', async () => {
  const fs = memoryFs();
  let t = 1;
  const d = createDownloads({ fs, kv: memoryKv(), now: () => t++ });
  const first = await d.save(studio);
  const second = await d.save(studio);
  assert.notEqual(first.dir, second.dir);
  assert.ok(![...fs.files.keys()].some((k) => k.startsWith(first.dir)));
  await d.save(launch);
  assert.deepEqual(d.list().map((x) => x.id), ['lost-moon', 'studio-1'], 'newest first');

  d.remove('studio-1');
  assert.equal(d.has('studio-1'), false);
  assert.ok(![...fs.files.keys()].some((k) => k.startsWith('studio-1')));

  fs.makeDir('orphan-9');
  d.cleanUp();
  assert.ok(!fs.listDirs().includes('orphan-9'));

  d.removeAll();
  assert.equal(d.list().length, 0);
  assert.equal(fs.files.size, 0);
  assert.equal(d.totalBytes(), 0);
});

test('a broken index in the store reads as empty', () => {
  const kv = memoryKv();
  kv.set('lali-downloads-v1', '{not json');
  assert.deepEqual(createDownloads({ fs: memoryFs(), kv }).list(), []);
});

test('wait list for Wi-Fi keeps each story once', () => {
  const w = createWaitList(memoryKv());
  w.add('a');
  w.add('b');
  w.add('a');
  assert.deepEqual(w.list(), ['a', 'b']);
  w.remove('a');
  assert.deepEqual(w.list(), ['b']);
});

test('progress queue: de-duplicates, sends when back online, keeps what fails', async () => {
  const kv = memoryKv();
  let online = false;
  const sent: string[] = [];
  const q = createProgressQueue({
    kv,
    async send(p: QueuedProgress): Promise<SendResult> {
      if (!online) return 'retry';
      if (p.storyId === 'gone') return 'drop';
      sent.push(p.storyId);
      return 'sent';
    },
  });
  const base = { childId: 'c1', itemType: 'story' as const, day: '2026-11-6', at: 1 };
  assert.equal(q.add({ ...base, storyId: 'lost-moon' }), true);
  assert.equal(q.add({ ...base, storyId: 'lost-moon', at: 2 }), false, 'same child, story and day');
  assert.equal(q.add({ ...base, storyId: 'lost-moon', childId: 'c2' }), true, 'another child');
  assert.equal(q.add({ ...base, storyId: 'gone' }), true);
  assert.equal(q.size(), 3);

  let r = await q.flush();
  assert.equal(r.sent.length, 0);
  assert.equal(r.left, 3, 'nothing lost while offline');

  online = true;
  const [a, b] = await Promise.all([q.flush(), q.flush()]);
  assert.equal(a, b, 'one flush at a time');
  assert.deepEqual(sent, ['lost-moon', 'lost-moon']);
  assert.equal(a.left, 0);
  r = await q.flush();
  assert.equal(r.sent.length, 0);
  // The queue lives in the key-value store, so a new queue (app restarted) sees the same list.
  q.add({ ...base, storyId: 'gugu-counts' });
  assert.equal(createProgressQueue({ kv, send: async () => 'sent' }).size(), 1);
});

test('progress queue: a send that throws is kept for later', async () => {
  const q = createProgressQueue({ kv: memoryKv(), send: async () => Promise.reject(new Error('boom')) });
  q.add({ childId: 'c', storyId: 's', itemType: 'story', day: dayOf(0), at: 0 });
  assert.equal((await q.flush()).left, 1);
});

const plan = (over: Partial<FamilyPlan> = {}): FamilyPlan => ({
  planId: 'reader',
  planName: 'Reader',
  status: 'active',
  endsAt: '2026-12-01T00:00:00Z',
  isOpen: true,
  daysLeft: 25,
  next: null,
  ...over,
});

test('plan is trusted offline for at most 7 days and never past its end', () => {
  const now = Date.parse('2026-11-06T12:00:00Z');
  assert.equal(planOpenAt(plan(), now - 1000, now), true);
  assert.equal(planOpenAt(plan(), now - PLAN_TRUST_MS + 1000, now), true);
  assert.equal(planOpenAt(plan(), now - PLAN_TRUST_MS - 1000, now), false, 'more than 7 days without the server');
  assert.equal(planOpenAt(plan({ isOpen: false }), now, now), false);
  assert.equal(planOpenAt(plan({ endsAt: '2026-11-05T00:00:00Z' }), now - 1000, now), false, 'ended since');
  assert.equal(planOpenAt(plan({ endsAt: '2026-11-05T00:00:00Z', next: { planId: 'vip', planName: 'VIP', days: 30, endsAt: '2026-12-05T00:00:00Z' } }), now - 1000, now), true);
  assert.equal(planOpenAt(null, now, now), false);
  assert.equal(planOpenAt(plan(), null, now), false);
});

test('Wi-Fi only: waits on mobile data and offline', () => {
  assert.equal(waitReason({ online: true, type: 'WIFI' }, true), null);
  assert.equal(waitReason({ online: true, type: 'CELLULAR' }, true), 'wifi');
  assert.equal(waitReason({ online: true, type: 'CELLULAR' }, false), null);
  assert.equal(waitReason({ online: false, type: 'NONE' }, false), 'offline');
});

test('offline shelf: launch stories and downloads; paid downloads lock when the plan ends', () => {
  const lockedStudio: ShelfStory = { ...studio, id: 'studio-2', pages: [{ en: '', am: '' }], pictures: [null], locked: true };
  const notSaved: ShelfStory = { ...studio, id: 'studio-3', pages: [{ en: '', am: '' }], pictures: ['https://x/c.png'] };
  const card = { story: { ...studio, pages: [], pictures: ['file:///p0.png', 'file:///p1.jpg'] }, isFree: false };
  const shelf = [lockedStudio, notSaved, launch, studio];

  const open = offlineShelf(shelf, [card], true);
  assert.deepEqual(open.map((s) => s.id), ['lost-moon', 'studio-1']);
  assert.equal(open[1].locked, false);
  assert.equal(open[1].pictures?.[0], 'file:///p0.png');

  const ended = offlineShelf(shelf, [card], false);
  assert.deepEqual(ended.map((s) => [s.id, Boolean(s.locked)]), [['lost-moon', false], ['studio-1', true]]);

  // A download no longer on the cached shelf still shows.
  assert.deepEqual(offlineShelf([launch], [card], true).map((s) => s.id), ['lost-moon', 'studio-1']);
});

test('only stories the family can open now can be downloaded', () => {
  assert.equal(canDownload(launch), true);
  assert.equal(canDownload({ ...studio, locked: true }), false);
  assert.equal(canDownload(null), false);
});

test('sizes read nicely', () => {
  assert.equal(formatBytes(512), '512 B');
  assert.equal(formatBytes(2048), '2 KB');
  assert.equal(formatBytes(1.5 * 1024 * 1024), '1.5 MB');
  assert.equal(formatBytes(42 * 1024 * 1024), '42 MB');
});
