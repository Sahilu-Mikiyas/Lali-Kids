"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { Lang, StoryPage } from "@/content/stories";
import { NARRATION_ACCEPT, NARRATION_MAX_BYTES, narrationType, pageWords, timesFit } from "@/lib/narration/shared";
import { WordTimer } from "./word-timer";

export type StudioStory = { id: string; title: Record<Lang, string>; isFree: boolean; kind: "launch" | "studio" | "draft"; pages: StoryPage[] };

export type AdminClip = { page: number; lang: Lang; narrator: string; durationMs: number; wordTimes: number[]; updatedAt: string; url: string | null };

type Load = { state: "loading" } | { state: "ready"; available: boolean; clips: AdminClip[] } | { state: "error"; message: string };

/** How long an audio file plays, read in the browser (the server converts nothing). */
async function clipDuration(file: File): Promise<number> {
  const url = URL.createObjectURL(file);
  try {
    const fromElement = await new Promise<number>((resolve) => {
      const a = new Audio();
      a.preload = "metadata";
      a.onloadedmetadata = () => resolve(Number.isFinite(a.duration) ? a.duration * 1000 : 0);
      a.onerror = () => resolve(0);
      a.src = url;
    });
    if (fromElement > 0) return Math.round(fromElement);
    // WebM files often don't say how long they are until decoded.
    const ctx = new AudioContext();
    try {
      const buf = await ctx.decodeAudioData(await file.arrayBuffer());
      return Math.round(buf.duration * 1000);
    } finally {
      void ctx.close();
    }
  } catch {
    return 0;
  } finally {
    URL.revokeObjectURL(url);
  }
}

