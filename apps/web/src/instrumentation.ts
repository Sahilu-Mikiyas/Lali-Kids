import type { Instrumentation } from "next";

/**
 * Server errors (pages, route handlers, server actions, the proxy) go to the admins on Telegram
 * (src/lib/alerts.ts, docs/OPERATIONS.md). Only the route, the path without its query string and
 * the error message are sent: no headers, cookies or personal data.
 */
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const digest = typeof err === "object" && err !== null && "digest" in err ? String((err as { digest: unknown }).digest) : "";
  // Next's own signals (redirects, not-found, dynamic rendering) are not errors.
  if (/^(NEXT_|DYNAMIC_SERVER_USAGE|BAILOUT_TO_CLIENT)/.test(digest)) return;
  const message = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
  console.error(`[error] ${context.routeType} ${context.routePath}: ${message}${digest ? ` (digest ${digest})` : ""}`);
  const { alertAdmins } = await import("@/lib/alerts");
  await alertAdmins({
    kind: "server",
    where: `${request.method} ${request.path}`,
    message,
    detail: `${context.routeType} · ${context.routePath}${digest ? ` · digest ${digest}` : ""}`,
  });
};
