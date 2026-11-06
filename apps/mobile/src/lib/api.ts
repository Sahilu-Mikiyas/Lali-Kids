import { config } from './config';
import { accessToken } from './supabase';

/**
 * The Lali app's API on the website (docs/MOBILE.md). Every call carries the parent's access token
 * when signed in, plus who is reading (`X-Lali-Child`) and the app language (`X-Lali-Lang`).
 */

export type Lang = 'en' | 'am';
export type AgeBand = '3-5' | '6-7' | '8-9';
export type Avatar = 'cub' | 'gugu' | 'bee';
export type PlanId = 'reader' | 'learner' | 'vip';

export type Child = { id: string; name: string; age_band: AgeBand; preferred_lang: Lang; stars: number; avatar: Avatar };

export type FamilyPlan = {
  planId: string;
  planName: string;
  status: 'trialing' | 'active' | 'past_due' | 'cancelled';
  endsAt: string;
  isOpen: boolean;
  daysLeft: number;
  next: { planId: string; planName: string; days: number; endsAt: string } | null;
};

export type Tonight = { read: number; limitReached: boolean };

export type Me = {
  profile: { id: string; name: string | null; email: string | null; role: string; uiLang: Lang | null; telegram: boolean };
  children: Child[];
  currentChildId: string | null;
  settings: { nightlyLimit: number; showAllAges: boolean; gamesMinutes: number };
  tonight: Tonight;
  games: { secondsToday: number; secondsLeft: number };
  plan: FamilyPlan | null;
  plans: { id: PlanId; priceEtb: number }[];
};

export type MePatch = Partial<{ nightlyLimit: number; showAllAges: boolean; gamesMinutes: number; uiLang: Lang; name: string }>;

export type StoryPage = Record<Lang, string>;

export type ShelfStory = {
  id: string;
  title: Record<Lang, string>;
  category: string;
  ageBands: AgeBand[];
  color: string;
  /** Drawn scene for launch stories; the app draws the ones it knows. */
  scene?: string;
  coverPage: number;
  pages: StoryPage[];
  /** Studio stories: a picture link per page (on the shelf, only the cover). */
  pictures?: (string | null)[];
  /** For paid launch stories: lets the website's animated book open them inside the app (6 hours). */
  readPass?: string;
  /** Recorded narration per page and language, when there is one. */
  audio?: Partial<Record<Lang, string | null>>[];
  isFree: boolean;
  locked?: boolean;
};

export type Book = {
  id: string;
  slug: string;
  title: string;
  title_am: string | null;
  author: string | null;
  page_count: number;
  is_free: boolean;
  category: string | null;
  age_band: string | null;
  locked: boolean;
  /** Relative to the website, e.g. /api/books/<id>/cover */
  cover: string;
};

export type BookPage = { n: number; w: number; h: number; url: string };
export type BookPages = { id: string; title: string; pageCount: number; validSeconds: number; pages: BookPage[] };

export type Game = {
  id: string;
  slug: string;
  title: string;
  titleAm: string | null;
  description: string | null;
  url: string;
  ageBands: AgeBand[];
  color: string;
  thumbnail: string | null;
  isFree: boolean;
  locked: boolean;
};

export type GameStart =
  | { ok: true; sessionId: string | null; secondsLeft: number | null; url: string }
  | { ok: false; reason: 'locked' | 'off' | 'time-up' | 'missing' };

// ---------------------------------------------------------------- errors

export type ApiErrorKind = 'signin' | 'plan' | 'notfound' | 'tooFast' | 'bad' | 'server' | 'offline';

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status: number;
  /** The response body, for calls that send something useful with an error (402 locked story). */
  readonly body: unknown;
  constructor(kind: ApiErrorKind, status: number, message: string, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
    this.status = status;
    this.body = body;
  }
}

