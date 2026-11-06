import type { FamilyPlan, ShelfStory } from '../api';

/**
 * The rules for offline reading, as plain functions so they can be tested without React or a phone.
 * Nothing here imports Expo or React Native.
 */

/** How long the app trusts the last known plan without reaching the server. */
export const PLAN_TRUST_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Is the family's plan open right now, as far as this phone can tell?
 * `checkedAt` is when `GET me` last answered. Past `PLAN_TRUST_MS` without the server, paid
 * downloads lock until the phone checks in again. A plan whose end date (or its queued next
 * plan's) has passed is closed, whatever the last answer said.
 */
export function planOpenAt(plan: FamilyPlan | null | undefined, checkedAt: number | null, now: number): boolean {
  if (!plan?.isOpen || !checkedAt) return false;
  if (now - checkedAt > PLAN_TRUST_MS || now < checkedAt - 60_000) return false;
  const ends = Date.parse(plan.next?.endsAt ?? plan.endsAt);
  return Number.isNaN(ends) || ends > now;
}

/** Launch stories are text plus the app's own drawn scenes; studio stories always carry `pictures`. */
export function isLaunchStory(story: Pick<ShelfStory, 'pictures'>): boolean {
  return story.pictures === undefined;
}

export function hasText(story: Pick<ShelfStory, 'pages'> | null | undefined): boolean {
  return Boolean(story?.pages.some((p) => p.en || p.am));
}

/**
 * Can this story be kept on the phone now? Only what the family can open today: not locked on the
 * shelf. (Partner PDF books are never offered for download: publisher terms.)
 */
export function canDownload(story: Pick<ShelfStory, 'locked'> | null | undefined): boolean {
  return Boolean(story) && !story!.locked;
}

/** A downloaded story that's free reads any time; a paid one only while the plan is open. */
export function downloadLocked(item: { isFree: boolean }, planOpen: boolean): boolean {
  return !item.isFree && !planOpen;
}

export type Net = {
  /** null until the phone has said. */
  online: boolean | null;
  /** expo-network's type: WIFI, CELLULAR, ETHERNET, NONE, UNKNOWN… */
  type: string | null;
};

export function isWifiLike(type: string | null | undefined): boolean {
  return type === 'WIFI' || type === 'ETHERNET';
}

/** Whether a download asked for now must wait (no connection, or mobile data with "Wi-Fi only" on). */
export function waitReason(net: Net, wifiOnly: boolean): 'offline' | 'wifi' | null {
  if (net.online === false) return 'offline';
  if (wifiOnly && !isWifiLike(net.type)) return 'wifi';
  return null;
}

export type OfflineCard = { story: ShelfStory; downloaded: boolean };

/**
 * The shelf to show with no connection: the launch stories (their text is on the phone already)
 * plus every downloaded story. Paid downloads stay on the shelf, locked, once the plan has ended.
 * `downloads` are the downloaded stories' shelf cards (pictures already pointing at local files).
 */
export function offlineShelf(shelf: ShelfStory[], downloads: { story: ShelfStory; isFree: boolean }[], planOpen: boolean): ShelfStory[] {
  const saved = new Map(downloads.map((d) => [d.story.id, d]));
  const out: ShelfStory[] = [];
  const seen = new Set<string>();
  for (const s of shelf) {
    const d = saved.get(s.id);
    if (d) out.push({ ...d.story, locked: downloadLocked(d, planOpen) });
    else if (isLaunchStory(s) && hasText(s) && !s.locked) out.push(s);
    else continue;
    seen.add(s.id);
  }
  for (const d of downloads) if (!seen.has(d.story.id)) out.push({ ...d.story, locked: downloadLocked(d, planOpen) });
  return out;
}

/** Local day, "2026-11-6", used to de-duplicate stars earned offline. */
export function dayOf(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/** "1.4 MB" */
export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  const mb = n / (1024 * 1024);
  return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`;
}
