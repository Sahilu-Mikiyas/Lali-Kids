"use client";

import Link from "next/link";
import { useTransition } from "react";

import { chooseChild } from "@/app/account/actions";
import { Avatar } from "@/app/account/controls";
import type { Child } from "@/lib/family";

/** "Who's reading?" bar for signed-in families. */
export function ChildChooser({ childList, currentId, stars }: { childList: Child[]; currentId: string | null; stars: number }) {
  const [pending, start] = useTransition();
  if (childList.length === 0) {
    return (
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-[0_4px_0_var(--color-line)]">
        <p className="font-bold">Add your child so Lali can keep their stars.</p>
        <Link href="/account" className="btn btn-primary !px-4 !py-2 !text-base">
          Grown-ups&rsquo; corner
        </Link>
      </div>
    );
  }
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_4px_0_var(--color-line)]">
      <span className="pl-2 font-bold text-muted">Who&rsquo;s reading?</span>
      {childList.map((c) => (
        <button
          key={c.id}
          type="button"
          aria-pressed={c.id === currentId}
          disabled={pending}
          onClick={() => start(() => chooseChild(c.id))}
          className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-4 font-display text-lg font-extrabold transition ${
            c.id === currentId ? "bg-gold/30 ring-2 ring-gold" : "hover:bg-bg"
          }`}
        >
          <Avatar kind={c.avatar} size={36} />
          {c.name}
        </button>
      ))}
      <span className="ml-auto pr-2 font-bold">
        <span className="text-gold">★</span> {stars}
      </span>
    </div>
  );
}