const fmt = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}`;

type Status = "missing" | "uploaded" | "timed" | "retime";

function statusOf(clip: AdminClip | undefined, text: string): Status {
  if (!clip) return "missing";
  if (timesFit(clip.wordTimes, text)) return "timed";
  return clip.wordTimes.length ? "retime" : "uploaded";
}

const STATUS_LOOK: Record<Status, { label: string; cls: string }> = {
  missing: { label: "Missing", cls: "bg-line text-muted" },
  uploaded: { label: "Uploaded · not timed", cls: "bg-gold/30 text-[#7A3E00]" },
  retime: { label: "Uploaded · text changed, time again", cls: "bg-coral/15 text-coral-deep" },
  timed: { label: "Timed ✓", cls: "bg-teal text-white" },
};

export function NarrationStudio({ stories, initialStory }: { stories: StudioStory[]; initialStory?: string }) {
  const [storyId, setStoryId] = useState(() => (stories.some((s) => s.id === initialStory) ? initialStory! : stories[0]?.id));
  const [lang, setLang] = useState<Lang>("en");
  const [load, setLoad] = useState<Load>({ state: "loading" });
  const [gen, setGen] = useState(0);
  const [narrator, setNarrator] = useState("");
  const [busyPage, setBusyPage] = useState<number | null>(null);
  const [message, setMessage] = useState<{ page: number | null; text: string; bad?: boolean } | null>(null);
  const [timing, setTiming] = useState<number | null>(null);
  const story = stories.find((s) => s.id === storyId);

  useEffect(() => {
    if (!storyId) return;
    let alive = true;
    fetch(`/api/admin/narration?story=${encodeURIComponent(storyId)}`, { cache: "no-store" })
      .then(async (r) => {
        const b = (await r.json().catch(() => ({}))) as { available?: boolean; clips?: AdminClip[]; error?: string };
        if (!alive) return;
        if (!r.ok) setLoad({ state: "error", message: b.error ?? "Couldn't load the narration." });
        else setLoad({ state: "ready", available: Boolean(b.available), clips: b.clips ?? [] });
      })
      .catch(() => alive && setLoad({ state: "error", message: "Couldn't reach the server." }));
    return () => {
      alive = false;
    };
  }, [storyId, gen]);

  const reload = useCallback(() => setGen((g) => g + 1), []);
  const clips = useMemo(() => (load.state === "ready" ? load.clips.filter((c) => c.lang === lang) : []), [load, lang]);
  const byPage = useMemo(() => new Map(clips.map((c) => [c.page, c])), [clips]);
  // The narrator of this story in this language, as a starting point for new uploads.
  const knownNarrator = clips.find((c) => c.narrator)?.narrator ?? "";
  const narratorName = narrator || knownNarrator;

  if (!story) return <p className="text-muted">No stories yet.</p>;

  const upload = async (page: number, file: File) => {
    setMessage(null);
    if (!narrationType(file)) return setMessage({ page, text: "Narration must be MP3, M4A, WAV or WebM.", bad: true });
    if (file.size > NARRATION_MAX_BYTES) return setMessage({ page, text: "That file is over 15 MB.", bad: true });
    if (!narratorName.trim()) return setMessage({ page, text: "Type the narrator's name first (it shows as “Read by …”).", bad: true });
    setBusyPage(page);
    const duration = await clipDuration(file);
    if (!duration) {
      setBusyPage(null);
      return setMessage({ page, text: "Couldn't read that audio file. Try exporting it again as MP3 or WAV.", bad: true });
    }
    const form = new FormData();
    form.set("file", file);
    form.set("story", story.id);
    form.set("lang", lang);
    form.set("page", String(page));
    form.set("narrator", narratorName.trim());
    form.set("duration", String(duration));
    const r = await fetch("/api/admin/narration", { method: "POST", body: form }).catch(() => null);
    const b = r ? ((await r.json().catch(() => ({}))) as { error?: string }) : {};
    setBusyPage(null);
    if (!r?.ok) return setMessage({ page, text: b.error === "unavailable" ? "Narration isn't set up yet (migration 0011)." : (b.error ?? "Upload failed."), bad: true });
    setMessage({ page, text: `Page ${page + 1} uploaded (${fmt(duration)}). Now time the words.` });
    reload();
  };

  const remove = async (page: number) => {
    if (!window.confirm(`Remove the ${lang === "am" ? "Amharic" : "English"} narration of page ${page + 1}?`)) return;
    setBusyPage(page);
    const q = new URLSearchParams({ story: story.id, lang, page: String(page) });
    const r = await fetch(`/api/admin/narration?${q}`, { method: "DELETE" }).catch(() => null);
    setBusyPage(null);
    setMessage(r?.ok ? { page, text: `Page ${page + 1} narration removed.` } : { page, text: "Couldn't remove it.", bad: true });
    reload();
  };

  const counts = story.pages.reduce(
    (acc, p, i) => {
      acc[statusOf(byPage.get(i), p[lang])] += 1;
      return acc;
    },
    { missing: 0, uploaded: 0, retime: 0, timed: 0 } as Record<Status, number>,
  );
  const timingClip = timing !== null ? byPage.get(timing) : undefined;

  return (
    <div className="space-y-6" data-narration-studio="">
      <section className="grid gap-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)] md:grid-cols-[1fr_auto]">
        <label className="block space-y-1">
          <span className="text-sm font-bold text-muted">Story</span>
          <select
            value={story.id}
            onChange={(e) => {
              setStoryId(e.target.value);
              setLoad({ state: "loading" });
              setNarrator("");
              setMessage(null);
              setTiming(null);
            }}
            className="w-full rounded-xl border-2 border-line bg-white px-3 py-2 font-bold"
            data-narration-story=""
          >
            {stories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title.en} · {s.pages.length} pages · {s.kind === "launch" ? "launch story" : s.kind === "draft" ? "studio draft" : "studio"}
                {s.isFree ? " · free" : ""}
              </option>
            ))}
          </select>
        </label>
        <div className="space-y-1">
          <span className="text-sm font-bold text-muted">Language</span>
          <div className="flex gap-2">
            {(["en", "am"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => {
                  setLang(l);
                  setNarrator("");
                  setTiming(null);
                }}
                className={`rounded-xl border-2 px-4 py-2 font-bold ${lang === l ? "border-ink bg-ink text-white" : "border-line"} ${l === "am" ? "font-ethiopic" : ""}`}
              >
                {l === "en" ? "English" : "አማርኛ"}
              </button>
            ))}
          </div>
        </div>
        <label className="block space-y-1 md:col-span-2">
          <span className="text-sm font-bold text-muted">Narrator (shown as “Read by …”)</span>
          <input
            value={narratorName}
            onChange={(e) => setNarrator(e.target.value.slice(0, 60))}
            placeholder="e.g. Meron Getnet"
            className="w-full rounded-xl border-2 border-line px-3 py-2 outline-none focus:border-blue"
            data-narration-narrator=""
          />
        </label>
        <p className="text-sm text-muted md:col-span-2">
          {counts.timed} timed · {counts.uploaded + counts.retime} to time · {counts.missing} missing, of {story.pages.length} pages
        </p>
      </section>

      {load.state === "loading" && <p className="text-muted">Loading…</p>}
      {load.state === "error" && <p className="rounded-2xl bg-coral/10 p-4 font-bold text-coral-deep">{load.message}</p>}
      {load.state === "ready" && !load.available && (
        <p className="rounded-2xl bg-gold/20 p-4 font-bold text-[#7A3E00]">Narration isn&rsquo;t available yet: migration 0011 needs to be applied (and the secret key set).</p>
      )}

      {timing !== null && timingClip?.url && (
        <WordTimer
          key={`${story.id}-${lang}-${timing}-${timingClip.updatedAt}`}
          storyId={story.id}
          lang={lang}
          page={timing}
          text={story.pages[timing][lang]}
          clip={timingClip}
          onClose={() => setTiming(null)}
          onSaved={() => {
            setMessage({ page: timing, text: `Page ${timing + 1} timed ✓` });
            reload();
          }}
        />
      )}

      <ol className="space-y-3">
        {story.pages.map((p, i) => {
          const text = p[lang];
          const clip = byPage.get(i);
          const status = statusOf(clip, text);
          const look = STATUS_LOOK[status];
          return (
            <li key={i} className="space-y-3 rounded-[24px] bg-white p-5 shadow-[0_4px_0_var(--color-line)]" data-narration-page={i} data-status={status}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-soft font-black text-blue">{i + 1}</span>
                <span className={`rounded-full px-3 py-1 text-sm font-bold ${look.cls}`}>{look.label}</span>
                {clip && (
                  <span className="text-sm text-muted">
                    {clip.narrator} · {fmt(clip.durationMs)} · {pageWords(text).length} words
                  </span>
                )}
              </div>
              <p className={`rounded-2xl bg-paper p-3 leading-relaxed text-paper-ink ${lang === "am" ? "font-ethiopic" : ""}`}>{text || <span className="text-muted">(no text on this page)</span>}</p>
              {text.includes("{name}") && (
                <p className="rounded-2xl bg-gold/20 p-3 text-sm font-bold text-[#7A3E00]" data-narration-name-note="">
                  This page says the reading child&rsquo;s name ({"{name}"}). A recording can&rsquo;t say every name, so the reader uses the browser&rsquo;s voice
                  for this page even when narration is uploaded. Narration here is only kept for later.
                </p>
              )}
              {clip?.url && <audio controls preload="none" src={clip.url} className="w-full" />}
              <div className="flex flex-wrap items-center gap-3">
                <label className={`btn btn-plain !py-2 !text-base ${busyPage === i ? "pointer-events-none opacity-50" : "cursor-pointer"}`}>
                  {clip ? "Replace audio" : "Upload audio"}
                  <input
                    type="file"
                    accept={NARRATION_ACCEPT}
                    className="sr-only"
                    data-narration-file={i}
                    disabled={busyPage !== null}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      e.target.value = "";
                      if (f) void upload(i, f);
                    }}
                  />
                </label>
                {clip?.url && (
                  <button type="button" className="btn btn-primary !py-2 !text-base" onClick={() => setTiming(i)} data-narration-time={i}>
                    ⏱ {status === "timed" ? "Check the timing" : "Time the words"}
                  </button>
                )}
                {clip && (
                  <button type="button" className="font-bold text-muted hover:text-coral" disabled={busyPage !== null} onClick={() => void remove(i)}>
                    Remove
                  </button>
                )}
                {busyPage === i && <span className="text-sm font-bold text-muted">Working…</span>}
              </div>
              {message?.page === i && <p className={`text-sm font-bold ${message.bad ? "text-coral-deep" : "text-teal"}`}>{message.text}</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
