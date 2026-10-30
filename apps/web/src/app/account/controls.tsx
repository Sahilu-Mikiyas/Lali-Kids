"use client";

import { useState, useTransition } from "react";

import { Bee, Cub, Gugu } from "@/components/characters";
import type { Child } from "@/lib/family";
import { addChild, chooseChild, removeChild, setNightlyLimit } from "./actions";

export function Avatar({ kind, size = 56 }: { kind: Child["avatar"]; size?: number }) {
  if (kind === "bee") return <Bee size={size} />;
  if (kind === "gugu") return <Gugu size={size * 0.8} />;
  return <Cub size={size * 0.8} />;
}

export function ChildCard({ child, thisWeek, current }: { child: Child; thisWeek: number; current: boolean }) {
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
          Ages {child.age_band} · reads in {child.preferred_lang === "am" ? "Amharic" : "English"}
        </p>
        <p className="mt-2 font-bold">
          <span className="text-gold">★</span> {child.stars} stars · {thisWeek} {thisWeek === 1 ? "story" : "stories"} this week
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {!current && (
            <button type="button" className="btn btn-plain !px-3 !py-1.5 !text-sm" disabled={pending} onClick={() => start(() => chooseChild(child.id))}>
              Reading now
            </button>
          )}
          {current && <span className="rounded-full bg-teal/15 px-3 py-1 text-sm font-bold text-teal">Reading now</span>}
          {confirm ? (
            <>
              <button type="button" className="btn btn-primary !px-3 !py-1.5 !text-sm" disabled={pending} onClick={() => start(() => removeChild(child.id))}>
                Yes, remove
              </button>
              <button type="button" className="font-bold text-muted" onClick={() => setConfirm(false)}>
                Keep
              </button>
            </>
          ) : (
            <button type="button" className="font-bold text-muted hover:text-coral" onClick={() => setConfirm(true)}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AddChildForm() {
  const [avatar, setAvatar] = useState<Child["avatar"]>("cub");
  const [pending, start] = useTransition();
  return (
    <form
      action={(fd) => start(() => addChild(fd))}
      className="space-y-3 rounded-[28px] border-2 border-dashed border-line p-5"
    >
      <p className="font-display text-xl font-black">Add a child</p>
      <input id="child-name" name="name" required maxLength={40} placeholder="Name" className="w-full rounded-xl border-2 border-line px-3 py-2 outline-none focus:border-blue" />
      <div className="grid grid-cols-2 gap-3">
        <select id="child-age" name="age_band" defaultValue="3-5" className="rounded-xl border-2 border-line px-3 py-2">
          <option value="3-5">Ages 3–5</option>
          <option value="6-7">Ages 6–7</option>
          <option value="8-9">Ages 8–9</option>
        </select>
        <select id="child-lang" name="preferred_lang" defaultValue="en" className="rounded-xl border-2 border-line px-3 py-2">
          <option value="en">English first</option>
          <option value="am">አማርኛ first</option>
        </select>
      </div>
      <input type="hidden" name="avatar" value={avatar} />
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-muted">Pick a friend:</span>
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
        {pending ? "Adding…" : "Add child"}
      </button>
    </form>
  );
}

export function LimitPicker({ value }: { value: number }) {
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
          {n === 0 ? "No limit" : `${n} stories`}
        </button>
      ))}
    </div>
  );
}
