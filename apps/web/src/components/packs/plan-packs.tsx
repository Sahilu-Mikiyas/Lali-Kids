"use client";

import type { Pack } from "@/content/stories";
import { PACKS } from "@/lib/packs";
import { useT } from "@/i18n/provider";
import { packsForPlan } from "@/lib/packs";
import { PackIcon } from "./pack-icon";

/**
 * What a plan opens, on the plan cards: each pack with its icon and how many stories it holds
 * (counted on the server from the library, so new stories show up by themselves).
 */
export function PlanPacks({ planId, counts, dark = false }: { planId: string; counts: Record<Pack, number>; dark?: boolean }) {
  const t = useT();
  const open = new Set(packsForPlan(planId));
  return (
    <div className={`rounded-2xl p-3 ${dark ? "bg-white/10" : "bg-sky-soft/70"}`} data-plan-packs={planId}>
      <p className={`mb-2 text-xs font-bold uppercase tracking-[0.12em] ${dark ? "text-white/70" : "text-muted"}`}>{t.packs.opens}</p>
      <ul className="grid grid-cols-2 gap-1.5">
        {PACKS.map((p) => (
          <li key={p} className={`flex items-center gap-1.5 text-sm leading-tight ${open.has(p) ? "" : "opacity-35 grayscale"}`} data-plan-pack={p} data-open={open.has(p) || undefined}>
            <PackIcon pack={p} size={24} />
            <span>
              <b className="block">{t.packs.names[p]}</b>
              <span className={dark ? "text-white/70" : "text-muted"}>{open.has(p) ? t.packs.stories(counts[p] ?? 0) : "🔒"}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
