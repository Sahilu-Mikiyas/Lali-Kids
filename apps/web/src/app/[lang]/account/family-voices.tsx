"use client";

import { useEffect, useState } from "react";

import { setFindHints, useFindHints } from "@/lib/stickers/store";
import { deleteVoice, fetchVoices, type VoicesState } from "@/lib/voices/client";
import type { Recording } from "@/lib/voices/shared";
import { useLang, useT } from "@/i18n/provider";

type Group = { key: string; storyId: string; name: string; langs: string[]; pages: number; ids: string[] };

function groups(recordings: Recording[]): Group[] {
  const by = new Map<string, Group & { seen: Set<string> }>();
  for (const r of recordings) {
    const key = `${r.storyId}|${r.name}`;
    const g = by.get(key) ?? { key, storyId: r.storyId, name: r.name, langs: [], pages: 0, ids: [], seen: new Set<string>() };
    if (!g.langs.includes(r.lang)) g.langs.push(r.lang);
    g.ids.push(r.id);
    g.seen.add(`${r.lang}:${r.page}`);
    g.pages = g.seen.size;
    by.set(key, g);
  }
  return [...by.values()];
}

/**
 * "Family voices" in the Grown-ups' corner: every recording, by story and reader, with delete
 * and delete-all. Hidden until recording is available (migration 0009 and the secret key).
 */
export function FamilyVoicesCard({ titles }: { titles: Record<string, { en: string; am: string }> }) {
  const t = useT().voices;
  const lang = useLang();
  const [state, setState] = useState<VoicesState | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [gen, setGen] = useState(0);

  useEffect(() => {
    let alive = true;
    fetchVoices().then((s) => alive && setState(s));
    return () => {
      alive = false;
    };
  }, [gen]);

  if (!state || state.status !== "ready") return null;
  const list = groups(state.recordings);

  const remove = async (ids: string[] | "all") => {
    setBusy(true);
    if (ids === "all") await deleteVoice("all");
    else for (const id of ids) await deleteVoice(id);
    setBusy(false);
    setConfirm(null);
    setGen((g) => g + 1);
  };

  return (
    <section className="mt-10 space-y-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]" data-family-voices="">
      <div className="space-y-1">
        <h2 className="font-display text-2xl font-black">🎙️ {t.family}</h2>
        <p className="text-muted">{t.familySub}</p>
      </div>
      {list.length === 0 ? (
        <p className="rounded-2xl bg-sky-soft p-4 text-muted">{t.none}</p>
      ) : (
        <ul className="divide-y-2 divide-line">
          {list.map((g) => (
            <li key={g.key} className="flex flex-wrap items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="font-bold">{titles[g.storyId]?.[lang] ?? g.storyId}</p>
                <p className="text-sm text-muted">
                  {g.name} · {t.pagesCount(g.pages)} · {g.langs.map((l) => (l === "am" ? "አማርኛ" : "English")).join(", ")}
                </p>
              </div>
              {confirm === g.key ? (
                <span className="flex gap-2">
                  <button type="button" disabled={busy} className="rounded-xl bg-coral px-3 py-1.5 font-bold text-white" onClick={() => remove(g.ids)}>
                    {t.yesDelete}
                  </button>
                  <button type="button" className="rounded-xl border-2 border-line px-3 py-1.5 font-bold" onClick={() => setConfirm(null)}>
                    {t.cancel}
                  </button>
                </span>
              ) : (
                <button type="button" className="rounded-xl border-2 border-line px-3 py-1.5 font-bold text-coral-deep hover:border-coral" onClick={() => setConfirm(g.key)}>
                  {t.del}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {list.length > 0 &&
        (confirm === "all" ? (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-coral/10 p-3">
            <p className="flex-1 font-bold text-coral-deep">{t.delAllConfirm}</p>
            <button type="button" disabled={busy} className="rounded-xl bg-coral px-3 py-1.5 font-bold text-white" onClick={() => remove("all")}>
              {t.yesDelete}
            </button>
            <button type="button" className="rounded-xl border-2 border-line px-3 py-1.5 font-bold" onClick={() => setConfirm(null)}>
              {t.cancel}
            </button>
          </div>
        ) : (
          <button type="button" className="font-bold text-coral-deep hover:underline" onClick={() => setConfirm("all")}>
            {t.delAll}
          </button>
        ))}
    </section>
  );
}

/** Find Lali hints on or off (kept in this browser, like the book's sound setting). */
export function FindHintsCard() {
  const t = useT().findLali;
  const hints = useFindHints();
  return (
    <section className="mt-10 flex flex-wrap items-center gap-6 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
      <div className="min-w-0 flex-1 space-y-1">
        <h2 className="font-display text-2xl font-black">🐝 {t.hints}</h2>
        <p className="text-muted">{t.hintsSub}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            aria-pressed={hints === v}
            onClick={() => setFindHints(v)}
            className={`rounded-xl border-2 px-4 py-2 font-bold transition ${hints === v ? "border-teal bg-teal text-white" : "border-line hover:border-ink"}`}
          >
            {v ? t.on : t.off}
          </button>
        ))}
      </div>
    </section>
  );
}
