"use client";

import { useEffect } from "react";

/*
  Sends browser errors to /api/client-error, which tells the admins (docs/OPERATIONS.md).
  Only the message, the script file and line, and the page path (no query string) are sent; at
  most 5 reports per page visit, each distinct message once.
*/

const seen = new Set<string>();

export function reportClientError(message: string, extra: { source?: string; line?: number; col?: number; kind?: string } = {}) {
  if (typeof window === "undefined" || !message || seen.size >= 5 || seen.has(message)) return;
  seen.add(message);
  const body = JSON.stringify({ message: message.slice(0, 300), path: window.location.pathname, ...extra });
  try {
    if (navigator.sendBeacon?.("/api/client-error", new Blob([body], { type: "application/json" }))) return;
    void fetch("/api/client-error", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
  } catch {
    // Reporting must never cause an error of its own.
  }
}

export function ErrorReporter() {
  useEffect(() => {
    const onError = (e: ErrorEvent) => reportClientError(e.message || String(e.error ?? ""), { source: e.filename, line: e.lineno, col: e.colno, kind: "error" });
    const onRejection = (e: PromiseRejectionEvent) => {
      const r = e.reason as unknown;
      reportClientError(r instanceof Error ? `${r.name}: ${r.message}` : String(r ?? "unhandled rejection"), { kind: "unhandledrejection" });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
  return null;
}
