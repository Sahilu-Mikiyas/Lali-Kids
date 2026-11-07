"use client";

import Link from "next/link";
import { useEffect } from "react";

import { reportClientError } from "@/components/error-reporter";
import { useT } from "@/i18n/provider";

/** When a page breaks: a calm message for the family, and a note to the admins. */
export default function PageError({ error, retry }: { error: unknown; retry: () => void }) {
  const t = useT();
  useEffect(() => {
    const e = error as { message?: string; digest?: string } | null;
    // Server errors arrive here with only a digest (the server has already alerted the admins).
    if (e?.digest) return;
    reportClientError(e?.message || String(error), { kind: "render" });
  }, [error]);
  return (
    <main className="mx-auto grid min-h-dvh max-w-md place-items-center px-4 text-center">
      <div className="space-y-5 rounded-[32px] bg-white p-8 shadow-[0_8px_0_var(--color-line)]">
        <p className="text-6xl" aria-hidden>
          🐝
        </p>
        <h1 className="font-display text-3xl font-black">{t.ops.errorTitle}</h1>
        <p className="text-lg text-muted">{t.ops.errorBody}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" className="btn btn-primary" onClick={() => retry()}>
            {t.ops.tryAgain}
          </button>
          <Link href="/" className="btn btn-plain">
            {t.ops.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
