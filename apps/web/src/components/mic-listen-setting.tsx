"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import type { Lang } from "@/content/stories";
import { dict } from "@/i18n/dict";
import { adoptMicListen, recognitionCtor, setMicListen, useMicListen, useReaderInfo } from "@/lib/read-aloud/client";

const noop = () => () => {};

/**
 * "Listen to my child read (uses the browser's speech service)": a grown-up's choice, off by
 * default, explained in full. Used in the Grown-ups' corner and in the reader's grown-ups menu.
 * `serverValue` is the family's saved choice when the page already read it (null: not available yet).
 */
export function MicListenSetting({ lang, serverValue, card = true }: { lang: Lang; serverValue?: boolean | null; card?: boolean }) {
  const t = dict[lang].mic;
  useEffect(() => {
    if (serverValue !== undefined) adoptMicListen(serverValue);
  }, [serverValue]);
  const info = useReaderInfo();
  const on = useMicListen();
  const supported = useSyncExternalStore(noop, () => recognitionCtor() !== null, () => true);
  const [saved, setSaved] = useState<boolean | null>(null);
  const display = lang === "am" ? "font-ethiopic" : "font-display";

  const choose = async (v: boolean) => {
    setSaved(null);
    setSaved(await setMicListen(v));
  };

  return (
    <section
      className={card ? "mt-10 space-y-3 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]" : "space-y-3 rounded-[22px] border-2 border-line p-4"}
      data-mic-setting={on ? "on" : "off"}
      lang={lang}
    >
      <h2 className={`${card ? "text-2xl" : "text-lg"} font-black ${display}`}>🎤 {t.setting}</h2>
      <p className={`${card ? "" : "text-sm"} text-muted`}>{t.settingSub}</p>
      <p className={`${card ? "" : "text-sm"} text-muted`}>{t.settingOffNote}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t.settingTitle}>
        {[false, true].map((v) => (
          <button
            key={String(v)}
            type="button"
            aria-pressed={on === v}
            data-mic-choice={v ? "on" : "off"}
            onClick={() => void choose(v)}
            className={`rounded-xl border-2 px-4 py-2 font-bold transition ${on === v ? "border-teal bg-teal text-white" : "border-line hover:border-ink"}`}
          >
            {v ? t.settingOn : t.settingOff}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted" aria-live="polite">
        {on && !supported ? t.settingUnsupported : info?.signedIn ? (saved === false ? t.settingDevice : t.settingSaved) : info ? t.settingDevice : ""}
      </p>
    </section>
  );
}
