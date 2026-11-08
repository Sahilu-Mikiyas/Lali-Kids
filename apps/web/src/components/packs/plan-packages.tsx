"use client";

import Link from "next/link";

import { useT } from "@/i18n/provider";

/** On the plan cards: every plan opens the Story Garden library; learning packages are bought once, or included in VIP. */
export function PlanPackages({ planId, dark = false, link = true }: { planId: string; dark?: boolean; link?: boolean }) {
  const t = useT();
  const vip = planId === "vip";
  return (
    <div className={`rounded-2xl p-3 text-sm ${dark ? "bg-white/10" : "bg-sky-soft/70"}`} data-plan-packages={planId}>
      <p className={`mb-1 text-xs font-bold uppercase tracking-[0.12em] ${dark ? "text-white/70" : "text-muted"}`}>{t.courses.title}</p>
      <p className="font-bold">{vip ? `👑 ${t.courses.inVip}` : t.courses.price("1,500")}</p>
      {link && (
        <Link href="/courses" className={`mt-1 inline-block font-bold underline ${dark ? "text-gold" : "text-blue"}`}>
          {t.plans.seePackages}
        </Link>
      )}
    </div>
  );
}
