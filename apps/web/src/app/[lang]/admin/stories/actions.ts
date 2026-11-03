"use server";

import { revalidate } from "@/lib/revalidate";
import { redirect } from "next/navigation";

import { AGE_BANDS, CATEGORIES } from "@/content/stories";
import { isFile, removeMedia, requireAdmin, slugify, storeAudio, storeImage } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

const text = (form: FormData, key: string, max = 200) => String(form.get(key) ?? "").trim().slice(0, max);

function details(form: FormData) {
  const bands = form.getAll("age_bands").map(String).filter((b) => (AGE_BANDS as string[]).includes(b));
  const category = text(form, "category");
  const color = text(form, "color");
  return {
    title_en: text(form, "title_en", 120),
    title_am: text(form, "title_am", 120) || null,
    category: (CATEGORIES as string[]).includes(category) ? category : "Bedtime",
    age_bands: bands.length ? bands : ["3-5"],
    color: /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#2B3A8C",
    is_free: form.get("is_free") === "on",
  };
}

function refresh(id?: string) {
  revalidate("/admin/stories");
  if (id) revalidate(`/admin/stories/${id}`);
  revalidate("/stories");
}

/** Sends the admin back to the editor with a message instead of an error page. */
function back(id: string, message: string): never {
  redirect(`/admin/stories/${id}?message=${encodeURIComponent(message)}`);
}

export async function createStory(form: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const d = details(form);
  if (!d.title_en) redirect("/admin/stories?message=Give+the+story+a+title");
  const db = createSupabaseAdmin();
  const { data, error } = await db
    .from("stories")
    .insert({ ...d, slug: slugify(d.title_en), created_by: admin.id })
    .select("id")
    .single();
  if (error || !data) redirect(`/admin/stories?message=${encodeURIComponent(error?.message ?? "Could not create the story")}`);
  await db.from("story_pages").insert({ story_id: data.id, position: 0 });
  refresh();
  redirect(`/admin/stories/${data.id}`);
}

export async function updateStory(form: FormData) {
  if (!(await requireAdmin())) return;
  const id = text(form, "id");
  const d = details(form);
  if (!d.title_en) back(id, "The story needs a title.");
  await createSupabaseAdmin().from("stories").update({ ...d, updated_at: new Date().toISOString() }).eq("id", id);
  refresh(id);
  back(id, "Saved.");
}

export async function setStoryStatus(form: FormData) {
  if (!(await requireAdmin())) return;
  const id = text(form, "id");
  const status = form.get("status") === "published" ? "published" : "draft";
  const db = createSupabaseAdmin();
  if (status === "published") {
    const { data: pages } = await db.from("story_pages").select("text_en").eq("story_id", id);
    if (!pages?.length || pages.some((p) => !p.text_en.trim())) back(id, "Every page needs English text before publishing.");
  }
  await db.from("stories").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  refresh(id);
  back(id, status === "published" ? "Published. Families can see it now." : "Moved back to drafts.");
}

export async function deleteStory(form: FormData) {
  if (!(await requireAdmin())) return;
  const id = text(form, "id");
  const db = createSupabaseAdmin();
  const { data: pages } = await db.from("story_pages").select("image_path, audio_en_path, audio_am_path").eq("story_id", id);
  await removeMedia((pages ?? []).flatMap((p) => [p.image_path, p.audio_en_path, p.audio_am_path]));
  await db.from("stories").delete().eq("id", id);
  refresh();
  redirect("/admin/stories?message=Story+deleted");
}

