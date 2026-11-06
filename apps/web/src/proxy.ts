import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { isLang, LANG_COOKIE, type UiLang } from "@/i18n/langs";
import { isSupabaseConfigured, supabasePublishableKey, supabaseUrl } from "@/lib/supabase/env";

/** Paths that need the sign-in session refreshed. The rest skip that work. */
// Family voice uploads (/api/voices, up to 4 MB) pass through here too: the body is buffered
// up to experimental.proxyClientMaxBodySize in next.config.ts (110 MB), well above that.
const SESSION_PATHS = ["/library", "/admin", "/account", "/login", "/stories", "/stickers", "/subscribe", "/games", "/api/books", "/api/voices", "/api/stickers"];
const SIGN_IN_PATHS = ["/library", "/admin", "/account", "/subscribe"];
const YEAR = 60 * 60 * 24 * 365;

function chooseLang(request: NextRequest): UiLang {
  const saved = request.cookies.get(LANG_COOKIE)?.value;
  if (isLang(saved)) return saved;
  return /(^|,)\s*am\b/i.test(request.headers.get("accept-language") ?? "") ? "am" : "en";
}

/**
 * 1. Language: every page exists in English and Amharic under /en/… and /am/…. Visitors keep
 *    plain addresses (/stories); the chosen language (cookie) decides which version is shown.
 *    Shared links like /am/stories set the language and then show the plain address.
 * 2. Keeps the sign-in session fresh and sends signed-out visitors away from private areas.
 */
export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const prefixed = /^\/(en|am)(\/.*)?$/.exec(pathname);
  if (prefixed) {
    const url = request.nextUrl.clone();
    url.pathname = prefixed[2] || "/";
    const res = NextResponse.redirect(url);
    res.cookies.set(LANG_COOKIE, prefixed[1], { path: "/", maxAge: YEAR, sameSite: "lax" });
    return res;
  }

  // A sign-in link that falls back to the site's home page still signs the person in.
  if (pathname === "/" && searchParams.has("code")) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/callback";
    return NextResponse.redirect(url);
  }

  const isPage = !pathname.startsWith("/api/") && !pathname.startsWith("/auth/");
  const target = request.nextUrl.clone();
  if (isPage) target.pathname = `/${chooseLang(request)}${pathname === "/" ? "" : pathname}`;
  const pass = () => (isPage ? NextResponse.rewrite(target, { request }) : NextResponse.next({ request }));

  let response = pass();
  if (!isSupabaseConfigured() || !SESSION_PATHS.some((p) => pathname.startsWith(p))) return response;

  const supabase = createServerClient(supabaseUrl(), supabasePublishableKey(), {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = pass();
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && SIGN_IN_PATHS.some((p) => pathname.startsWith(p))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = {
  // Everything except Next's own files, static files with an extension, and webhooks.
  matcher: ["/((?!_next/|api/payments|api/telegram|api/cron|favicon\\.ico|.*\\.[a-z0-9]{2,5}$).*)"],
};
