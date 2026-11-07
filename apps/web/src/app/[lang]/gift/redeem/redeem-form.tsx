"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useActionState, useEffect, useState } from "react";

import { CubShape, GuguShape } from "@/components/characters";
import { GiftBox } from "@/components/gift/art";
import { fmtDate } from "@/i18n/format";
import { useLang, useT } from "@/i18n/provider";
import { confetti } from "@/lib/confetti";
import { giftStep } from "./actions";
import type { RedeemState } from "./state";

function Preview({ gift }: { gift: Extract<RedeemState, { stage: "preview" }>["gift"] }) {
  const t = useT();
  const lang = useLang();
  const r = t.gift.redeem.preview;
  const to = t.plans.names[gift.planId];
  const from = gift.currentPlanId ? t.plans.names[gift.currentPlanId] : "";
  const p = gift.preview;
  const day = (ms: number) => fmtDate(lang, ms);
  switch (p.kind) {
    case "new":
      return <>{r.new(to, day(p.endsAtMs))}</>;
    case "renew":
      return <>{r.renew(to, day(p.endsAtMs))}</>;
    case "upgrade":
      return <>{r.upgrade(from, to, Math.round(p.convertedDays * 10) / 10, day(p.endsAtMs))}</>;
    case "downgrade":
      return <>{r.downgrade(from, to, day(p.startsAtMs), day(p.endsAtMs))}</>;
  }
}

export function RedeemForm({ initial }: { initial: RedeemState }) {
  const t = useT();
  const lang = useLang();
  const r = t.gift.redeem;
  const [state, act, busy] = useActionState(giftStep, initial);
  const [code, setCode] = useState(initial.stage === "enter" ? initial.code : "");

  useEffect(() => {
    if (state.stage === "done") confetti(0.35);
  }, [state.stage]);

  if (state.stage === "done") {
    const g = state.gift;
    const plan = t.plans.names[g.planId];
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }} className="space-y-5 text-center">
        <div className="mx-auto flex w-fit items-end gap-1" aria-hidden>
          <svg viewBox="0 0 200 240" className="w-20">
            <CubShape pose="sit" mood="joy" />
          </svg>
          <GiftBox size={92} className="gift-bounce" />
          <svg viewBox="0 0 200 240" className="w-20">
            <GuguShape pose="wave" mood="joy" />
          </svg>
        </div>
        <h2 className="font-display text-4xl font-black">{r.thanks(g.giverName)}</h2>
        <p className="text-lg">{r.added(plan, t.gift.months(g.months))}</p>
        <p className="rounded-2xl bg-sky-soft p-4 text-lg font-bold">
          {g.kind === "downgrade" ? r.startsLater(plan, fmtDate(lang, g.startsAt), fmtDate(lang, g.endsAt)) : r.openUntil(plan, fmtDate(lang, g.endsAt))}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/stories" className="btn btn-primary">
            {r.start}
          </Link>
          <Link href="/account" className="btn btn-plain">
            {r.corner}
          </Link>
        </div>
      </motion.div>
    );
  }

  if (state.stage === "preview") {
    const g = state.gift;
    return (
      <form action={act} className="space-y-5">
        <input type="hidden" name="code" value={g.code} />
        <input type="hidden" name="intent" value="redeem" />
        <div className="relative overflow-hidden rounded-[26px] bg-paper p-5 shadow-[inset_0_0_0_3px_var(--color-paper-line)]">
          <GiftBox size={84} className="gift-bounce float-right -mr-1 -mt-1 ml-3" />
          <p className="font-bold text-berry">{r.from(g.giverName)}</p>
          <p className="font-display text-3xl font-black leading-tight">{r.what(t.plans.names[g.planId], t.gift.months(g.months))}</p>
          <p className="mt-1 text-muted">{r.forWho(g.recipient)}</p>
          {g.message && <blockquote className="mt-3 whitespace-pre-line break-words border-l-4 border-gold pl-3 italic">{g.message}</blockquote>}
          <p className="mt-3 font-mono text-sm tracking-widest text-muted" translate="no">
            {g.code}
          </p>
        </div>
        <p className="text-muted">
          <Preview gift={g} />
        </p>
        <button type="submit" className="btn btn-primary w-full !text-xl" disabled={busy}>
          {busy ? r.adding : `🎁 ${r.add}`}
        </button>
        <Link href="/gift/redeem" className="block text-center font-bold text-muted underline">
          {r.another}
        </Link>
      </form>
    );
  }

  return (
    <form action={act} className="space-y-4">
      <input type="hidden" name="intent" value="check" />
      <label htmlFor="code" className="block font-bold">
        {r.codeLabel}
      </label>
      <input
        id="code"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="LALI-XXXX-XXXX"
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        maxLength={40}
        required
        aria-invalid={Boolean(state.error)}
        aria-describedby={state.error ? "code-error" : undefined}
        className="w-full rounded-2xl border-[3px] border-line bg-white px-4 py-4 text-center font-display text-2xl font-black tracking-[0.14em] outline-none transition focus:border-blue aria-[invalid=true]:border-coral"
        translate="no"
      />
      {state.error && (
        <p id="code-error" className="rounded-2xl bg-coral/10 p-3 text-center font-bold text-coral" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={busy}>
        {busy ? r.checking : r.check}
      </button>
    </form>
  );
}