function kindFor(status: number): ApiErrorKind {
  if (status === 401) return 'signin';
  if (status === 402) return 'plan';
  if (status === 404) return 'notfound';
  if (status === 429) return 'tooFast';
  if (status >= 400 && status < 500) return 'bad';
  return 'server';
}

export const isApiError = (e: unknown, kind?: ApiErrorKind): e is ApiError => e instanceof ApiError && (!kind || e.kind === kind);

// ---------------------------------------------------------------- request context

type Context = { childId: () => string | null; lang: () => Lang };
let context: Context = { childId: () => null, lang: () => 'en' };

/** The store tells the API who is reading and which language the app is in. */
export function setApiContext(c: Context) {
  context = c;
}

/** Headers for anything fetched from the website as the parent (book pages, covers). */
export async function authHeaders(): Promise<Record<string, string>> {
  const token = await accessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const TIMEOUT_MS = 20_000;

async function call<T>(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', path: string, body?: unknown, okStatuses: number[] = [], childId?: string): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json', 'X-Lali-Lang': context.lang(), ...(await authHeaders()) };
  const child = childId ?? context.childId();
  if (child) headers['X-Lali-Child'] = child;
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${config.apiUrl}/api/mobile/${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
  } catch {
    throw new ApiError('offline', 0, 'No connection');
  } finally {
    clearTimeout(timer);
  }
  const data = (await res.json().catch(() => null)) as (T & { error?: string }) | null;
  if (res.ok || okStatuses.includes(res.status)) return data as T;
  throw new ApiError(kindFor(res.status), res.status, data?.error ?? `HTTP ${res.status}`, data);
}

const enc = encodeURIComponent;

// ---------------------------------------------------------------- calls

export const api = {
  me: () => call<Me>('GET', 'me'),
  updateMe: (patch: MePatch) => call<Me>('PATCH', 'me', patch),

  addChild: (child: { name: string; ageBand: AgeBand; lang: Lang; avatar: Avatar }) => call<{ child: Child }>('POST', 'children', child),
  removeChild: (id: string) => call<{ ok: boolean }>('DELETE', `children/${enc(id)}`),
  allowMore: (id: string) => call<{ ok: boolean }>('POST', `children/${enc(id)}/allow-more`),

  stories: () => call<{ stories: ShelfStory[] }>('GET', 'stories'),
  /** A whole story with picture and narration links. A locked story throws ApiError('plan') with `{locked}` as its body. */
  story: (id: string) => call<{ story: ShelfStory; readPass?: string }>('GET', `stories/${enc(id)}`),
  /** `childId` sends a star for a child other than the one reading now (stars earned offline). */
  progress: (storyId: string, itemType: 'story' | 'book' = 'story', childId?: string) =>
    call<{ stars: number; tonight: Tonight }>('POST', 'progress', { storyId, itemType }, [], childId),

  books: () => call<{ books: Book[] }>('GET', 'books'),
  bookPages: (slug: string, from: number, to: number) => call<BookPages>('GET', `books/${enc(slug)}?from=${from}&to=${to}`),

  games: () => call<{ games: Game[] }>('GET', 'games'),
  // A game that's locked answers 402 with {ok:false, reason:"locked"}; a missing one 404.
  startGame: async (slug: string): Promise<GameStart> => {
    try {
      return await call<GameStart>('POST', `games/${enc(slug)}/start`, undefined, [402]);
    } catch (e) {
      if (isApiError(e, 'notfound')) return { ok: false, reason: 'missing' };
      throw e;
    }
  },
  tickGame: (sessionId: string, update: { seconds?: number; score?: number }) => call<{ secondsLeft: number | null }>('POST', `sessions/${enc(sessionId)}`, update),

  checkout: (plan: PlanId) => call<{ url: string }>('POST', 'checkout', { plan }),
};

/** Turns a website path like /api/books/1/cover into a full address. */
export function siteUrl(path: string): string {
  return path.startsWith('/') ? `${config.apiUrl}${path}` : path;
}
