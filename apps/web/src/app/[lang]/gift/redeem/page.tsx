import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

import { Bee, CubShape, GuguShape } from "@/components/characters";
import { GiftBox, TibebBand } from "@/components/gift/art";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { getLang, getT } from "@/i18n/server";
import { normalizeGiftCode } from "@/lib/payments/gift";
import { currentProfile } from "@/lib/supabase/server";
import { RedeemForm } from "./redeem-form";
import { peekState, type RedeemState } from "./state";

export const metadata: Metadata = { title: "Add a gift", robots: { index: false } };

/** Request time, read once per request (the page waits for the request before rendering). */
const nowMs = () => Date.now();

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="relative mx-auto grid min-h-dvh max-w-xl place-items-center px-4 pb-16 pt-40 sm:px-6 sm:pt-32">
        <div className="relative w-full">
          <div className="pointer-events-none absolute -top-16 left-1/2 flex -translate-x-1/2 items-end gap-1" aria-hidden>
            <svg viewBox="0 0 200 240" className="w-16">
              <GuguShape pose="hop" mood="joy" />
            </svg>
            <span className="gift-hover">
              <Bee size={44} />
            </span>
            <svg viewBox="0 0 200 240" className="w-16">
              <CubShape pose="sit" mood="joy" />
            </svg>
          </div>
          <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_8px_0_var(--color-line)]">
            <TibebBand height={16} />
            <div className="space-y-5 p-6 sm:p-8">{children}</div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

async function RedeemContent({ searchParams }: PageProps<"/[lang]/gift/redeem">) {
  await connection();
  const { code } = await searchParams;
  const raw = typeof code === "string" ? code.slice(0, 40) : "";
  const [profile, t, lang] = await Promise.all([currentProfile(), getT(), getLang()]);
  const r = t.gift.redeem;

  if (!profile) {
    const next = `/gift/redeem${raw ? `?code=${encodeURIComponent(normalizeGiftCode(raw) ?? raw)}` : ""}`;
    return (
      <Frame>
        <div className="space-y-4 text-center">
          <GiftBox size={110} className="gift-bounce mx-auto" />
          <h1 className="font-display text-4xl font-black">{r.signInTitle}</h1>
          <p className="text-lg text-muted">{r.signInSub}</p>
          {raw && (
            <p className="font-display text-2xl font-black tracking-[0.12em]" translate="no">
              {normalizeGiftCode(raw) ?? raw}
            </p>
          )}
          <Link href={`/login?next=${encodeURIComponent(next)}`} className="btn btn-primary w-full">
            {r.signIn}
          </Link>
        </div>
      </Frame>
    );
  }

  const initial: RedeemState = raw ? await peekState(raw, profile.id, lang, nowMs()) : { stage: "enter", code: "" };
  return (
    <Frame>
      <div className="text-center">
        <h1 className="font-display text-4xl font-black">{r.title}</h1>
        <p className="mt-1 text-muted">{r.sub}</p>
      </div>
      <RedeemForm key={raw} initial={initial} />
    </Frame>
  );
}

export default function RedeemPage(props: PageProps<"/[lang]/gift/redeem">) {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">…</main>}>
      <RedeemContent {...props} />
    </Suspense>
  );
}
