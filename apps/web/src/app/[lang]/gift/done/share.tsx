"use client";

import { useState } from "react";

import { useT } from "@/i18n/provider";

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers and some in-app browsers: fall back to a hidden text box.
    const box = document.createElement("textarea");
    box.value = text;
    box.setAttribute("readonly", "");
    box.style.position = "fixed";
    box.style.opacity = "0";
    document.body.append(box);
    box.select();
    const ok = document.execCommand("copy");
    box.remove();
    return ok;
  }
}

export function CopyButton({ text, label, className = "btn btn-plain" }: { text: string; label: string; className?: string }) {
  const t = useT();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        if (await copy(text)) {
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        }
      }}
    >
      <span aria-live="polite">{done ? `✓ ${t.gift.done.copied}` : label}</span>
    </button>
  );
}

/** WhatsApp, Telegram, copy and print, with the message already written in both languages. */
export function ShareButtons({ message, link, code }: { message: string; link: string; code: string }) {
  const t = useT();
  const d = t.gift.done;
  const withoutLink = message.replace(link, "").trim();
  return (
    <div className="gift-noprint space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <a href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="btn !bg-[#25D366] !text-[#073b1c] shadow-[0_6px_0_#128C4B] [--edge:#128C4B]">
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
            <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
          </svg>
          {d.whatsapp}
        </a>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(withoutLink)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn !bg-[#2AABEE] !text-white shadow-[0_6px_0_#1782BC] [--edge:#1782BC]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
            <path fill="currentColor" d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.5 13.2 1.8 11.7c-1-.3-1-1 .2-1.5l18.5-7.1c.9-.3 1.6.2 1.4 1.2Z" />
          </svg>
          {d.telegram}
        </a>
        <CopyButton text={message} label={`📋 ${d.copy}`} />
        <CopyButton text={code} label={`🔑 ${d.copyCode}`} />
      </div>
      <button type="button" className="btn btn-plain w-full" onClick={() => window.print()}>
        🖨️ {d.print}
      </button>
    </div>
  );
}
