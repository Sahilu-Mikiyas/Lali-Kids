"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";

/** A sum a 4-year-old can't do yet keeps settings away from little fingers. */
function question() {
  const a = 6 + Math.floor(Math.random() * 7);
  const b = 4 + Math.floor(Math.random() * 6);
  const answer = a + b;
  return { a, b, answer, options: [answer, answer + 2, answer - 3].sort(() => Math.random() - 0.5) };
}

const noop = () => () => {};

export function GrownUpsGate({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [current, setQ] = useState(question);
  const [wrong, setWrong] = useState(false);
  // The sum is random, so it is only shown once the page runs in the browser: the server's
  // copy would differ and break hydration (React error 418).
  const live = useSyncExternalStore(noop, () => true, () => false);

  if (open) return <>{children}</>;
  if (!live) {
    return (
      <div className="mx-auto max-w-md space-y-5 rounded-[32px] bg-white p-8 text-center shadow-[0_8px_0_var(--color-line)]">
        <h1 className="font-display text-3xl font-black">Grown-ups only</h1>
        <p className="text-muted">To open the settings, answer this question.</p>
        <p className="font-display text-5xl font-black">? + ? = ?</p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-md space-y-5 rounded-[32px] bg-white p-8 text-center shadow-[0_8px_0_var(--color-line)]">
      <h1 className="font-display text-3xl font-black">Grown-ups only</h1>
      <p className="text-muted">To open the settings, answer this question.</p>
      <p className="font-display text-5xl font-black">
        {current.a} + {current.b} = ?
      </p>
      <div className="flex justify-center gap-3">
        {current.options.map((n) => (
          <button
            key={n}
            type="button"
            className="btn btn-plain min-w-20"
            onClick={() => {
              if (n === current.answer) setOpen(true);
              else {
                setWrong(true);
                setQ(question());
              }
            }}
          >
            {n}
          </button>
        ))}
      </div>
      {wrong && <p className="text-coral">That&rsquo;s not right. Here&rsquo;s a new one.</p>}
    </div>
  );
}
