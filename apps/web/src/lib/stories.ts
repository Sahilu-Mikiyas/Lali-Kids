import "server-only";

import { getStory, STORIES, type AgeBand, type Category, type Pack, type Story } from "@/content/stories";
import { canOpen, isPack, packOf } from "@/lib/packs";
import type { PlanId } from "@/lib/payments/plans";
import { activePlanId } from "@/lib/payments/subscription";
import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export const MEDIA_BUCKET = "story-media";
/** How long picture and narration links work. Long enough to read a book, short enough not to share. */
const LINK_SECONDS = 60 * 60;

type StoryRow = {
  id: string;
  slug: string;
  title_en: string;
  title_am: string | null;
  category: Category;
  age_bands: AgeBand[];
  color: string;
  cover_page: number;
  is_free: boolean;
  /** Migration 0014. Missing until it is applied: the story is then in the Story Garden. */
  pack?: string | null;
};

type PageRow = { position: number; text_en: string; text_am: string; image_path: string | null; audio_en_path: string | null; audio_am_path: string | null };

// Every column, so `pack` comes along once migration 0014 adds it, and nothing breaks before.
const STORY_COLUMNS = "*";

const rowPack = (row: Pick<StoryRow, "pack">): Pack => (isPack(row.pack) ? row.pack : "story");

/** The plan open for a family right now (null without one), which decides the packs it opens. */
async function planOf(familyId: string | null): Promise<PlanId | null> {
  return familyId && hasSecretKey() ? activePlanId(familyId).catch(() => null) : null;
}

/** Turns storage paths into short-lived links, keeping order (null stays null). */
async function signPaths(paths: (string | null)[]): Promise<(string | null)[]> {
  const wanted = [...new Set(paths.filter((p): p is string => Boolean(p)))];
  if (!wanted.length) return paths.map(() => null);
  const { data } = await createSupabaseAdmin().storage.from(MEDIA_BUCKET).createSignedUrls(wanted, LINK_SECONDS);
  const byPath = new Map((data ?? []).map((d) => [d.path, d.signedUrl]));
  return paths.map((p) => (p ? (byPath.get(p) ?? null) : null));
}

function toStory(row: StoryRow, pages: PageRow[], pictures: (string | null)[], locked: boolean, audio?: Story["audio"]): Story {
  return {
    id: row.slug,
    title: { en: row.title_en, am: row.title_am || row.title_en },
    category: row.category,
    ageBands: row.age_bands,
    color: row.color,
    coverPage: Math.min(row.cover_page, Math.max(0, pages.length - 1)),
    pages: pages.map((p) => ({ en: p.text_en, am: p.text_am || p.text_en })),
    pictures,
    audio,
    isFree: row.is_free,
    pack: rowPack(row),
    locked,
  };
}

/** A launch story as the shelf shows it to a family on `planId`: whole, or locked. */
function launchFor(st: Story, planId: PlanId | null): Story {
  return canOpen(st, planId) ? { ...st, pack: packOf(st), locked: false } : lockedLaunch(st);
}

/**
 * Every story on the shelf: the launch stories plus published studio stories, each with its
 * `pack`. Shelf cards only carry the cover picture. Stories in a pack the family's plan doesn't
 * open are marked locked (free stories never are).
 */
export async function shelfStories(familyId: string | null): Promise<Story[]> {
  if (!hasSecretKey()) return STORIES.map((st) => launchFor(st, null));
  const admin = createSupabaseAdmin();
  const [{ data: rows }, planId] = await Promise.all([
    admin.from("stories").select(STORY_COLUMNS).eq("status", "published").order("created_at", { ascending: false }),
    planOf(familyId),
  ]);
  // Locked launch stories show on the shelf with a lock, and without their text.
  const launch = STORIES.map((st) => launchFor(st, planId));
  const list = (rows ?? []) as StoryRow[];
  if (!list.length) return launch;

  const { data: pageRows } = await admin
    .from("story_pages")
    .select("story_id, position, image_path")
    .in(
      "story_id",
      list.map((r) => r.id),
    )
    .order("position");
  const pagesBy = new Map<string, PageRow[]>();
  for (const p of (pageRows ?? []) as (PageRow & { story_id: string })[]) {
    pagesBy.set(p.story_id, [...(pagesBy.get(p.story_id) ?? []), p]);
  }
  const withPages = list.filter((r) => (pagesBy.get(r.id) ?? []).length > 0);
  const covers = await signPaths(
    withPages.map((r) => {
      const pages = pagesBy.get(r.id)!;
      return pages[Math.min(r.cover_page, pages.length - 1)]?.image_path ?? null;
    }),
  );

  // Shelf cards get the title and cover only, so no story text reaches the browser before it's opened.
  const blank = { position: 0, text_en: "", text_am: "", image_path: null, audio_en_path: null, audio_am_path: null };
  const studio = withPages.map((r, i) => ({
    ...toStory(r, [blank], [covers[i]], !canOpen({ isFree: r.is_free, pack: rowPack(r) }, planId)),
    coverPage: 0,
  }));
  return [...studio, ...launch];
}

