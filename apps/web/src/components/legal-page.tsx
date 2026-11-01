import type { ReactNode } from "react";

import { SiteFooter, SiteNav } from "./site-chrome";

/** Shared layout for the privacy policy and terms: readable column, clear headings. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 pb-10 pt-32 sm:px-6">
        <p className="mb-6 rounded-2xl bg-gold/20 p-4 text-sm font-bold">
          Draft for review. This text has not yet been checked by a lawyer and may change before Lali launches.
        </p>
        <h1 className="font-display text-5xl font-black">{title}</h1>
        <p className="mt-2 text-muted">Last updated {updated}</p>
        <div className="mt-10 space-y-6 text-lg leading-relaxed [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-black [&_li]:ml-6 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
