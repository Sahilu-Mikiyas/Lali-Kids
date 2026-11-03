import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteNav } from "@/components/site-chrome";
import { AGE_BANDS } from "@/content/stories";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { field, Message } from "../stories/fields";
import { SubmitButton } from "../stories/submit-button";
import { deleteGame, saveGame, setGameStatus } from "./actions";

export const metadata: Metadata = { title: "Games" };

type Row = {
  id: string;
  slug: string;
  title: string;
  title_am: string | null;
  description: string | null;
  url: string;
  age_bands: string[];
  color: string;
  is_free: boolean;
  status: string;
  sort: number;
};

function GameForm({ g }: { g?: Row }) {
  return (
    <form action={saveGame} className="grid gap-4 sm:grid-cols-2">
      {g && <input type="hidden" name="id" value={g.id} />}
      <label className="block space-y-1">
        <span className="font-bold">Name</span>
        <input name="title" required maxLength={80} defaultValue={g?.title} className={field} />
      </label>
      <label className="block space-y-1">
        <span className="font-bold">Name in Amharic</span>
        <input name="title_am" maxLength={80} defaultValue={g?.title_am ?? ""} className={`${field} font-ethiopic`} />
      </label>
      <label className="block space-y-1 sm:col-span-2">
        <span className="font-bold">Game address</span>
        <input name="url" required placeholder="https://games.example.com/memory/" defaultValue={g?.url} className={field} />
        <span className="text-sm text-muted">The web version of the game, without ads. See docs/GAMES.md for what the game needs.</span>
      </label>
      <label className="block space-y-1 sm:col-span-2">
        <span className="font-bold">One-line description</span>
        <input name="description" maxLength={160} defaultValue={g?.description ?? ""} className={field} />
      </label>
      <fieldset className="space-y-1">
        <legend className="font-bold">Age groups</legend>
        <div className="flex flex-wrap gap-3">
          {AGE_BANDS.map((b) => (
            <label key={b} className="flex items-center gap-2">
              <input type="checkbox" name="age_bands" value={b} defaultChecked={(g?.age_bands ?? ["3-5"]).includes(b)} className="h-5 w-5" />
              {b}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid grid-cols-2 gap-3">
        <label className="block space-y-1">
          <span className="font-bold">Colour</span>
          <input name="color" type="color" defaultValue={g?.color ?? "#0FA3A3"} className="h-11 w-full rounded-xl border-2 border-line" />
        </label>
        <label className="block space-y-1">
          <span className="font-bold">Order</span>
          <input name="sort" type="number" defaultValue={g?.sort ?? 0} className={field} />
        </label>
      </div>
      <label className="block space-y-1">
        <span className="font-bold">Picture (optional)</span>
        <input name="thumbnail" type="file" accept="image/png,image/jpeg,image/webp" className="w-full text-sm" />
      </label>
      <label className="flex items-center gap-2 self-end font-bold">
        <input type="checkbox" name="is_free" defaultChecked={g?.is_free} className="h-5 w-5" /> Free (playable without a plan)
      </label>
      <div className="sm:col-span-2">
        <SubmitButton>{g ? "Save" : "Add game"}</SubmitButton>
      </div>
    </form>
  );
}

async function AdminGamesContent({ searchParams }: PageProps<"/[lang]/admin/games">) {
  await connection();
  if (!(await requireAdmin())) redirect("/account");
  const { message } = await searchParams;
  const { data } = await createSupabaseAdmin().from("games").select("*").order("sort").order("created_at");
  const games = (data ?? []) as Row[];

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-4 pb-20 pt-32 sm:px-6">
      <div>
        <h1 className="font-display text-5xl font-black">Games</h1>
        <p className="mt-2 text-lg text-muted">
          Add your team&rsquo;s web games. They run on Lali in a sealed-off frame with each family&rsquo;s daily time limit.
        </p>
      </div>
      <Message text={message} />
      {games.map((g) => (
        <section key={g.id} className="space-y-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="mr-auto font-display text-2xl font-black">{g.title}</h2>
            <span className={`rounded-full px-3 py-1 text-sm font-bold ${g.status === "published" ? "bg-teal text-white" : "bg-line"}`}>
              {g.status === "published" ? "Published" : "Draft"}
            </span>
            <Link href={`/games/${g.slug}`} target="_blank" className="btn btn-plain !py-2 !text-base">
              Try it
            </Link>
            <form action={setGameStatus}>
              <input type="hidden" name="id" value={g.id} />
              <input type="hidden" name="status" value={g.status === "published" ? "draft" : "published"} />
              <SubmitButton className="btn btn-plain !py-2 !text-base" busy="…">
                {g.status === "published" ? "Unpublish" : "Publish"}
              </SubmitButton>
            </form>
            <form action={deleteGame}>
              <input type="hidden" name="id" value={g.id} />
              <SubmitButton className="rounded-xl border-2 border-coral px-3 py-1.5 font-bold text-coral" busy="…" confirm={`Delete ${g.title}?`}>
                Delete
              </SubmitButton>
            </form>
          </div>
          <details>
            <summary className="cursor-pointer font-bold text-blue">Edit</summary>
            <div className="mt-4">
              <GameForm g={g} />
            </div>
          </details>
        </section>
      ))}
      <section className="space-y-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
        <h2 className="font-display text-2xl font-black">Add a game</h2>
        <GameForm />
      </section>
    </main>
  );
}

export default function AdminGamesPage(props: PageProps<"/[lang]/admin/games">) {
  return (
    <>
      <SiteNav />
      <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
        <AdminGamesContent {...props} />
      </Suspense>
    </>
  );
}