export async function savePage(form: FormData) {
  if (!(await requireAdmin())) return;
  const storyId = text(form, "story_id");
  const pageId = text(form, "page_id");
  const db = createSupabaseAdmin();
  const { data: page } = await db.from("story_pages").select("*").eq("id", pageId).eq("story_id", storyId).single();
  if (!page) back(storyId, "That page no longer exists.");

  const update: Record<string, string | null> = {
    text_en: text(form, "text_en", 2000),
    text_am: text(form, "text_am", 2000),
  };
  const old: (string | null)[] = [];
  const folder = `stories/${storyId}`;
  try {
    const image = form.get("image");
    if (isFile(image)) {
      update.image_path = await storeImage(image, folder);
      old.push(page.image_path);
    }
    for (const lang of ["en", "am"] as const) {
      const audio = form.get(`audio_${lang}`);
      if (isFile(audio)) {
        update[`audio_${lang}_path`] = await storeAudio(audio, folder);
        old.push(page[`audio_${lang}_path`]);
      } else if (form.get(`remove_audio_${lang}`) === "on") {
        update[`audio_${lang}_path`] = null;
        old.push(page[`audio_${lang}_path`]);
      }
    }
  } catch (e) {
    back(storyId, e instanceof Error ? e.message : "Upload failed.");
  }
  await db.from("story_pages").update(update).eq("id", pageId);
  await removeMedia(old);
  refresh(storyId);
  back(storyId, `Page ${page.position + 1} saved.`);
}

export async function addPage(form: FormData) {
  if (!(await requireAdmin())) return;
  const storyId = text(form, "story_id");
  const db = createSupabaseAdmin();
  const { count } = await db.from("story_pages").select("id", { count: "exact", head: true }).eq("story_id", storyId);
  if ((count ?? 0) >= 40) back(storyId, "Stories can have up to 40 pages.");
  await db.from("story_pages").insert({ story_id: storyId, position: count ?? 0 });
  refresh(storyId);
  back(storyId, "Page added.");
}

/** Rewrites positions 0..n-1 in the given order. */
async function renumber(storyId: string, ids: string[]) {
  const db = createSupabaseAdmin();
  await Promise.all(ids.map((id, position) => db.from("story_pages").update({ position }).eq("id", id).eq("story_id", storyId)));
}

async function pageOrder(storyId: string) {
  const { data } = await createSupabaseAdmin().from("story_pages").select("id").eq("story_id", storyId).order("position");
  return (data ?? []).map((p) => p.id);
}

export async function movePage(form: FormData) {
  if (!(await requireAdmin())) return;
  const storyId = text(form, "story_id");
  const pageId = text(form, "page_id");
  const dir = form.get("dir") === "up" ? -1 : 1;
  const ids = await pageOrder(storyId);
  const i = ids.indexOf(pageId);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= ids.length) back(storyId, "Can't move that page further.");
  [ids[i], ids[j]] = [ids[j], ids[i]];
  await renumber(storyId, ids);
  refresh(storyId);
  back(storyId, "Page moved.");
}

export async function deletePage(form: FormData) {
  if (!(await requireAdmin())) return;
  const storyId = text(form, "story_id");
  const pageId = text(form, "page_id");
  const db = createSupabaseAdmin();
  const ids = await pageOrder(storyId);
  if (ids.length <= 1) back(storyId, "A story needs at least one page.");
  const { data: page } = await db.from("story_pages").select("image_path, audio_en_path, audio_am_path").eq("id", pageId).eq("story_id", storyId).single();
  await db.from("story_pages").delete().eq("id", pageId).eq("story_id", storyId);
  await removeMedia([page?.image_path, page?.audio_en_path, page?.audio_am_path]);
  await renumber(
    storyId,
    ids.filter((id) => id !== pageId),
  );
  refresh(storyId);
  back(storyId, "Page deleted.");
}

export async function setCover(form: FormData) {
  if (!(await requireAdmin())) return;
  const storyId = text(form, "story_id");
  const position = Number(form.get("position"));
  if (!Number.isInteger(position) || position < 0) back(storyId, "Pick a page.");
  await createSupabaseAdmin().from("stories").update({ cover_page: position }).eq("id", storyId);
  refresh(storyId);
  back(storyId, `Page ${position + 1} is now the cover.`);
}
