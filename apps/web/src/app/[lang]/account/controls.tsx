"use client";

import { useState, useTransition } from "react";

import { Bee, Cub, Gugu } from "@/components/characters";
import { useT } from "@/i18n/provider";
import type { Child } from "@/lib/family";
import { addChild, chooseChild, deleteAccount, removeChild, setGamesMinutes, setNightlyLimit, setShowAllAges, telegramDisconnect, telegramLink } from "./actions";

export function Avatar({ kind, size = 56 }: { kind: Child["avatar"]; size?: number }) {
  if (kind === "bee") return <Bee size={size} />;
  if (kind === "gugu") return <Gugu size={size * 0.8} />;
  return <Cub size={size * 0.8} />;
}

export function ChildCard({ child, thisWeek, current }: { child: Child; thisWeek: number; current: boolean }) {
  const t = useT();
  const [confirm, setConfirm] = useState(false);
  const [pending, start] = useTransition();
  return (
    <div className={`flex gap-4 rounded-[28px] bg-white p-5 shadow-[0_6px_0_var(--color-line)] ${current ? "ring-4 ring-teal/40" : ""}`}>
      <div className="shrink-0">
        <Avatar kind={child.avatar} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-2xl font-black">{child.name}</p>
        <p className="text-sm text-muted">
          {t.account.ages(child.age_band)} · {t.account.readsIn(child.preferred_lang === "am" ? t.account.amharic : t.account.english)}
        </p>
        <p className="mt-2 font-bold">
          <span className="text-gold">★</span> {t.account.starsWeek(child.stars, thisWeek)}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {!current && (
            <button type="button" className="btn btn-plain !px-3 !py-1.5 !text-sm" disabled={pending} onClick={() => start(() => chooseChild(child.id))}>
              {t.account.readingNow}
            </button>
          )}
          {current && <span className="rounded-full bg-teal/15 px-3 py-1 text-sm font-bold text-teal">{t.account.readingNow}</span>}
          {confirm ? (
            <>
              <button type="button" className="btn btn-primary !px-3 !py-1.5 !text-sm" disabled={pending} onClick={() => start(() => removeChild(child.id))}>
                {t.account.yesRemove}
              </button>
              <button type="button" className="font-bold text-muted" onClick={() => setConfirm(false)}>
                {t.account.keep}
              </button>
            </>
          ) : (
            <button type="button" className="font-bold text-muted hover:text-coral" onClick={() => setConfirm(true)}>
              {t.account.remove}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AddChildForm() {
  const t = useT();
  const [avatar, setAvatar] = useState<Child["avatar"]>("cub");
  const [pending, start] = useTransition();
  return (
    <form
      action={(fd) => start(() => addChild(fd))}
      className="space-y-3 rounded-[28px] border-2 border-dashed border-line p-5"
    >
      <p className="font-display text-xl font-black">{t.account.addChild}</p>
      <input id="child-name" name="name" required maxLength={40} placeholder={t.account.name} className="w-full rounded-xl border-2 border-line px-3 py-2 outline-none focus:border-blue" />
      <div className="grid grid-cols-2 gap-3">
        <select id="child-age" name="age_band" defaultValue="3-5" className="rounded-xl border-2 border-line px-3 py-2">
          <option value="3-5">{t.account.ages("3–5")}</option>
          <option value="6-7">{t.account.ages("6–7")}</option>
          <option value="8-9">{t.account.ages("8–9")}</option>
        </select>
        <select id="child-lang" name="preferred_lang" defaultValue="en" className="rounded-xl border-2 border-line px-3 py-2">
          <option value="en">{t.account.englishFirst}</option>
          <option value="am">{t.account.amharicFirst}</option>
        </select>
      </div>
      <input type="hidden" name="avatar" value={avatar} />
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-muted">{t.account.pickFriend}</span>
        {(["cub", "gugu", "bee"] as const).map((k) => (
          <button
            key={k}
            type="button"
            aria-label={k === "cub" ? "Anbessa" : k === "gugu" ? "Gugu" : "Lali"}
            aria-pressed={avatar === k}
            onClick={() => setAvatar(k)}
            className={`rounded-2xl p-1 transition ${avatar === k ? "bg-gold/30 ring-2 ring-gold" : "hover:bg-bg"}`}
          >
            <Avatar kind={k} size={44} />
          </button>
        ))}
      </div>
      <button type="submit" className="btn btn-primary w-full !text-base" disabled={pending}>
        {pending ? t.account.adding : t.account.addChildBtn}
      </button>
    </form>
  );
}

export function LimitPicker({ value }: { value: number }) {
  const t = useT();
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-wrap gap-2">
      {[2, 3, 5, 0].map((n) => (
        <button
          key={n}
          type="button"
          aria-pressed={value === n}
          disabled={pending}
          onClick={() => start(() => setNightlyLimit(n))}
          className={`rounded-xl border-2 px-4 py-2 font-bold transition ${value === n ? "border-teal bg-teal text-white" : "border-line hover:border-ink"}`}
        >
          {n === 0 ? t.account.noLimit : t.account.nStories(n)}
        </button>
      ))}
    </div>
  );
}

export function GamesPicker({ value }: { value: number }) {
  const t = useT();
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-wrap gap-2">
      {[10, 20, 30, 60, 0].map((n) => (
        <button
          key={n}
          type="button"
          aria-pressed={value === n}
          disabled={pending}
          onClick={() => start(() => setGamesMinutes(n))}
          className={`rounded-xl border-2 px-4 py-2 font-bold transition ${value === n ? "border-teal bg-teal text-white" : "border-line hover:border-ink"}`}
        >
          {n === 0 ? t.account.gamesOff : t.account.min(n)}
        </button>
      ))}
    </div>
  );
}

export function AllAgesToggle({ value }: { value: boolean }) {
  const t = useT();
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-wrap gap-2">
      {[false, true].map((v) => (
        <button
          key={String(v)}
          type="button"
          aria-pressed={value === v}
          disabled={pending}
          onClick={() => start(() => setShowAllAges(v))}
          className={`rounded-xl border-2 px-4 py-2 font-bold transition ${value === v ? "border-teal bg-teal text-white" : "border-line hover:border-ink"}`}
        >
          {v ? t.account.everyAge : t.account.ownAge}
        </button>
      ))}
    </div>
  );
}

export function TelegramConnect({ connected }: { connected: boolean }) {
  const t = useT();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  if (connected) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-teal px-3 py-1 font-bold text-white">{t.account.connected}</span>
        <button type="button" disabled={pending} onClick={() => start(() => telegramDisconnect())} className="font-bold text-muted hover:text-ink">
          {t.account.disconnect}
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={pending}
        className="btn btn-primary !text-base"
        onClick={() =>
          start(async () => {
            setError(null);
            // Open the tab first (pop-up blockers allow it during the click), then point it at Telegram.
            const tab = window.open("about:blank", "_blank");
            const r = await telegramLink();
            if ("url" in r) {
              if (tab) tab.location.href = r.url;
              else window.location.href = r.url;
            } else {
              tab?.close();
              setError(r.error);
            }
          })
        }
      >
        {pending ? t.account.opening : t.account.connect}
      </button>
      {error && <p className="text-sm text-coral">{error}</p>}
      <p className="text-sm text-muted">{t.account.pressStart}</p>
    </div>
  );
}

export function DeleteAccount() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="rounded-xl border-2 border-coral px-4 py-2 font-bold text-coral">
        {t.account.deleteStart}
      </button>
    );
  }
  return (
    <form
      className="w-full space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          setError(null);
          const r = await deleteAccount(word);
          if (r && "error" in r) setError(r.error);
        });
      }}
    >
      <label className="block space-y-1">
        <span className="font-bold">{t.account.deleteType}</span>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          autoComplete="off"
          className="w-full rounded-xl border-2 border-line px-3 py-2 outline-none focus:border-coral"
        />
      </label>
      {error && <p className="text-sm text-coral">{error}</p>}
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={pending || !word.trim()} className="rounded-xl bg-coral px-4 py-2 font-bold text-white disabled:opacity-50">
          {pending ? t.account.deleting : t.account.deleteConfirm}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="font-bold text-muted hover:text-ink">
          {t.account.deleteCancel}
        </button>
      </div>
    </form>
  );
}
