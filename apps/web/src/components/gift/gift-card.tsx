import { dict } from "@/i18n/dict";
import type { UiLang } from "@/i18n/langs";
import type { PlanId } from "@/lib/payments/plans";
import { BeeShape, CubShape, GuguShape } from "../characters";
import { GIFT_PAPER, GiftBoxShape, TibebBand } from "./art";

export type GiftCardProps = {
  lang: UiLang;
  planId: PlanId;
  months: number;
  recipient: string;
  giverName: string;
  message?: string | null;
  /** Null before payment: the code spot shows a hint instead. */
  code: string | null;
  /** Shown under the code, e.g. "lali-kids.onrender.com/gift/redeem". */
  redeemAt?: string;
  className?: string;
};

const PLAN_TONE: Record<PlanId, { pill: string; friend: "bee" | "gugu" | "cub" }> = {
  reader: { pill: "bg-teal text-white", friend: "bee" },
  learner: { pill: "bg-blue text-white", friend: "gugu" },
  vip: { pill: "bg-gold text-[#2A1A00]", friend: "cub" },
};

/**
 * The gift card: what the family receives. Used as a live preview on /gift, on the giver's
 * thank-you page (with the code) and when printed.
 */
export function GiftCard({ lang, planId, months, recipient, giverName, message, code, redeemAt, className = "" }: GiftCardProps) {
  const t = dict[lang];
  const c = t.gift.card;
  const tone = PLAN_TONE[planId];
  return (
    <div
      className={`gift-card relative overflow-hidden rounded-[30px] border-[3px] border-ink bg-paper text-paper-ink shadow-[0_10px_0_var(--color-ink)] print:shadow-none ${className}`}
      style={{ backgroundImage: GIFT_PAPER }}
    >
      <TibebBand height={18} />
      <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:p-7">
        <div className="min-w-0 space-y-3">
          <div>
            <p className="font-display text-3xl font-black leading-tight text-ink sm:text-4xl">{c.title}</p>
            <p className={`text-lg text-muted ${lang === "en" ? "font-ethiopic" : "font-display font-bold"}`}>{c.other}</p>
          </div>
          <p className={`inline-block rounded-full px-3.5 py-1 font-display text-lg font-black ${tone.pill}`}>
            Lali {t.plans.names[planId]} <span aria-hidden>·</span> {t.gift.months(months)}
          </p>
          <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-1 text-lg">
            <dt className="font-bold text-muted">{c.to}</dt>
            <dd className="min-w-0 break-words font-display text-xl font-black text-ink">{recipient || c.sampleTo}</dd>
            <dt className="font-bold text-muted">{c.from}</dt>
            <dd className="min-w-0 break-words font-display text-xl font-black text-ink">{giverName || c.sampleFrom}</dd>
          </dl>
          {message && (
            <blockquote className="relative whitespace-pre-line break-words rounded-2xl bg-white/80 px-4 py-3 text-base italic text-paper-ink shadow-[inset_0_0_0_2px_var(--color-paper-line)]">
              <span aria-hidden className="absolute -left-1 -top-3 font-display text-4xl not-italic text-berry">“</span>
              {message}
            </blockquote>
          )}
        </div>

        <div className="relative mx-auto h-40 w-44 shrink-0 sm:mt-2" aria-hidden>
          <svg viewBox="0 0 200 240" className="absolute -left-3 bottom-0 w-24">
            {tone.friend === "cub" ? <CubShape pose="sit" mood="joy" /> : <GuguShape pose="wave" mood="joy" />}
          </svg>
          <svg viewBox="0 0 120 120" className="gift-bounce absolute bottom-0 right-0 w-28">
            <GiftBoxShape body={planId === "vip" ? "#2F5BD3" : planId === "learner" ? "#D63B72" : "#E8513B"} />
          </svg>
          <svg viewBox="0 0 40 40" className="gift-hover absolute right-2 top-0 w-12">
            <BeeShape />
          </svg>
        </div>
      </div>

      <div className="mx-5 mb-5 rounded-2xl border-[3px] border-dashed border-ink/40 bg-white px-4 py-3 text-center sm:mx-7 sm:mb-7">
        <p className="text-sm font-bold uppercase tracking-wider text-muted">{c.code}</p>
        {code ? (
          <p className="gift-code select-all break-all font-display text-[clamp(1.6rem,7vw,2.6rem)] font-black tracking-[0.12em] text-ink" translate="no">
            {code}
          </p>
        ) : (
          <p className="py-2 font-display text-xl font-black tracking-[0.12em] text-ink/30">LALI-••••-••••</p>
        )}
        <p className="text-sm text-muted">{code ? <>{c.how} <b className="break-all text-ink">{redeemAt}</b></> : c.hidden}</p>
      </div>
      <TibebBand height={12} />
    </div>
  );
}
