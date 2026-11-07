import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { safeNext } from "@/lib/safe-next";
import { createSupabaseServer } from "@/lib/supabase/server";

/**
 * Where the sign-in link in the email lands. Handles both kinds of link Supabase
 * can send: a one-time `code` (the default) or a `token_hash` (custom templates).
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;

  // Sign-in links requested by the Lali app: hand the one-time code to the app, which holds the
  // matching secret and finishes the sign-in itself. Nothing is exchanged here.
  if (url.searchParams.get("app") === "1") {
    const code = url.searchParams.get("code");
    const target = new URL("lali://auth");
    // Only a code-shaped value goes to the app (the app keeps the PKCE secret, so a stolen code is useless).
    if (code && /^[\w.-]{1,512}$/.test(code)) target.searchParams.set("code", code);
    else target.searchParams.set("error", (url.searchParams.get("error_description") ?? "link").slice(0, 200));
    return NextResponse.redirect(target.toString());
  }

  // Only a path on this site: "//evil.com" and "/\\evil.com" would leave it.
  const target = safeNext(url.searchParams.get("next"), "/account");
  const supabase = await createSupabaseServer();

  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;

  let ok = false;
  if (code) ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  else if (tokenHash && type) ok = !(await supabase.auth.verifyOtp({ token_hash: tokenHash, type })).error;

  return NextResponse.redirect(new URL(ok ? target : "/login?error=link", request.url));
}
