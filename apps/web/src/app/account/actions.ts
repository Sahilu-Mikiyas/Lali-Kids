"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { CHILD_COOKIE } from "@/lib/family";
import { createSupabaseServer, currentProfile } from "@/lib/supabase/server";

const AGE_BANDS = ["3-5", "6-7", "8-9"];
const AVATARS = ["cub", "gugu", "bee"];

export async function addChild(form: FormData) {
  const profile = await currentProfile();
  if (!profile) return;
  const name = String(form.get("name") ?? "").trim().slice(0, 40);
  const age = String(form.get("age_band") ?? "3-5");
  const lang = form.get("preferred_lang") === "am" ? "am" : "en";
  const avatar = String(form.get("avatar") ?? "cub");
  if (!name || !AGE_BANDS.includes(age) || !AVATARS.includes(avatar)) return;
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("children")
    .insert({ family_id: profile.id, name, age_band: age, preferred_lang: lang, avatar })
    .select("id")
    .single();
  if (data) (await cookies()).set(CHILD_COOKIE, data.id, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  revalidatePath("/account");
  revalidatePath("/stories");
}

export async function removeChild(childId: string) {
  const profile = await currentProfile();
  if (!profile) return;
  const supabase = await createSupabaseServer();
  await supabase.from("children").delete().eq("id", childId).eq("family_id", profile.id);
  revalidatePath("/account");
  revalidatePath("/stories");
}

export async function setNightlyLimit(limit: number) {
  const profile = await currentProfile();
  if (!profile || !Number.isInteger(limit) || limit < 0 || limit > 20) return;
  const supabase = await createSupabaseServer();
  await supabase.from("profiles").update({ nightly_limit: limit }).eq("id", profile.id);
  revalidatePath("/account");
  revalidatePath("/stories");
}

/** Lets the family read more tonight by resetting the count (deletes nothing; marks the override). */
export async function allowMoreTonight() {
  const profile = await currentProfile();
  if (!profile) return;
  const supabase = await createSupabaseServer();
  // Moving today's completions to yesterday keeps stars and history but reopens the shelf.
  const { data: kids } = await supabase.from("children").select("id").eq("family_id", profile.id);
  const ids = (kids ?? []).map((k) => k.id);
  if (!ids.length) return;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const yesterday = new Date(start.getTime() - 1000).toISOString();
  await supabase.from("completions").update({ completed_at: yesterday }).in("child_id", ids).gte("completed_at", start.toISOString());
  revalidatePath("/stories");
  revalidatePath("/account");
}

export async function chooseChild(childId: string) {
  const profile = await currentProfile();
  if (!profile) return;
  const supabase = await createSupabaseServer();
  const { data } = await supabase.from("children").select("id").eq("id", childId).eq("family_id", profile.id).single();
  if (!data) return;
  (await cookies()).set(CHILD_COOKIE, childId, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  revalidatePath("/stories");
}

/** Called by the storybook when a child reaches The End. Returns the child's new star count. */
export async function recordStoryFinished(storyId: string): Promise<number | null> {
  const profile = await currentProfile();
  if (!profile) return null;
  const supabase = await createSupabaseServer();
  const wanted = (await cookies()).get(CHILD_COOKIE)?.value;
  let query = supabase.from("children").select("id").eq("family_id", profile.id).order("created_at").limit(1);
  if (wanted) query = supabase.from("children").select("id").eq("family_id", profile.id).eq("id", wanted).limit(1);
  const { data: kids } = await query;
  const child = kids?.[0];
  if (!child) return null;
  await supabase.from("completions").insert({ child_id: child.id, item_type: "story", item_id: storyId });
  const { data } = await supabase.from("children").select("stars").eq("id", child.id).single();
  revalidatePath("/stories");
  revalidatePath("/account");
  return data?.stars ?? null;
}
