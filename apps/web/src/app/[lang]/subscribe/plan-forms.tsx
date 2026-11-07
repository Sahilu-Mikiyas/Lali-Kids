"use client";

import { useActionState, useEffect, useState } from "react";

import { fmtDate } from "@/i18n/format";
import { useLang, useT } from "@/i18n/provider";
import { formatBirr, PLANS, previewSwitch, type CurrentPlan, type PlanId } from "@/lib/payments/plans";
import { PlanPacks } from "@/components/packs/plan-packs";
import type { Pack } from "@/content/stories";
import { startCheckout, type CheckoutResult } from "./actions";

function SwitchNote({ current, plan, nowMs }: { current: CurrentPlan; plan: PlanId; nowMs: number }) {
  const t = useT();
  const lang = useLang();
  const p = previewSwitch(current, plan, nowMs);
  const to = t.plans.names[plan];
  const from = current ? t.plans.names[current.planId] : "";
  const day = (ms: number) => fmtDate(lang, ms);
  switch (p.kind) {
    case "new":
      return <>{t.subscribe.preview.new(to, day(p.endsAtMs))}</>;
    case "renew":
      return <>{t.subscribe.preview.renew(to, day(p.endsAtMs))}</>;
    case "upgrade":
      return <>{t.subscribe.preview.upgrade(from, to, Math.round(p.convertedDays * 10) / 10, day(p.endsAtMs))}</>;
    case "downgrade":
      return <>{t.subscribe.preview.downgrade(from, to, day(p.startsAtMs), day(p.endsAtMs))}</>;
  }
}

export function PlanForms({ initialPlan, current, nowMs, packCounts }: { initialPlan: PlanId; current: CurrentPlan; nowMs: number; packCounts: Record<Pack, number> }) {
  const t = useT();
  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [result, pay, paying] = useActionState<CheckoutResult, FormData>(startCheckout, null);
  const chosen = PLANS.find((p) => p.id === plan)!;
  const leaving = Boolean(result && "url" in result);

  // Go to Chapa's checkout as soon as the server hands back its address.
  useEffect(() => {
    if (result && "url" in result) window.location.assign(result.url);
  }, [result]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3" role="radiogroup" aria-label={t.subscribe.choose}>
        {PLANS.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={plan === p.id}
            onClick={() => setPlan(p.id)}
            className={`flex flex-col gap-2 rounded-[28px] border-4 p-6 text-left transition ${
              plan === p.id ? "border-teal bg-white shadow-[0_8px_0_var(--color-teal)]" : "border-transparent bg-white shadow-[0_6px_0_var(--color-line)] hover:-translate-y-1"
            }`}
          >
            <span className="font-display text-2xl font-black">{t.plans.names[p.id]}</span>
            <span className="text-muted">{t.plans.for[p.id]}</span>
            <span className="font-display text-4xl font-black tabular-nums">
              {formatBirr(p.priceEtb)}
              <span className="ml-1 font-ethiopic text-xl font-normal">ብር</span>
              <span className="ml-1 font-body text-base font-normal text-muted">{t.plans.per30}</span>
            </span>
            <ul className="mt-2 space-y-1.5 text-sm">
              {t.plans.items[p.id].map((i) => (
                <li key={i}>✓ {i}</li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <PlanPacks planId={p.id} counts={packCounts} />
            </div>
          </button>
        ))}
      </div>

      <form action={pay} className="flex flex-col gap-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)] md:flex-row md:items-center">
        <input type="hidden" name="plan" value={plan} />
        <div className="flex-1">
          <p className="font-display text-xl font-black">
            {t.subscribe.planTitle(t.plans.names[chosen.id])}
            {current && current.planId === plan && <span className="ml-2 rounded-full bg-teal px-2.5 py-0.5 align-middle text-xs text-white">{t.subscribe.yourPlan}</span>}
          </p>
          <p className="text-muted">
            <SwitchNote current={current} plan={plan} nowMs={nowMs} /> {t.subscribe.noRenew}
          </p>
        </div>
        <button type="submit" className="btn btn-primary" disabled={paying || leaving}>
          {paying ? t.subscribe.starting : leaving ? t.subscribe.opening : t.subscribe.pay(formatBirr(chosen.priceEtb))}
        </button>
      </form>

      {result && "error" in result && <p className="rounded-2xl bg-coral/10 p-4 text-center text-coral" role="alert">{result.error}</p>}
      <p className="text-center text-sm text-muted">
        {t.subscribe.methods}
      </p>
    </div>
  );
}
