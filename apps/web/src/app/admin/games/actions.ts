"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { AGE_BANDS } from "@/content/stories";
import { isFile, removeMedia, requireAdmin, slugify, storeImage } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";

const text = (form: FormData, key: string, max = 200) => String(form.get(key) ?? "").trim().slice(0, max);

function back(message: string): never {
  redirect(`/admin/games?message=${encodeURIComponent(message)}`);
}

function refresh() {
  revalidatePath("/admin/games");
  revalidatePath("/games");
}

/** Only HTTPS addresses, or games hosted on Lali itself under /games/. */
function gameUrl(raw: string): string | null {
  if (/^\/games\/[\w\-/.]+$/.test(raw) && !raw.includes("..")) return raw;
  try {
    const u = new URL(raw);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

function details(form: FormData) {
  const bands = form.getAll("age_bands").map(String).filter((b) => (AGE_BANDS as string[]).includes(b));
  const color = text(form, "color");
  return {
    title: text(form, "title", 80),
    title_am: text(form, "title_am", 80) || null,
    description: text(form, "description", 160) || null,
    url: gameUrl(text(form, "url", 500)),
    age_bands: bands.length ? bands : ["3-5"],
    color: /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#0FA3A3",
    is_free: form.get("is_free") === "on",
    sort: Number.parseInt(text(form, "sort"), 10) || 0,
  };
}

export async function saveGame(form: FormData) {
  if (!(await requireAdmin())) return;
  const id = text(form, "id");
  const d = details(form);
  if (!d.title) back("Give the game a name.");
  if (!d.url) back("The game's address must start with https:// (or /games/ for games hosted on Lali).");
  const db = createSupabaseAdmin();

  let thumbnail: string | undefined;
  const image = form.get("thumbnail");
  if (isFile(image)) {
    try {
      thumbnail = await storeImage(image, "games");
    } catch (e) {
      back(e instanceof Error ? e.message : "Upload failed.");
    }
  }

  if (id) {
    const { data: old } = await db.from("games").select("thumbnail_path").eq("id", id).single();
    await db
      .from("games")
      .update({ ...d, ...(thumbnail ? { thumbnail_path: thumbnail } : {}) })
      .eq("id", id);
    if (thumbnail) await removeMedia([old?.thumbnail_path]);
    refresh();
    back(`Saved ${d.title}.`);
  }
  const { error } = await db.from("games").insert({ ...d, slug: slugify(d.title), thumbnail_path: thumbnail ?? null });
  if (error) back(error.message);
  refresh();
  back(`Added ${d.title} as a draft. Try it, then publish.`);
}

export async function setGameStatus(form: FormData) {
  if (!(await requireAdmin())) return;
  const status = form.get("status") === "published" ? "published" : "draft";
  await createSupabaseAdmin().from("games").update({ status }).eq("id", text(form, "id"));
  refresh();
  back(status === "published" ? "Published." : "Moved back to drafts.");
}

export async function deleteGame(form: FormData) {
  if (!(await requireAdmin())) return;
  const db = createSupabaseAdmin();
  const id = text(form, "id");
  const { data } = await db.from("games").select("thumbnail_path").eq("id", id).single();
  await db.from("games").delete().eq("id", id);
  await removeMedia([data?.thumbnail_path]);
  refresh();
  back("Game deleted.");
}
