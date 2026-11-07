import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";

/*
  The read-along microphone, server side (migration 0011):
  - profiles.mic_listen: the parent's choice to let the browser's speech service listen;
  - reader_stars: pages a child read aloud.
  Before the migration is applied the setting reads as null (the browser's own copy is used)
  and stars report that they weren't kept.
*/

/** The family's microphone setting, or null when it can't be read yet. */
export async function micListenSetting(supabase: SupabaseClient, familyId: string): Promise<boolean | null> {
  const { data, error } = await supabase.from("profiles").select("mic_listen").eq("id", familyId).maybeSingle();
  if (error || !data) return null;
  return Boolean((data as { mic_listen?: boolean }).mic_listen);
}

/** Saves the setting as the parent (their own row; the column is in their update grant). */
export async function saveMicListen(supabase: SupabaseClient, familyId: string, on: boolean): Promise<boolean> {
  const { error } = await supabase.from("profiles").update({ mic_listen: on }).eq("id", familyId);
  return !error;
}

/** A page the child read aloud. The caller has checked the child belongs to the family. */
export async function saveReaderStar(childId: string, storyId: string, page: number, lang: "en" | "am", how: "listened" | "recorded"): Promise<boolean> {
  if (!hasSecretKey()) return false;
  const { error } = await createSupabaseAdmin()
    .from("reader_stars")
    .upsert({ child_id: childId, story_id: storyId, page, lang, how, read_at: new Date().toISOString() }, { onConflict: "child_id,story_id,page" });
  return !error;
}

/** Pages read aloud since a time, per child (for the weekly note). Empty before the migration. */
export async function pagesReadAloudSince(childIds: string[], sinceIso: string): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  if (!childIds.length || !hasSecretKey()) return counts;
  const { data, error } = await createSupabaseAdmin().from("reader_stars").select("child_id").in("child_id", childIds).gte("read_at", sinceIso).limit(20000);
  if (error) return counts;
  for (const r of (data ?? []) as { child_id: string }[]) counts.set(r.child_id, (counts.get(r.child_id) ?? 0) + 1);
  return counts;
}
