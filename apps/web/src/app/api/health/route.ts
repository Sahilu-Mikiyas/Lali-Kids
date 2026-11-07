import { connection } from "next/server";

import { isSupabaseConfigured, supabasePublishableKey, supabaseUrl } from "@/lib/supabase/env";

/*
  GET /api/health, for uptime monitors (docs/OPERATIONS.md).
  200 { ok: true, database: "reachable", ms }     the site is up and can read the database
  503 { ok: false, database: "unreachable", ms }  the site is up but the database isn't answering
  The database check reads one public row (the plan list) with the publishable key, with a
  3-second timeout. Nothing private is read or returned.
*/
export async function GET() {
  await connection();
  const started = Date.now();
  let database: "reachable" | "unreachable" | "not configured" = "not configured";
  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(`${supabaseUrl()}/rest/v1/plans?select=id&limit=1`, {
        headers: { apikey: supabasePublishableKey() },
        cache: "no-store",
        signal: AbortSignal.timeout(3000),
      });
      database = res.ok ? "reachable" : "unreachable";
    } catch {
      database = "unreachable";
    }
  }
  const ok = database !== "unreachable";
  return Response.json({ ok, database, ms: Date.now() - started }, { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}