/**
 * `locked` comes with the family's open plan (null without one), so the page can say which
 * plan opens the story's pack.
 */
export type StoryAccess = { story: Story } | { locked: Story; planId: PlanId | null } | null;

/** A whole story for reading, with picture and narration links, if the family may read it. */
export async function storyForReading(slug: string, familyId: string | null, isAdmin = false): Promise<StoryAccess> {
  const builtIn = getStory(slug);
  if (builtIn) {
    const story = { ...builtIn, pack: packOf(builtIn) };
    if (builtIn.isFree || isAdmin) return { story };
    const planId = await planOf(familyId);
    return canOpen(builtIn, planId) ? { story } : { locked: lockedLaunch(builtIn), planId };
  }
  if (!hasSecretKey()) return null;

  const admin = createSupabaseAdmin();
  // Admins can preview drafts from the story studio.
  let query = admin.from("stories").select(STORY_COLUMNS).eq("slug", slug);
  if (!isAdmin) query = query.eq("status", "published");
  const { data } = await query.maybeSingle();
  if (!data) return null;
  const row = data as StoryRow;
  const { data: pageRows } = await admin
    .from("story_pages")
    .select("position, text_en, text_am, image_path, audio_en_path, audio_am_path")
    .eq("story_id", row.id)
    .order("position");
  const pages = (pageRows ?? []) as PageRow[];
  if (!pages.length) return null;

  const planId = isAdmin || row.is_free ? null : await planOf(familyId);
  const open = isAdmin || canOpen({ isFree: row.is_free, pack: rowPack(row) }, planId);
  if (!open) {
    const cover = Math.min(row.cover_page, pages.length - 1);
    const [coverLink] = await signPaths([pages[cover].image_path]);
    // Locked: title and cover only, never the text, pictures or narration.
    const blank = { position: 0, text_en: "", text_am: "", image_path: null, audio_en_path: null, audio_am_path: null };
    return { locked: { ...toStory(row, [blank], [coverLink], true), coverPage: 0 }, planId };
  }

  const links = await signPaths(pages.flatMap((p) => [p.image_path, p.audio_en_path, p.audio_am_path]));
  const pictures = pages.map((_, i) => links[i * 3]);
  const audio = pages.map((_, i) => ({ en: links[i * 3 + 1], am: links[i * 3 + 2] }));
  return { story: toStory(row, pages, pictures, false, audio) };
}

/**
 * Whether a family may open a story, by the same rules as storyForReading (free stories for
 * anyone, admins see everything including studio drafts, other stories when the family's plan
 * opens their pack), without signing any links. `free` says whether the story is free; null
 * when there's no such story.
 */
export async function storyOpenFor(slug: string, familyId: string | null, isAdmin = false): Promise<{ open: boolean; free: boolean } | null> {
  const builtIn = getStory(slug);
  if (builtIn) {
    if (builtIn.isFree || isAdmin) return { open: true, free: builtIn.isFree };
    return { open: canOpen(builtIn, await planOf(familyId)), free: false };
  }
  if (!hasSecretKey()) return null;
  let query = createSupabaseAdmin().from("stories").select(STORY_COLUMNS).eq("slug", slug);
  if (!isAdmin) query = query.eq("status", "published");
  const { data } = await query.maybeSingle();
  if (!data) return null;
  const row = data as StoryRow;
  const open = isAdmin || canOpen({ isFree: row.is_free, pack: rowPack(row) }, row.is_free ? null : await planOf(familyId));
  return { open, free: Boolean(row.is_free) };
}

/** A launch story as a family whose plan doesn't open it sees it: cover and title, no words. */
export function lockedLaunch(story: Story): Story {
  return { ...story, pack: packOf(story), pages: story.pages.map(() => ({ en: "", am: "" })), grownUps: undefined, teaches: undefined, locked: true };
}

/** Stories for one age group, or all of them. */
export function forAge(stories: Story[], band: AgeBand | null): Story[] {
  return band ? stories.filter((s) => s.ageBands.includes(band)) : stories;
}

/** Stories in one pack, or all of them. */
export function forPack(stories: Story[], pack: Pack | null): Story[] {
  return pack ? stories.filter((s) => packOf(s) === pack) : stories;
}
