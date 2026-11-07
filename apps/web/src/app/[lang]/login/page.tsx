import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { redirect } from "next/navigation";

import { Bee } from "@/components/characters";
import { SiteNav } from "@/components/site-chrome";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getT } from "@/i18n/server";
import { safeNext } from "@/lib/safe-next";
import { currentUser } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

async function LoginPageContent({ searchParams }: PageProps<"/[lang]/login">) {
  await connection();
  const t = await getT();
  const { next, error } = await searchParams;
  const nextPath = safeNext(next, "/library");

  if (isSupabaseConfigured() && (await currentUser())) redirect(nextPath);

  return (
    <>
      <SiteNav />
      <main className="mx-auto grid min-h-dvh max-w-md place-items-center px-4 pt-24 sm:px-6">
        <div className="w-full space-y-6 rounded-[32px] bg-white p-8 shadow-[0_8px_0_var(--color-line)]">
          <div className="flex items-center gap-3">
            <Bee size={48} />
            <div>
              <h1 className="font-display text-3xl font-black">{t.login.title}</h1>
              <p className="text-muted">{t.login.sub}</p>
            </div>
          </div>
          {error === "link" && (
            <p className="rounded-2xl bg-coral/10 p-4 text-coral">
              That sign-in link didn&rsquo;t work. It may have expired or been opened on another device. Request a new one below.
            </p>
          )}
          {isSupabaseConfigured() ? (
            <LoginForm nextPath={nextPath} />
          ) : (
            <p className="rounded-2xl bg-bg p-4 text-muted">{t.login.notConnected}</p>
          )}
        </div>
      </main>
    </>
  );
}

export default function LoginPage(props: PageProps<"/[lang]/login">) {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
      <LoginPageContent {...props} />
    </Suspense>
  );
}
