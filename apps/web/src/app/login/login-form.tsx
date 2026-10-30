"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createSupabaseBrowser } from "@/lib/supabase/client";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await createSupabaseBrowser().auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    setBusy(false);
    if (error) setError(error.message);
    else setStage("code");
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await createSupabaseBrowser().auth.verifyOtp({ email, token: code.trim(), type: "email" });
    setBusy(false);
    if (error) setError("That code didn't work. Check it and try again, or request a new one.");
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
        {busy ? "Sending…" : "Email me a code"}
      </button>
    </form>
  ) : (
    <form onSubmit={verify} className="space-y-4">
      <p className="text-muted">
        We sent a code to <b>{email}</b>.
      </p>
      <label className="block space-y-1">
        <span className="font-bold">6-digit code</span>
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
      {error && <p className="text-coral">{error}</p>}
      <button type="submit" className="btn btn-primary w-full" disabled={busy}>
        {busy ? "Checking…" : "Sign in"}
      </button>
      <button type="button" className="w-full text-center font-bold text-muted hover:text-ink" onClick={() => setStage("email")}>
        Use a different email
      </button>
    </form>
  );
}
