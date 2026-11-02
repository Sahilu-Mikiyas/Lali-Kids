"use client";

import { useFormStatus } from "react-dom";

/** A submit button that says what's happening while uploads run. */
export function SubmitButton({ children, busy = "Saving…", className = "btn btn-primary", confirm }: { children: React.ReactNode; busy?: string; className?: string; confirm?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
    >
      {pending ? busy : children}
    </button>
  );
}
