"use client";

import { motion } from "motion/react";
import { useActionState, useEffect, useState } from "react";

import { GiftCard } from "@/components/gift/gift-card";
import { useLang, useT } from "@/i18n/provider";
import { approxUsd, DAYS_PER_MONTH, GIFT_MONTHS, giftPrice, MESSAGE_MAX, type GiftMonths } from "@/lib/payments/gift";
import { formatBirr, PLANS, type PlanId } from "@/lib/payments/plans";
import { startGiftCheckout, type GiftFormState } from "./actions";

const FRIEND_RING: Record<PlanId, string> = {
  reader: "border-teal shadow-[0_8px_0_var(--color-teal)]",
  learner: "border-blue shadow-[0_8px_0_var(--color-blue)]",
  vip: "border-gold-deep shadow-[0_8px_0_var(--color-gold-deep)]",
};

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-3 font-display text-2xl font-black">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink font-display text-lg text-white">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block font-bold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-bold text-coral" role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="text-sm text-muted">{hint}</p>
      )}
    </div>
  );
}

const input =
  "w-full rounded-2xl border-[3px] border-line bg-white px-4 py-3 text-lg outline-none transition focus:border-blue aria-[invalid=true]:border-coral";

export function GiftForm() {
  const t = useT();
  const lang = useLang();
  const g = t.gift.page;
  const [plan, setPlan] = useState<PlanId>("learner");
  const [months, setMonths] = useState<GiftMonths>(3);
  const [giverName, setGiverName] = useState("");
  const [giverEmail, setGiverEmail] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [result, pay, paying] = useActionState<GiftFormState, FormData>(startGiftCheckout, null);
  const leaving = Boolean(result && "url" in result);
  const field = result && "error" in result ? result.field : undefined;
  const fieldError = (f: string) => (field === f && result && "error" in result ? result.error : undefined);
  const price = giftPrice(plan, months);
  const left = MESSAGE_MAX - [...message].length;

  useEffect(() => {
    if (result && "url" in result) window.location.assign(result.url);
  }, [result]);

  return (
    <form action={pay} className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      <input type="hidden" name="plan" value={plan} />
      <input type="hidden" name="months" value={months} />

      <div className="min-w-0 space-y-10">
        <Step n={1} title={g.plan}>
          <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={g.plan}>
            {PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={plan === p.id}
                onClick={() => setPlan(p.id)}
                className={`flex flex-col gap-1 rounded-[24px] border-4 bg-white p-4 text-left transition ${
                  plan === p.id ? FRIEND_RING[p.id] : "border-transparent shadow-[0_6px_0_var(--color-line)] hover:-translate-y-1"
                }`}
              >
                <span className="font-display text-xl font-black">{t.plans.names[p.id]}</span>
                <span className="text-sm text-muted">{t.plans.for[p.id]}</span>
                <span className="mt-1 font-display text-lg font-black tabular-nums">{g.perMonth(formatBirr(p.priceEtb))}</span>
              </button>
            ))}
          </div>
        </Step>

        <Step n={2} title={g.length}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label={g.length}>
            {GIFT_MONTHS.map((m) => {
              const p = giftPrice(plan, m);
              const on = months === m;
              return (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setMonths(m)}
                  className={`relative flex flex-col items-start gap-0.5 rounded-[22px] border-4 bg-white px-4 pb-3 pt-4 text-left transition ${
                    on ? "border-coral shadow-[0_7px_0_var(--color-coral-deep)]" : "border-transparent shadow-[0_6px_0_var(--color-line)] hover:-translate-y-1"
                  }`}
                >
                  {p.discountPct > 0 && (
                    <span className="gift-wiggle absolute -top-3 right-3 rounded-full bg-gold px-2.5 py-0.5 font-display text-sm font-black text-[#2A1A00]">{g.save(p.discountPct)}</span>
                  )}
                  <span className="font-display text-xl font-black">{t.gift.months(m)}</span>
                  <span className="font-bold tabular-nums">
                    {formatBirr(p.total)} <span className="font-ethiopic font-normal">ብር</span>
                  </span>
                  {p.saved > 0 && <span className="text-sm text-muted line-through tabular-nums">{g.was(formatBirr(p.full))}</span>}
                </button>
              );
            })}
          </div>
        </Step>

        <Step n={3} title={g.details}>
          <div className="grid gap-5 rounded-[28px] bg-white p-5 shadow-[0_6px_0_var(--color-line)] sm:grid-cols-2 sm:p-6">
            <Field id="giverName" label={g.yourName} hint={g.yourNameHint} error={fieldError("name")}>
              <input id="giverName" name="giverName" className={input} value={giverName} onChange={(e) => setGiverName(e.target.value)} maxLength={60} autoComplete="name" required aria-invalid={field === "name"} />
            </Field>
            <Field id="giverEmail" label={g.yourEmail} hint={g.yourEmailHint} error={fieldError("email")}>
              <input id="giverEmail" name="giverEmail" type="email" className={input} value={giverEmail} onChange={(e) => setGiverEmail(e.target.value)} maxLength={200} autoComplete="email" required aria-invalid={field === "email"} />
            </Field>
            <div className="sm:col-span-2">
              <Field id="recipient" label={g.forWho} hint={g.forWhoHint} error={fieldError("recipient")}>
                <input id="recipient" name="recipient" className={input} value={recipient} onChange={(e) => setRecipient(e.target.value)} maxLength={80} placeholder={t.gift.card.sampleTo} required aria-invalid={field === "recipient"} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field id="message" label={g.message} error={fieldError("message")}>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className={`${input} resize-y`}
                  value={message}
                  onChange={(e) => setMessage([...e.target.value].slice(0, MESSAGE_MAX).join(""))}
                  placeholder={g.messageHint}
                  aria-invalid={field === "message"}
                  aria-describedby="message-left"
                />
              </Field>
              <p id="message-left" className={`mt-1 text-right text-sm tabular-nums ${left < 30 ? "font-bold text-coral" : "text-muted"}`} aria-live="polite">
                {g.charsLeft(left)}
              </p>
            </div>
          </div>
        </Step>
      </div>

      <aside className="min-w-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
        <p className="font-display text-xl font-black text-muted">{g.previewTitle}</p>
        <motion.div key={`${plan}-${months}`} initial={{ rotate: -1.5, scale: 0.97 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}>
          <GiftCard lang={lang} planId={plan} months={months} recipient={recipient.trim()} giverName={giverName.trim()} message={message.trim() || null} code={null} />
        </motion.div>

        <div className="space-y-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-xl font-black">{g.summary}</p>
              <p className="text-muted">
                Lali {t.plans.names[plan]} · {t.gift.months(months)} · {g.days(months * DAYS_PER_MONTH)}
              </p>
            </div>
            {price.discountPct > 0 && <span className="shrink-0 rounded-full bg-gold px-3 py-1 font-display font-black text-[#2A1A00]">−{price.discountPct}%</span>}
          </div>
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-t-2 border-dashed border-line pt-4">
            <span className="font-bold text-muted">{g.total}</span>
            <span className="text-right">
              {price.saved > 0 && <span className="mr-2 text-muted line-through tabular-nums">{formatBirr(price.full)}</span>}
              <span className="font-display text-4xl font-black tabular-nums">{formatBirr(price.total)}</span>
              <span className="ml-1 font-ethiopic text-xl">ብር</span>
              <span className="block font-bold text-teal tabular-nums">≈ {g.approx(approxUsd(price.total))}</span>
            </span>
          </div>
          <p className="text-sm text-muted">{g.approxNote}</p>
          <button type="submit" className="btn btn-primary w-full !text-xl" disabled={paying || leaving}>
            {paying ? g.starting : leaving ? g.opening : g.pay(formatBirr(price.total))}
          </button>
          {result && "error" in result && (
            <p className="rounded-2xl bg-coral/10 p-4 text-center text-coral" role="alert">
              {result.error}
            </p>
          )}
          <p className="text-center text-sm text-muted">{g.methods}</p>
        </div>
      </aside>
    </form>
  );
}
