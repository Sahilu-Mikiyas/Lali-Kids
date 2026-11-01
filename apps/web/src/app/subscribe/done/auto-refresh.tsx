"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/** While Chapa is still confirming, re-checks every few seconds so the parent doesn't have to. */
export function AutoRefresh({ every = 3000, tries = 20 }: { every?: number; tries?: number }) {
  const router = useRouter();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count >= tries) return;
    const t = setTimeout(() => {
      router.refresh();
      setCount((c) => c + 1);
    }, every);
    return () => clearTimeout(t);
  }, [count, every, tries, router]);
  return count < tries ? <p className="text-sm text-muted" aria-live="polite">Checking again automatically…</p> : null;
}
