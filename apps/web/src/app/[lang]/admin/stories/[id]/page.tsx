import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteNav } from "@/components/site-chrome";
import { requireAdmin } from "@/lib/admin";
import { MEDIA_BUCKET } from "@/lib/stories";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { addPage, deletePage, deleteStory, movePage, savePage, setCover, setStoryStatus, updateStory } from "../actions";
import { field, Message, StoryFields } from "../fields";
import { SubmitButton } from "../submit-button";

export const metadata: Metadata = { title: "Edit story" };

type Page = { id: string; position: number; text_en: string; text_am: string; image_path: string | null; audio_en_path: string | null; audio_am_path: string | null };

async function EditorContent({ params, searchParams }: PageProps<"/[lang]/admin/stories/[id]">) {
  await connection();
  if (!(await requireAdmin())) redirect("/account");
  const [{ id }, { message }] = await Promise.all([params, searchParams]);
  const db = createSupabaseAdmin();
  const [{ data: story }, { data: pageRows }] = await Promise.all([
    db.from("stories").select("*").eq("id", id).maybeSingle(),
    db.from("story_pages").select("*").eq("story_id", id).order("position"),
  ]);
  if (!story) notFound();
  const pages = (pageRows ?? []) as Page[];

  const paths = pages.flatMap((p) => [p.image_path, p.audio_en_path, p.audio_am_path]).filter((p): p is string => Boolean(p));
  const { data: signed } = paths.length ? await db.storage.from(MEDIA_BUCKET).createSignedUrls(paths, 3600) : { data: [] };
  const link = new Map((signed ?? []).map((s) => [s.path, s.signedUrl]));
  const url = (p: string | null) => (p ? (link.get(p) ?? undefined) : undefined);

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 pb-20 pt-32 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/admin/stories" className="font-bold text-muted hover:text-ink">
            ← Story studio
          </Link>
          <h1 className="mt-2 font-display text-4xl font-black">{story.title_en}</h1>
          <p className="text-muted">
            {story.status === "published" ? "Published" : "Draft"} · {pages.length} {pages.length === 1 ? "page" : "pages"}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={`/stories/${story.slug}`} className="btn btn-plain !text-base" target="_blank">
            Preview
          </Link>
          <form action={setStoryStatus}>
            <input type="hidden" name="id" value={story.id} />
            <input type="hidden" name="status" value={story.status === "published" ? "draft" : "published"} />
            <SubmitButton className={story.status === "published" ? "btn btn-plain !text-base" : "btn btn-primary !text-base"}>
              {story.status === "published" ? "Unpublish" : "Publish"}
            </SubmitButton>
          </form>
        </div>
      </div>
      <Message text={message} />

      <section className="space-y-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
        <h2 className="font-display text-2xl font-black">Details</h2>
        <form action={updateStory} className="space-y-4">
          <input type="hidden" name="id" value={story.id} />
          <StoryFields v={story} />
          <SubmitButton>Save details</SubmitButton>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-black">Pages</h2>
        <p className="text-muted">
          Each page has a picture (PNG, JPG or WebP; landscape 4:3 looks best), text in both languages and, if you have it, recorded
          narration. Without narration, the browser&rsquo;s voice reads the English text.
        </p>
        {pages.map((p) => (
          <article key={p.id} className="space-y-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="mr-auto font-display text-xl font-black">
                Page {p.position + 1}
                {story.cover_page === p.position && <span className="ml-2 rounded-full bg-gold px-2.5 py-0.5 align-middle text-xs">Cover</span>}
              </h3>
              {[
                { action: movePage, dir: "up", label: "↑ Up", show: p.position > 0 },
                { action: movePage, dir: "down", label: "↓ Down", show: p.position < pages.length - 1 },
              ]
                .filter((b) => b.show)
                .map((b) => (
                  <form key={b.dir} action={b.action}>
                    <input type="hidden" name="story_id" value={story.id} />
                    <input type="hidden" name="page_id" value={p.id} />
                    <input type="hidden" name="dir" value={b.dir} />
                    <SubmitButton className="rounded-xl border-2 border-line px-3 py-1.5 font-bold" busy="…">
                      {b.label}
                    </SubmitButton>
                  </form>
                ))}
              {story.cover_page !== p.position && (
                <form action={setCover}>
                  <input type="hidden" name="story_id" value={story.id} />
                  <input type="hidden" name="position" value={p.position} />
                  <SubmitButton className="rounded-xl border-2 border-line px-3 py-1.5 font-bold" busy="…">
                    Use as cover
                  </SubmitButton>
                </form>
              )}
              {pages.length > 1 && (
                <form action={deletePage}>
                  <input type="hidden" name="story_id" value={story.id} />
                  <input type="hidden" name="page_id" value={p.id} />
                  <SubmitButton className="rounded-xl border-2 border-coral px-3 py-1.5 font-bold text-coral" busy="…" confirm={`Delete page ${p.position + 1}?`}>
                    Delete
                  </SubmitButton>
                </form>
              )}
            </div>

            <form action={savePage} className="grid gap-4 md:grid-cols-[240px_1fr]">
              <input type="hidden" name="story_id" value={story.id} />
              <input type="hidden" name="page_id" value={p.id} />
              <div className="space-y-2">
                <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl text-white" style={{ background: story.color }}>
                  {url(p.image_path) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={url(p.image_path)} alt={`Page ${p.position + 1}`} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold">No picture yet</span>
                  )}
                </div>
                <input type="file" name="image" accept="image/png,image/jpeg,image/webp" className="w-full text-sm" aria-label="Picture" />
              </div>
              <div className="space-y-3">
                <label className="block space-y-1">
                  <span className="font-bold">English text</span>
                  <textarea name="text_en" rows={3} maxLength={2000} defaultValue={p.text_en} className={field} />
                </label>
                <label className="block space-y-1">
                  <span className="font-bold">Amharic text</span>
                  <textarea name="text_am" rows={3} maxLength={2000} defaultValue={p.text_am} className={`${field} font-ethiopic`} />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(["en", "am"] as const).map((lang) => {
                    const audio = url(lang === "en" ? p.audio_en_path : p.audio_am_path);
                    return (
                      <div key={lang} className="space-y-1">
                        <span className="font-bold">Narration ({lang === "en" ? "English" : "Amharic"})</span>
                        {audio && <audio controls src={audio} className="w-full" />}
                        <input type="file" name={`audio_${lang}`} accept="audio/*" className="w-full text-sm" aria-label={`Narration ${lang}`} />
                        {audio && (
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" name={`remove_audio_${lang}`} /> Remove this recording
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>
                <SubmitButton busy="Uploading and saving…">Save page {p.position + 1}</SubmitButton>
              </div>
            </form>
          </article>
        ))}
        <form action={addPage}>
          <input type="hidden" name="story_id" value={story.id} />
          <SubmitButton className="btn btn-plain" busy="Adding…">
            + Add a page
          </SubmitButton>
        </form>
      </section>

      <section className="rounded-[28px] border-2 border-coral/40 p-6">
        <form action={deleteStory} className="flex flex-wrap items-center justify-between gap-3">
          <input type="hidden" name="id" value={story.id} />
          <p className="text-muted">Deleting removes the story, its pictures and narration for good.</p>
          <SubmitButton className="rounded-xl border-2 border-coral px-4 py-2 font-bold text-coral" busy="Deleting…" confirm="Delete this story for good?">
            Delete story
          </SubmitButton>
        </form>
      </section>
    </main>
  );
}

export default function EditStoryPage(props: PageProps<"/[lang]/admin/stories/[id]">) {
  return (
    <>
      <SiteNav />
      <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
        <EditorContent {...props} />
      </Suspense>
    </>
  );
}
