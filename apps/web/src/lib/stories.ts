import "server-only";

import { getStory, STORIES, type AgeBand, type Category, type Story } from "@/content/stories";
import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin, hasActivePlan } from "@/lib/supabase/server";

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
};

type PageRow = { position: number; text_en: string; text_am: string; image_path: string | null; audio_en_path: string | null; audio_am_path: string | null };

const STORY_COLUMNS = "id, slug, title_en, title_am, category, age_bands, color, cover_page, is_free";

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
    locked,
  };
}

/**
 * Every story on the shelf: the launch stories plus published studio stories.
 * Shelf cards only carry the cover picture; paid stories are marked locked for families without a plan.
 */
export async function shelfStories(familyId: string | null): Promise<Story[]> {
  if (!hasSecretKey()) return STORIES.map((st) => (st.isFree ? st : lockedLaunch(st)));
  const admin = createSupabaseAdmin();
  const [{ data: rows }, open] = await Promise.all([
    admin.from("stories").select(STORY_COLUMNS).eq("status", "published").order("created_at", { ascending: false }),
    familyId ? hasActivePlan(familyId) : Promise.resolve(false),
  ]);
  // Paid launch stories show on the shelf with a lock, and without their text, until the family has a plan.
  const launch = STORIES.map((st) => (st.isFree || open ? st : lockedLaunch(st)));
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
  const studio = withPages.map((r, i) => ({
    ...toStory(r, [{ position: 0, text_en: "", text_am: "", image_path: null, audio_en_path: null, audio_am_path: null }], [covers[i]], !r.is_free && !open),
    coverPage: 0,
  }));
  return [...studio, ...launch];
}

export type StoryAccess = { story: Story } | { locked: Story } | null;

/** A whole story for reading, with picture and narration links, if the family may read it. */
export async function storyForReading(slug: string, familyId: string | null, isAdmin = false): Promise<StoryAccess> {
  const builtIn = getStory(slug);
  if (builtIn) {
    if (builtIn.isFree || isAdmin) return { story: builtIn };
    const open = familyId && hasSecretKey() ? await hasActivePlan(familyId) : false;
    return open ? { story: builtIn } : { locked: lockedLaunch(builtIn) };
  }
  if (!hasSecretKey()) return null;

  const admin = createSupabaseAdmin();
  // Admins can preview drafts from the story studio.
  let query = admin.from("stories").select(STORY_COLUMNS).eq("slug", slug);
  if (!isAdmin) query = query.eq("status", "published");
  const { data: row } = await query.maybeSingle();
  if (!row) return null;
  const { data: pageRows } = await admin
    .from("story_pages")
    .select("position, text_en, text_am, image_path, audio_en_path, audio_am_path")
    .eq("story_id", row.id)
    .order("position");
  const pages = (pageRows ?? []) as PageRow[];
  if (!pages.length) return null;

  const open = isAdmin || row.is_free || (familyId ? await hasActivePlan(familyId) : false);
  if (!open) {
    const cover = Math.min(row.cover_page, pages.length - 1);
    const [coverLink] = await signPaths([pages[cover].image_path]);
    // Locked: title and cover only, never the text, pictures or narration.
    const blank = { position: 0, text_en: "", text_am: "", image_path: null, audio_en_path: null, audio_am_path: null };
    return { locked: { ...toStory(row as StoryRow, [blank], [coverLink], true), coverPage: 0 } };
  }

  const links = await signPaths(pages.flatMap((p) => [p.image_path, p.audio_en_path, p.audio_am_path]));
  const pictures = pages.map((_, i) => links[i * 3]);
  const audio = pages.map((_, i) => ({ en: links[i * 3 + 1], am: links[i * 3 + 2] }));
  return { story: toStory(row as StoryRow, pages, pictures, false, audio) };
}

/** A paid launch story as a family without a plan sees it: cover and title, no words. */
export function lockedLaunch(story: Story): Story {
  return { ...story, pages: story.pages.map(() => ({ en: "", am: "" })), grownUps: undefined, locked: true };
}

/** Stories for one age group, or all of them. */
export function forAge(stories: Story[], band: AgeBand | null): Story[] {
  return band ? stories.filter((s) => s.ageBands.includes(band)) : stories;
}
