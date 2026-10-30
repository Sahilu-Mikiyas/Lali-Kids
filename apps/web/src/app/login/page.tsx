import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";

import { Bee } from "@/components/characters";
import { SiteNav } from "@/components/site-chrome";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { currentUser } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

async function LoginPageContent({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" && next.startsWith("/") ? next : "/library";

  if (isSupabaseConfigured() && (await currentUser())) redirect(nextPath);

  return (
    <>
      <SiteNav />
      <main className="mx-auto grid min-h-dvh max-w-md place-items-center px-4 pt-24 sm:px-6">
        <div className="w-full space-y-6 rounded-[32px] bg-white p-8 shadow-[0_8px_0_var(--color-line)]">
          <div className="flex items-center gap-3">
            <Bee size={48} />
            <div>
              <h1 className="font-display text-3xl font-black">Grown-ups sign in</h1>
              <p className="text-muted">We&rsquo;ll email you a 6-digit code. No password to remember.</p>
            </div>
          </div>
          {isSupabaseConfigured() ? (
            <LoginForm nextPath={nextPath} />
          ) : (
            <p className="rounded-2xl bg-bg p-4 text-muted">Sign-in isn&rsquo;t connected yet. See docs/SETUP_SUPABASE.md.</p>
          )}
        </div>
      </main>
    </>
  );
}

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
      <LoginPageContent {...props} />
    </Suspense>
  );
}
