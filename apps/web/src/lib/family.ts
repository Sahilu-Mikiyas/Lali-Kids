import "server-only";

import { cookies } from "next/headers";

import { createSupabaseServer, currentProfile } from "@/lib/supabase/server";

export const CHILD_COOKIE = "lali-child";

export type Child = { id: string; name: string; age_band: string; preferred_lang: "en" | "am"; stars: number; avatar: "cub" | "gugu" | "bee" };

export type Family = {
  profile: NonNullable<Awaited<ReturnType<typeof currentProfile>>>;
  children: Child[];
  /** The child currently reading, chosen on the stories page. */
  current: Child | null;
  nightlyLimit: number;
  /** Children see every age group, not only their own. */
  showAllAges: boolean;
  /** Minutes of games per child per day; 0 turns games off. */
  gamesMinutes: number;
  /** Stories the current child finished since midnight. */
  readTonight: number;
};

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

/** Everything the site needs to know about the signed-in family, or null when signed out. */
export async function loadFamily(): Promise<Family | null> {
  const profile = await currentProfile();
  if (!profile) return null;
  const supabase = await createSupabaseServer();
  const [{ data: children }, { data: settings }] = await Promise.all([
    supabase.from("children").select("id, name, age_band, preferred_lang, stars, avatar").eq("family_id", profile.id).order("created_at"),
    supabase.from("profiles").select("nightly_limit, show_all_ages, games_minutes").eq("id", profile.id).single(),
  ]);
  const list = (children ?? []) as Child[];
  const wanted = (await cookies()).get(CHILD_COOKIE)?.value;
  const current = list.find((c) => c.id === wanted) ?? list[0] ?? null;

  let readTonight = 0;
  if (current) {
    const { count } = await supabase
      .from("completions")
      .select("id", { count: "exact", head: true })
      .eq("child_id", current.id)
      .in("item_type", ["story", "book"])
      .gte("completed_at", startOfToday());
    readTonight = count ?? 0;
  }
  return { profile, children: list, current, nightlyLimit: settings?.nightly_limit ?? 3,
    showAllAges: settings?.show_all_ages ?? false,
    gamesMinutes: settings?.games_minutes ?? 20,
    readTonight,
  };
}

export function limitReached(f: Family | null): boolean {
  return Boolean(f && f.current && f.nightlyLimit > 0 && f.readTonight >= f.nightlyLimit);
}
