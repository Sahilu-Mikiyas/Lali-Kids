import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

import { Bee } from "@/components/characters";
import { GiftCard } from "@/components/gift/gift-card";
import { SiteNav } from "@/components/site-chrome";
import { dict } from "@/i18n/dict";
import { fmtDate } from "@/i18n/format";
import { getLang, getT } from "@/i18n/server";
import { originFrom } from "@/lib/origin";
import { redeemLink } from "@/lib/payments/gift";
import { confirmGift, giftByRef, type GiftCard as Gift, type GiftConfirmation } from "@/lib/payments/gift-server";
import { isGiftRef } from "@/lib/payments/refs";
import { AutoRefresh } from "../../subscribe/done/auto-refresh";
import { ShareButtons } from "./share";

export const metadata: Metadata = { title: "Your gift", robots: { index: false } };

/** The message to send the family, in both languages (the giver's language first). */
function shareMessage(gift: Gift, link: string, first: "en" | "am") {
  const one = (l: "en" | "am") => {
    const t = dict[l];
    return t.gift.done.share({
      giver: gift.giverName,
      recipient: gift.recipient,
      plan: t.plans.names[gift.planId],
      months: t.gift.months(gift.months),
      code: gift.code,
      link,
      message: gift.message,
    });
  };
  return [one(first), one(first === "en" ? "am" : "en")].join("\n\n");
}

/**
 * Where Chapa sends the giver after paying, and the page they can come back to for the code.
 * The code is shown only after Chapa confirms the full amount in birr. The address carries the
 * random Chapa reference, so only the giver (and whoever they share it with) can open it.
 */
async function GiftDoneContent({ searchParams }: PageProps<"/[lang]/gift/done">) {
  await connection();
  const { tx_ref } = await searchParams;
  const txRef = isGiftRef(tx_ref) ? tx_ref : null;

  let outcome: GiftConfirmation = "unknown";
  if (txRef) {
    try {
      outcome = await confirmGift(txRef);
    } catch {
      outcome = "pending";
    }
  }
  const [t, lang, h] = await Promise.all([getT(), getLang(), headers()]);
  const gift = txRef && (outcome === "paid" || outcome === "already") ? await giftByRef(txRef) : null;
  const d = t.gift.done;

  if (gift && gift.status !== "pending") {
    const origin = originFrom(h);
    const link = redeemLink(origin, gift.code);
    const redeemAt = `${origin.replace(/^https?:\/\//, "")}/gift/redeem`;
    return (
      <>
        <div className="gift-noprint">
          <SiteNav />
        </div>
        <main className="gift-print-page mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 print:p-0">
          <div className="gift-noprint text-center">
            <div className="mx-auto w-fit animate-float">
              <Bee size={64} />
            </div>
            <h1 className="mt-2 font-display text-[clamp(2.2rem,6vw,3.4rem)] font-black">{d.title}</h1>
            <p className="mx-auto mt-2 max-w-xl text-lg text-muted">{d.sub}</p>
          </div>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="gift-print-area">
              <GiftCard
                lang={lang}
                planId={gift.planId}
                months={gift.months}
                recipient={gift.recipient}
                giverName={gift.giverName}
                message={gift.message}
                code={gift.code}
                redeemAt={redeemAt}
              />
            </div>
            <div className="gift-noprint space-y-5">
              {gift.status === "redeemed" && (
                <p className="rounded-2xl bg-teal/10 p-4 font-bold text-teal-deep">{d.redeemed(gift.redeemedAt ? fmtDate(lang, gift.redeemedAt) : "")}</p>
              )}
              <ShareButtons message={shareMessage(gift, link, lang)} link={link} code={gift.code} />
              <p className="rounded-2xl bg-sky-soft p-4 text-sm">{d.keep}</p>
              <Link href="/gift" className="btn btn-plain w-full">
                🎁 {d.another}
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteNav />
      <main className="mx-auto grid min-h-dvh max-w-lg place-items-center px-4 pt-24 sm:px-6">
        <div className="w-full space-y-5 rounded-[32px] bg-white p-8 text-center shadow-[0_8px_0_var(--color-line)]">
          <div className="mx-auto w-fit animate-float">
            <Bee size={72} />
          </div>
          {outcome === "pending" ? (
            <>
              <h1 className="font-display text-3xl font-black">{d.checking}</h1>
              <p className="text-muted">{d.checkingSub}</p>
              <AutoRefresh label={d.auto} />
              <div className="flex flex-wrap justify-center gap-3">
                <Link href={`/gift/done?tx_ref=${txRef}`} className="btn btn-primary">
                  {d.again}
                </Link>
                <Link href="/gift" className="btn btn-plain">
                  {d.back}
                </Link>
              </div>
            </>
          ) : outcome === "short" ? (
            <>
              <h1 className="font-display text-3xl font-black">{d.short}</h1>
              <p className="text-muted">{d.shortSub}</p>
              <Link href="/gift" className="btn btn-primary">
                {d.back}
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl font-black">{d.notFound}</h1>
              <p className="text-muted">{d.notFoundSub}</p>
              <Link href="/gift" className="btn btn-primary">
                {d.back}
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default function GiftDonePage(props: PageProps<"/[lang]/gift/done">) {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">…</main>}>
      <GiftDoneContent {...props} />
    </Suspense>
  );
}
