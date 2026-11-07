import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import { STORIES, type Story } from "@/content/stories";
import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { shelfStories } from "@/lib/stories";
import { addisDay, earnedStickers, EMPTY_BASIS, stickerCatalog, type StickerBasis, type StickerDef, type StickerPosition, type StickerStory } from "./catalog";

/*
  Stickers for a signed-in child. Earned stickers come from `completions` (no table of their
  own); Find Lali finds and album positions live in `lali_finds` and `sticker_positions`
  (migration 0009). Until that migration is applied those reads fail quietly and come back
  empty, and writes report that they weren't kept.
*/

/** Reads the child's record with the reading parent's client (row-level security applies). */
export async function loadStickerBasis(supabase: SupabaseClient, childId: string): Promise<StickerBasis> {
  const [done, finds, places, reads] = await Promise.all([
    supabase.from("completions").select("item_id, completed_at").eq("child_id", childId).eq("item_type", "story").limit(5000),
    supabase.from("lali_finds").select("story_id, page").eq("child_id", childId).limit(5000),
    supabase.from("sticker_positions").select("sticker_id, album_page, x, y, rotation").eq("child_id", childId).limit(500),
    // Reader stars (migration 0011); empty until it is applied.
    supabase.from("reader_stars").select("story_id, page").eq("child_id", childId).limit(5000),
  ]);
  const basis: StickerBasis = { ...EMPTY_BASIS, finds: {}, positions: {}, reads: {} };
  const rows = (done.data ?? []) as { item_id: string; completed_at: string }[];
  basis.finished = [...new Set(rows.map((r) => r.item_id))];
  basis.days = [...new Set(rows.map((r) => addisDay(r.completed_at)))];
  for (const f of (finds.error ? [] : (finds.data ?? [])) as { story_id: string; page: number }[]) {
    (basis.finds[f.story_id] ??= []).push(f.page);
  }
  for (const r of (reads.error ? [] : (reads.data ?? [])) as { story_id: string; page: number }[]) {
    (basis.reads![r.story_id] ??= []).push(r.page);
  }
  for (const p of (places.error ? [] : (places.data ?? [])) as { sticker_id: string; album_page: number; x: number; y: number; rotation: number }[]) {
    basis.positions[p.sticker_id] = { page: p.album_page, x: p.x, y: p.y, r: p.rotation };
  }
  return basis;
}

/** Saves a find with the secret key, after the caller checked the child is theirs. */
export async function saveFind(childId: string, storyId: string, page: number): Promise<boolean> {
  if (!hasSecretKey()) return false;
  const { error } = await createSupabaseAdmin().from("lali_finds").upsert({ child_id: childId, story_id: storyId, page }, { onConflict: "child_id,story_id,page", ignoreDuplicates: true });
  return !error;
}

export async function savePosition(childId: string, stickerId: string, p: StickerPosition): Promise<boolean> {
  if (!hasSecretKey()) return false;
  const { error } = await createSupabaseAdmin()
    .from("sticker_positions")
    .upsert({ child_id: childId, sticker_id: stickerId, album_page: p.page, x: p.x, y: p.y, rotation: p.r ?? 0, updated_at: new Date().toISOString() }, { onConflict: "child_id,sticker_id" });
  return !error;
}

/** Page counts of studio stories (for their golden stickers). */
async function studioPageCounts(slugs: string[]): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  if (!slugs.length || !hasSecretKey()) return counts;
  const admin = createSupabaseAdmin();
  const { data: rows } = await admin.from("stories").select("id, slug").in("slug", slugs);
  const bySlugId = new Map((rows ?? []).map((r: { id: string; slug: string }) => [r.id, r.slug]));
  if (!bySlugId.size) return counts;
  const { data: pages } = await admin.from("story_pages").select("story_id").in("story_id", [...bySlugId.keys()]);
  for (const p of (pages ?? []) as { story_id: string }[]) {
    const slug = bySlugId.get(p.story_id);
    if (slug) counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }
  return counts;
}

/** Every story with a sticker: the launch stories and published studio stories. */
export async function stickerStories(familyId: string | null): Promise<StickerStory[]> {
  const shelf: Story[] = await shelfStories(familyId).catch(() => STORIES);
  const launch = new Set(STORIES.map((s) => s.id));
  const studio = shelf.filter((s) => !launch.has(s.id));
  const counts = await studioPageCounts(studio.map((s) => s.id)).catch(() => new Map<string, number>());
  return [
    ...STORIES.map((s) => ({ id: s.id, title: s.title, color: s.color, pageCount: s.pages.length })),
    ...studio.map((s) => ({ id: s.id, title: s.title, color: s.color, pageCount: counts.get(s.id) ?? 0 })),
  ];
}

export type StickerSummary = {
  earned: (StickerDef & { earned: true })[];
  available: (StickerDef & { earned: boolean })[];
  count: number;
  total: number;
};

/** The album for the API: earned stickers, and every sticker with whether it's earned. */
export function summarise(stories: StickerStory[], basis: StickerBasis): StickerSummary {
  const catalog = stickerCatalog(stories);
  const pages = new Map(stories.map((s) => [s.id, s.pageCount]));
  const earned = earnedStickers(basis, (id) => pages.get(id));
  const available = catalog.map((d) => ({ ...d, earned: earned.has(d.id) }));
  return {
    earned: available.filter((d): d is StickerDef & { earned: true } => d.earned),
    available,
    count: available.filter((d) => d.earned).length,
    total: catalog.length,
  };
}
