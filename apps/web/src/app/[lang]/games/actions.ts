"use server";

import { loadFamily } from "@/lib/family";
import { gameBySlug, secondsPlayedToday } from "@/lib/games";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export type GameStart =
  | { ok: true; sessionId: string | null; secondsLeft: number | null }
  | { ok: false; reason: "locked" | "off" | "time-up" | "missing" };

/** Opens a play session for the chosen child and says how much game time is left today. */
export async function startGame(slug: string): Promise<GameStart> {
  const family = await loadFamily();
  const game = await gameBySlug(slug, family?.profile.id ?? null, family?.profile.role === "admin");
  if (!game) return { ok: false, reason: "missing" };
  if (game.locked) return { ok: false, reason: "locked" };
  const child = family?.current;
  if (!family || !child) return { ok: true, sessionId: null, secondsLeft: null };
  if (family.gamesMinutes === 0) return { ok: false, reason: "off" };

  const left = family.gamesMinutes * 60 - (await secondsPlayedToday(child.id));
  if (left <= 0) return { ok: false, reason: "time-up" };
  const { data } = await createSupabaseAdmin()
    .from("game_sessions")
    .insert({ family_id: family.profile.id, child_id: child.id, game_id: game.id })
    .select("id")
    .single();
  return { ok: true, sessionId: data?.id ?? null, secondsLeft: left };
}

async function ownSession(sessionId: string) {
  const family = await loadFamily();
  if (!family) return null;
  const { data } = await createSupabaseAdmin()
    .from("game_sessions")
    .select("id, child_id, seconds, best_score")
    .eq("id", sessionId)
    .eq("family_id", family.profile.id)
    .maybeSingle();
  return data ? { family, session: data } : null;
}

/** Adds played time (sent every few seconds while the game is on screen); returns seconds left today. */
export async function tickGame(sessionId: string, seconds: number): Promise<number | null> {
  const own = await ownSession(sessionId);
  if (!own) return null;
  const add = Math.max(0, Math.min(30, Math.round(seconds)));
  await createSupabaseAdmin().from("game_sessions").update({ seconds: own.session.seconds + add }).eq("id", sessionId);
  if (!own.session.child_id) return null;
  return own.family.gamesMinutes * 60 - (await secondsPlayedToday(own.session.child_id));
}

export async function saveScore(sessionId: string, score: number) {
  const own = await ownSession(sessionId);
  if (!own || !Number.isFinite(score)) return;
  const s = Math.max(0, Math.min(1_000_000, Math.round(score)));
  if (own.session.best_score === null || s > own.session.best_score) {
    await createSupabaseAdmin().from("game_sessions").update({ best_score: s }).eq("id", sessionId);
  }
}
