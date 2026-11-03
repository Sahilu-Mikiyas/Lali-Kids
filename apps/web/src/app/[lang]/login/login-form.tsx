"use client";

import { useT } from "@/i18n/provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { sendSignInEmail, verifySignInCode } from "./actions";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const t = useT().login;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);

  async function sendCode(e: React.SyntheticEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result = await sendSignInEmail(email, nextPath);
    setBusy(false);
    if (!result.ok) setError(result.error);
    else setStage("code");
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result = await verifySignInCode(email, code);
    setBusy(false);
    if (!result.ok) setError(result.error);
    else {
      router.replace(nextPath as never);
      router.refresh();
    }
  }

  return stage === "email" ? (
    <form onSubmit={sendCode} className="space-y-4">
      <label className="block space-y-1">
        <span className="font-bold">{t.email}</span>
        <input
          id="login-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl border-2 border-line px-4 py-3 text-lg outline-none focus:border-blue"
          placeholder="you@example.com"
        />
      </label>
      {error && <p className="text-coral">{error}</p>}
      <button type="submit" className="btn btn-primary w-full" disabled={busy}>
        {busy ? t.sending : t.send}
      </button>
    </form>
  ) : (
    <div className="space-y-4">
      <div className="space-y-3 rounded-2xl bg-sky-soft p-5">
        <p className="font-display text-2xl font-black">{t.check}</p>
        <p>
          {t.sentTo} <b>{email}</b>. {t.openLink}
        </p>
        <p className="text-sm text-muted">
          {t.hint}
        </p>
      </div>
      {error && <p className="text-coral">{error}</p>}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" className="font-bold text-muted hover:text-ink" onClick={() => setStage("email")}>
          {t.different}
        </button>
        <button type="button" className="btn btn-plain !px-4 !py-2 !text-base" disabled={busy} onClick={(e) => sendCode(e)}>
          {busy ? t.sending : t.again}
        </button>
      </div>
      {showCode ? (
        <form onSubmit={verify} className="space-y-3 border-t-2 border-line pt-4">
          <label className="block space-y-1">
            <span className="font-bold">{t.codeLabel}</span>
            <input
              id="login-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-2xl border-2 border-line px-4 py-3 text-center font-display text-3xl tracking-[0.4em] outline-none focus:border-blue"
              placeholder="123456"
            />
          </label>
          <button type="submit" className="btn btn-primary w-full" disabled={busy}>
            {busy ? t.checking : t.withCode}
          </button>
        </form>
      ) : (
        <button type="button" className="w-full text-center text-sm text-muted underline" onClick={() => setShowCode(true)}>
          {t.hasCode}
        </button>
      )}
    </div>
  );
}
