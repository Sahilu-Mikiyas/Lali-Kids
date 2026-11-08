import "server-only";

import type { AgeBand } from "@/content/stories";
import { hasSecretKey } from "@/lib/supabase/env";
import { familyEntitlements } from "@/lib/entitlements";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { MEDIA_BUCKET } from "@/lib/stories";

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

type Row = {
  id: string;
  slug: string;
  title: string;
  title_am: string | null;
  description: string | null;
  url: string;
  age_bands: AgeBand[];
  color: string;
  thumbnail_path: string | null;
  is_free: boolean;
};

const COLUMNS = "id, slug, title, title_am, description, url, age_bands, color, thumbnail_path, is_free";

async function toGames(rows: Row[], open: boolean): Promise<Game[]> {
  const paths = rows.map((r) => r.thumbnail_path).filter((p): p is string => Boolean(p));
  const { data } = paths.length ? await createSupabaseAdmin().storage.from(MEDIA_BUCKET).createSignedUrls(paths, 3600) : { data: [] };
  const link = new Map((data ?? []).map((d) => [d.path, d.signedUrl]));
  return rows.map((r) => {
    const locked = !r.is_free && !open;
    return {
      id: r.id,
      slug: r.slug,
      title: r.title,
      titleAm: r.title_am,
      description: r.description,
      // A locked game's address is never sent to the browser.
      url: locked ? "" : r.url,
      ageBands: r.age_bands,
      color: r.color,
      thumbnail: r.thumbnail_path ? (link.get(r.thumbnail_path) ?? null) : null,
      isFree: r.is_free,
      locked,
    };
  });
}

export async function shelfGames(familyId: string | null): Promise<Game[]> {
  if (!hasSecretKey()) return [];
  const [{ data }, open] = await Promise.all([
    createSupabaseAdmin().from("games").select(COLUMNS).eq("status", "published").order("sort").order("created_at"),
    // Paid games come with Family and VIP (src/lib/entitlements.ts); free games are for everyone.
    familyId ? familyEntitlements(familyId).then((e) => e.games) : Promise.resolve(false),
  ]);
  return toGames((data ?? []) as Row[], open);
}

export async function gameBySlug(slug: string, familyId: string | null, isAdmin = false): Promise<Game | null> {
  if (!hasSecretKey()) return null;
  let query = createSupabaseAdmin().from("games").select(COLUMNS).eq("slug", slug);
  if (!isAdmin) query = query.eq("status", "published");
  const { data } = await query.maybeSingle();
  if (!data) return null;
  const open = isAdmin || (familyId ? (await familyEntitlements(familyId)).games : false);
  return (await toGames([data as Row], open))[0];
}

/** Midnight in Addis Ababa (UTC+3, no daylight saving), so "today" matches the family's day. */
export function addisMidnightIso(now = new Date()): string {
  const addis = new Date(now.getTime() + 3 * 3600_000);
  addis.setUTCHours(0, 0, 0, 0);
  return new Date(addis.getTime() - 3 * 3600_000).toISOString();
}

/** Seconds of games this child has played today. */
export async function secondsPlayedToday(childId: string): Promise<number> {
  const { data } = await createSupabaseAdmin().from("game_sessions").select("seconds").eq("child_id", childId).gte("started_at", addisMidnightIso());
  return (data ?? []).reduce((sum, r) => sum + r.seconds, 0);
}
