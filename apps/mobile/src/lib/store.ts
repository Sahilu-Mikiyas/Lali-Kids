import { getLocales } from 'expo-localization';
import { useSyncExternalStore } from 'react';

import { bundledShelf } from '@/content/stories';
import { api, isApiError, setApiContext, type AgeBand, type Avatar, type Child, type Lang, type Me, type MePatch, type ShelfStory } from './api';
import { readItem, writeItem } from './storage';
import { supabase } from './supabase';

export type { Lang } from './api';

/** What the phone keeps by itself: used when signed out, and for things only this phone cares about. */
type Local = {
  /** Stars earned while signed out (the server keeps each child's stars once signed in). */
  stars: number;
  /** Times each story has been finished on this phone, by story id. */
  finished: Record<string, number>;
  bedtime: boolean;
  /** Signed-out bedtime limit: stories per night, 0 for no limit. */
  nightlyLimit: number;
  tonight: { date: string; count: number };
  /** App language chosen on this phone when signed out (otherwise the phone's language). */
  uiLang: Lang | null;
};

type Session = { ready: boolean; signedIn: boolean; email: string | null };

type State = Local & {
  session: Session;
  /** The last `GET me`, kept so the app works offline. */
  me: Me | null;
  /** The child chosen on this phone ("Who's reading?"). */
  childId: string | null;
  /** The last `GET stories`, kept so the shelf works offline. */
  shelf: ShelfStory[] | null;
  shelfStatus: 'loading' | 'live' | 'cached';
  phoneLang: Lang;
};

const KEYS = { local: 'lali-state-v1', me: 'lali-me-v1', child: 'lali-child-v1', shelf: 'lali-shelf-v1', email: 'lali-email-v1' };

const initialLocal: Local = {
  stars: 0,
  finished: {},
  bedtime: false,
  nightlyLimit: 3,
  tonight: { date: '', count: 0 },
  uiLang: null,
};

