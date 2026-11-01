"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { sendSignInEmail, verifySignInCode } from "./actions";

export function LoginForm({ nextPath }: { nextPath: string }) {
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
        <span className="font-bold">Email</span>
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
        {busy ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  ) : (
    <div className="space-y-4">
      <div className="space-y-3 rounded-2xl bg-sky-soft p-5">
        <p className="font-display text-2xl font-black">Check your email</p>
        <p>
          We sent an email to <b>{email}</b>. Open it and tap the <b>sign-in link</b>. You&rsquo;ll come straight back here,
          signed in.
        </p>
        <p className="text-sm text-muted">
          Open the link in this same browser. New here? The email may say &ldquo;Confirm your signup&rdquo;; tapping that link signs
          you in too. Can&rsquo;t find it? Check your spam folder.
        </p>
      </div>
      {error && <p className="text-coral">{error}</p>}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" className="font-bold text-muted hover:text-ink" onClick={() => setStage("email")}>
          Use a different email
        </button>
        <button type="button" className="btn btn-plain !px-4 !py-2 !text-base" disabled={busy} onClick={(e) => sendCode(e)}>
          {busy ? "Sending…" : "Send the email again"}
        </button>
      </div>
      {showCode ? (
        <form onSubmit={verify} className="space-y-3 border-t-2 border-line pt-4">
          <label className="block space-y-1">
            <span className="font-bold">6-digit code from the email</span>
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
            {busy ? "Checking…" : "Sign in with code"}
          </button>
        </form>
      ) : (
        <button type="button" className="w-full text-center text-sm text-muted underline" onClick={() => setShowCode(true)}>
          My email has a 6-digit code instead
        </button>
      )}
    </div>
  );
}
