"use client";

import { useTransition } from "react";

import { setLanguage } from "./actions";
import { useLang, useT } from "./provider";

/** English ⇄ አማርኛ. Reloads so every part of the page switches together. */
export function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang();
  const t = useT();
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      lang={lang === "en" ? "am" : "en"}
      onClick={() =>
        start(async () => {
          await setLanguage(lang === "en" ? "am" : "en");
          window.location.reload();
        })
      }
      className={`rounded-xl px-3 py-2 font-bold transition-colors hover:bg-white/70 ${lang === "en" ? "font-ethiopic" : ""} ${className}`}
      aria-label={lang === "en" ? "Switch the website to Amharic" : "ድረ-ገጹን ወደ እንግሊዝኛ ቀይር"}
    >
      {t.switchTo}
    </button>
  );
}