function readJson<T>(key: string): T | null {
  const raw = readItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function phoneLanguage(): Lang {
  try {
    return getLocales().some((l, i) => i < 2 && l.languageCode === 'am') ? 'am' : 'en';
  } catch {
    return 'en';
  }
}

function load(): State {
  const saved = readJson<Partial<Local>>(KEYS.local) ?? {};
  const local: Local = {
    stars: saved.stars ?? initialLocal.stars,
    finished: saved.finished ?? {},
    bedtime: saved.bedtime ?? false,
    nightlyLimit: saved.nightlyLimit ?? initialLocal.nightlyLimit,
    tonight: saved.tonight ?? initialLocal.tonight,
    uiLang: saved.uiLang === 'en' || saved.uiLang === 'am' ? saved.uiLang : null,
  };
  return {
    ...local,
    session: { ready: false, signedIn: false, email: null },
    me: readJson<Me>(KEYS.me),
    childId: readItem(KEYS.child) || null,
    shelf: readJson<ShelfStory[]>(KEYS.shelf),
    shelfStatus: 'loading',
    phoneLang: phoneLanguage(),
  };
}

const serverDefault: State = { ...initialLocal, session: { ready: false, signedIn: false, email: null }, me: null, childId: null, shelf: null, shelfStatus: 'loading', phoneLang: 'en' };

let state: State | null = null;
const listeners = new Set<() => void>();

function current(): State {
  if (!state) state = load();
  return state;
}

function update(fn: (s: State) => State) {
  const before = current();
  const after = fn(before);
  state = after;
  const local: Local = {
    stars: after.stars,
    finished: after.finished,
    bedtime: after.bedtime,
    nightlyLimit: after.nightlyLimit,
    tonight: after.tonight,
    uiLang: after.uiLang,
  };
  writeItem(KEYS.local, JSON.stringify(local));
  if (after.me !== before.me) writeItem(KEYS.me, after.me ? JSON.stringify(after.me) : '');
  if (after.childId !== before.childId) writeItem(KEYS.child, after.childId ?? '');
  if (after.shelf !== before.shelf) writeItem(KEYS.shelf, after.shelf ? JSON.stringify(after.shelf) : '');
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
  return useSyncExternalStore(subscribe, () => select(current()), () => select(serverDefault));
}

export function getState(): State {
  return current();
}

// ---------------------------------------------------------------- derived values

export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function storiesTonight(s: State): number {
  return s.tonight.date === today() ? s.tonight.count : 0;
}

/** The signed-in family, or null when this phone is signed out. */
export function familyOf(s: State): Me | null {
  // Until Supabase has read the saved session, trust the cached family so the shelf doesn't flicker.
  return s.session.signedIn || !s.session.ready ? s.me : null;
}

/** The child who is reading, when signed in. */
export function currentChild(s: State): Child | null {
  const me = familyOf(s);
  if (!me) return null;
  return me.children.find((c) => c.id === s.childId) ?? me.children.find((c) => c.id === me.currentChildId) ?? me.children[0] ?? null;
}

/** Stars to show: the reading child's when signed in, otherwise this phone's. */
export function starsOf(s: State): number {
  return currentChild(s)?.stars ?? s.stars;
}

export function isLimitReached(s: State): boolean {
  const me = familyOf(s);
  if (me && currentChild(s)) return me.tonight.limitReached;
  return s.nightlyLimit > 0 && storiesTonight(s) >= s.nightlyLimit;
}

/** The app language: the parent's choice when signed in, otherwise this phone's. */
export function uiLangOf(s: State): Lang {
  return familyOf(s)?.profile.uiLang ?? s.uiLang ?? s.phoneLang;
}

/** The age group the shelf shows, or null for every age. */
export function shelfAgeBand(s: State): AgeBand | null {
  const me = familyOf(s);
  const child = currentChild(s);
  if (!me || !child || me.settings.showAllAges) return null;
  return child.age_band;
}

export function shelfOf(s: State): ShelfStory[] {
  return s.shelf?.length ? s.shelf : bundledShelf();
}

setApiContext({ childId: () => currentChild(current())?.id ?? null, lang: () => uiLangOf(current()) });

// ---------------------------------------------------------------- server actions

let meRequest: Promise<Me | null> | null = null;

async function fetchMe(): Promise<Me | null> {
  if (!current().session.signedIn) return null;
  try {
    const me = await api.me();
    update((s) => {
      // Keep the remembered child if it still exists; otherwise follow the server.
      const keep = s.childId && me.children.some((c) => c.id === s.childId);
      return { ...s, me, childId: keep ? s.childId : me.currentChildId };
    });
    return me;
  } catch (e) {
    if (isApiError(e, 'signin')) await supabase.auth.signOut({ scope: 'local' }).catch(() => undefined);
    return current().me;
  }
}

/** Patch one child's stars and tonight's count after a finished story. */
function applyProgress(childId: string, stars: number, tonight: Me['tonight']) {
  update((s) =>
    s.me
      ? { ...s, me: { ...s.me, tonight, children: s.me.children.map((c) => (c.id === childId ? { ...c, stars } : c)) } }
      : s,
  );
}

export const actions = {
  /** Called by the root layout whenever Supabase reports a sign-in change. */
  setSession(session: { email: string | null } | null) {
    update((s) => ({
      ...s,
      session: { ready: true, signedIn: Boolean(session), email: session?.email ?? null },
    }));
  },

  refreshMe(): Promise<Me | null> {
    meRequest ??= fetchMe().finally(() => {
      meRequest = null;
    });
    return meRequest;
  },

  async loadShelf() {
    update((s) => ({ ...s, shelfStatus: 'loading' }));
    try {
      const { stories } = await api.stories();
      update((s) => ({ ...s, shelf: stories, shelfStatus: 'live' }));
    } catch {
      update((s) => ({ ...s, shelfStatus: 'cached' }));
    }
  },

  chooseChild(id: string) {
    update((s) => ({ ...s, childId: id }));
    return actions.refreshMe();
  },

  /**
   * A story was read to the end. Signed in with a child: the server records it and awards the star.
   * Signed out: this phone keeps the star, as before.
   */
  async finishStory(id: string, itemType: 'story' | 'book' = 'story'): Promise<{ stars: number; limitReached: boolean }> {
    const s = current();
    const child = currentChild(s);
    update((st) => ({ ...st, finished: { ...st.finished, [id]: (st.finished[id] ?? 0) + 1 } }));
    if (child) {
      try {
        const result = await api.progress(id, itemType);
        applyProgress(child.id, result.stars, result.tonight);
        return { stars: result.stars, limitReached: result.tonight.limitReached };
      } catch {
        return { stars: child.stars, limitReached: isLimitReached(current()) };
      }
    }
    update((st) => ({ ...st, stars: st.stars + 1, tonight: { date: today(), count: storiesTonight(st) + 1 } }));
    const after = current();
    return { stars: after.stars, limitReached: isLimitReached(after) };
  },

  async updateSettings(patch: MePatch) {
    // Show the change straight away; the server's answer replaces it.
    update((s) =>
      s.me
        ? {
            ...s,
            me: {
              ...s.me,
              settings: { ...s.me.settings, ...pick(patch, ['nightlyLimit', 'showAllAges', 'gamesMinutes']) },
              profile: { ...s.me.profile, ...(patch.uiLang ? { uiLang: patch.uiLang } : {}) },
            },
          }
        : s,
    );
    try {
      const me = await api.updateMe(patch);
      update((s) => ({ ...s, me }));
    } catch {
      await actions.refreshMe();
    }
  },

  setUiLang(lang: Lang) {
    if (familyOf(current())) return actions.updateSettings({ uiLang: lang });
    update((s) => ({ ...s, uiLang: lang }));
  },

  async addChild(child: { name: string; ageBand: AgeBand; lang: Lang; avatar: Avatar }) {
    const { child: added } = await api.addChild(child);
    update((s) => ({ ...s, childId: s.me?.children.length ? s.childId : added.id }));
    await actions.refreshMe();
    return added;
  },

  async removeChild(id: string) {
    await api.removeChild(id);
    update((s) => ({ ...s, childId: s.childId === id ? null : s.childId }));
    await actions.refreshMe();
  },

  async allowMoreTonight(childId: string) {
    await api.allowMore(childId);
    await actions.refreshMe();
  },

  async signOut() {
    await supabase.auth.signOut({ scope: 'local' }).catch(() => undefined);
    update((s) => ({ ...s, me: null, childId: null, session: { ready: true, signedIn: false, email: null } }));
    actions.loadShelf();
  },

  rememberEmail(email: string) {
    writeItem(KEYS.email, email);
  },
  lastEmail(): string {
    return readItem(KEYS.email) ?? '';
  },

  // Settings that live on this phone.
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
    update((s) => ({ ...s, stars: 0, finished: {}, tonight: { date: '', count: 0 } }));
  },
};

function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Partial<Pick<T, K>> {
  const out: Partial<Pick<T, K>> = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}
