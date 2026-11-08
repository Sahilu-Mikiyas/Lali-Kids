"use server";

import { revalidate } from "@/lib/revalidate";
import { cookies } from "next/headers";

import { CHILD_COOKIE, loadFamily, roomForChild } from "@/lib/family";
import { addisMidnightIso } from "@/lib/games";
import { isStoryId } from "@/lib/stickers/catalog";
import { randomBytes } from "node:crypto";

import { createSupabaseAdmin, createSupabaseServer, currentProfile } from "@/lib/supabase/server";
import { botUsername, telegramConfigured } from "@/lib/telegram";
import { deleteFamilyAccount } from "@/lib/account";
import { redirect } from "next/navigation";

const AGE_BANDS = ["3-5", "6-7", "8-9"];
const AVATARS = ["cub", "gugu", "bee"];

export async function addChild(form: FormData) {
  const family = await loadFamily();
  if (!family) return;
  const profile = family.profile;
  // Each plan has room for so many children (src/lib/entitlements.ts); the form says so too.
  if (!roomForChild(family)) return;
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
  revalidate("/account");
  revalidate("/stories");
}

export async function removeChild(childId: string) {
  const profile = await currentProfile();
  if (!profile) return;
  const supabase = await createSupabaseServer();
  await supabase.from("children").delete().eq("id", childId).eq("family_id", profile.id);
  revalidate("/account");
  revalidate("/stories");
}

export async function setNightlyLimit(limit: number) {
  const profile = await currentProfile();
  if (!profile || !Number.isInteger(limit) || limit < 0 || limit > 20) return;
  const supabase = await createSupabaseServer();
  await supabase.from("profiles").update({ nightly_limit: limit }).eq("id", profile.id);
  revalidate("/account");
  revalidate("/stories");
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
  // "Tonight" is Addis Ababa's day, as everywhere else (the server's own clock runs on UTC).
  const start = addisMidnightIso();
  const yesterday = new Date(new Date(start).getTime() - 1000).toISOString();
  await supabase.from("completions").update({ completed_at: yesterday }).in("child_id", ids).gte("completed_at", start);
  revalidate("/stories");
  revalidate("/account");
}

export async function chooseChild(childId: string) {
  const family = await loadFamily();
  // Only the family's own children who can read on its plan (read-only ones are kept, not chosen).
  if (!family?.children.some((c) => c.id === childId && !c.readOnly)) return;
  (await cookies()).set(CHILD_COOKIE, childId, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  revalidate("/stories");
}

/** Called by the storybook when a child reaches The End. Returns the child's new star count. */
export async function recordStoryFinished(storyId: string): Promise<number | null> {
  if (!isStoryId(storyId)) return null;
  // The reading child: the family's own, chosen (or the first) among those who can read on its plan.
  const family = await loadFamily();
  const child = family?.current;
  if (!child) return null;
  const supabase = await createSupabaseServer();
  await supabase.from("completions").insert({ child_id: child.id, item_type: "story", item_id: storyId });
  const { data } = await supabase.from("children").select("stars").eq("id", child.id).single();
  revalidate("/stories");
  revalidate("/account");
  return data?.stars ?? null;
}

export async function setShowAllAges(show: boolean) {
  const profile = await currentProfile();
  if (!profile) return;
  const supabase = await createSupabaseServer();
  await supabase.from("profiles").update({ show_all_ages: Boolean(show) }).eq("id", profile.id);
  revalidate("/account");
  revalidate("/stories");
  revalidate("/games");
}

export async function setGamesMinutes(minutes: number) {
  const profile = await currentProfile();
  if (!profile || ![0, 10, 20, 30, 60].includes(minutes)) return;
  const supabase = await createSupabaseServer();
  await supabase.from("profiles").update({ games_minutes: minutes }).eq("id", profile.id);
  revalidate("/account");
  revalidate("/games");
}

/** Makes a one-time Telegram link for this family (valid 30 minutes). */
export async function telegramLink(): Promise<{ url: string } | { error: string }> {
  const profile = await currentProfile();
  if (!profile) return { error: "Please sign in again." };
  if (!telegramConfigured()) return { error: "Telegram isn't set up on Lali yet." };
  const bot = await botUsername();
  if (!bot) return { error: "Couldn't reach Telegram. Please try again." };
  const code = randomBytes(12).toString("hex");
  await createSupabaseAdmin()
    .from("profiles")
    .update({ telegram_link_code: code, telegram_link_expires: new Date(Date.now() + 30 * 60_000).toISOString() })
    .eq("id", profile.id);
  return { url: `https://t.me/${bot}?start=${code}` };
}

export async function telegramDisconnect() {
  const profile = await currentProfile();
  if (!profile) return;
  await createSupabaseAdmin().from("profiles").update({ telegram_chat_id: null }).eq("id", profile.id);
  revalidate("/account");
}

/** Deletes the family's account for good, after the parent typed the confirmation word. */
export async function deleteAccount(confirmation: string): Promise<{ error: string } | void> {
  const profile = await currentProfile();
  if (!profile) return { error: "Please sign in again." };
  if (!["DELETE", "ሰርዝ"].includes(confirmation.trim().toUpperCase())) return { error: "Type the word exactly to confirm." };
  const result = await deleteFamilyAccount(profile.id);
  if (!result.ok) {
    console.error("[account] delete failed", result.error);
    return { error: "We couldn't delete the account. Please try again or contact us." };
  }
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut().catch(() => {});
  (await cookies()).delete(CHILD_COOKIE);
  redirect("/?deleted=1");
}
