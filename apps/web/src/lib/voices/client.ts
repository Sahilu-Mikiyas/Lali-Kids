"use client";

import { useCallback, useEffect, useState } from "react";

import { appAuthHeaders } from "@/lib/in-app";
import { groupVoices, type FamilyVoice, type Recording } from "./shared";

export type VoicesStatus = "loading" | "signed-out" | "unavailable" | "ready";
export type VoicesState = { status: VoicesStatus; voices: FamilyVoice[]; recordings: Recording[] };

/** Fetches the family's recordings, for one story (with playback links) or all of them. */
export async function fetchVoices(storyId?: string): Promise<VoicesState> {
  try {
    const r = await fetch(storyId ? `/api/voices?story=${encodeURIComponent(storyId)}` : "/api/voices", { headers: appAuthHeaders(), cache: "no-store" });
    if (r.status === 401) return { status: "signed-out", voices: [], recordings: [] };
    if (!r.ok) return { status: "unavailable", voices: [], recordings: [] };
    const body = (await r.json()) as { recordings?: Recording[]; available?: boolean; signedIn?: boolean };
    if (body.signedIn === false) return { status: "signed-out", voices: [], recordings: [] };
    if (!body.available) return { status: "unavailable", voices: [], recordings: [] };
    const recordings = body.recordings ?? [];
    return { status: "ready", voices: groupVoices(recordings), recordings };
  } catch {
    return { status: "unavailable", voices: [], recordings: [] };
  }
}

/** The family voices for a story in the reader. Hidden (empty) when signed out or unavailable. */
export function useFamilyVoices(storyId: string): [VoicesState, () => void] {
  const [state, setState] = useState<VoicesState>({ status: "loading", voices: [], recordings: [] });
  const [gen, setGen] = useState(0);
  useEffect(() => {
    let alive = true;
    fetchVoices(storyId).then((s) => alive && setState(s));
    return () => {
      alive = false;
    };
  }, [storyId, gen]);
  return [state, useCallback(() => setGen((g) => g + 1), [])];
}

export type Upload = { ok: true; recording: Recording } | { ok: false; error: "signed-out" | "too-big" | "unavailable" | "failed" | "needs-plan" };

export async function uploadVoice(clip: { blob: Blob; durationMs: number }, meta: { storyId: string; lang: "en" | "am"; page: number; name: string }): Promise<Upload> {
  const type = clip.blob.type.split(";")[0] || "audio/webm";
  const ext = type.includes("mp4") ? "m4a" : type.includes("ogg") ? "ogg" : type.includes("aac") ? "aac" : "webm";
  const form = new FormData();
  form.set("file", new File([clip.blob], `page-${meta.page + 1}.${ext}`, { type }));
  form.set("story", meta.storyId);
  form.set("lang", meta.lang);
  form.set("page", String(meta.page));
  form.set("name", meta.name);
  form.set("duration", String(Math.round(clip.durationMs)));
  try {
    const r = await fetch("/api/voices", { method: "POST", body: form, headers: appAuthHeaders() });
    if (r.status === 401) return { ok: false, error: "signed-out" };
    if (r.status === 413) return { ok: false, error: "too-big" };
    if (r.status === 402) return { ok: false, error: "needs-plan" };
    if (r.status === 503) return { ok: false, error: "unavailable" };
    if (!r.ok) return { ok: false, error: "failed" };
    const body = (await r.json()) as { recording: Recording };
    return { ok: true, recording: body.recording };
  } catch {
    return { ok: false, error: "failed" };
  }
}

export async function deleteVoice(id: string | "all"): Promise<boolean> {
  try {
    const r = await fetch(id === "all" ? "/api/voices?all=1" : `/api/voices/${encodeURIComponent(id)}`, { method: "DELETE", headers: appAuthHeaders() });
    return r.ok;
  } catch {
    return false;
  }
}
