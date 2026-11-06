"use client";

import { useTransition } from "react";

import { setLanguage } from "./actions";
import { useLang, useT } from "./provider";

/**
 * English ⇄ አማርኛ without a jarring jump: the page fades out, the same page comes back in the
 * other language at the same scroll position, and fades in.
 */
export function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang();
  const t = useT();
  const [pending, start] = useTransition();
  const next = lang === "en" ? "am" : "en";

  const swap = () =>
    start(async () => {
      const root = document.documentElement;
      root.classList.add("lang-leaving");
      try {
        sessionStorage.setItem("lali-lang-switch", "1");
      } catch {
        // The fade-in is a nicety.
      }
      await Promise.all([setLanguage(next), new Promise((r) => setTimeout(r, 180))]);
      // The language lives in the root layout, so the other version is a fresh page load;
      // the browser keeps the scroll position and the page fades back in.
      window.location.reload();
    });

  return (
    <button
      type="button"
      disabled={pending}
      lang={next}
      onClick={swap}
      className={`rounded-xl px-3 py-2 font-bold transition-colors hover:bg-white/70 ${lang === "en" ? "font-ethiopic" : ""} ${className}`}
      aria-label={lang === "en" ? "Switch the website to Amharic" : "ድረ-ገጹን ወደ እንግሊዝኛ ቀይር"}
    >
      {t.switchTo}
    </button>
  );
}
