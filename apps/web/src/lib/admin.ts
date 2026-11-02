import "server-only";

import { randomBytes } from "node:crypto";

import { createSupabaseAdmin, currentProfile } from "@/lib/supabase/server";
import { MEDIA_BUCKET } from "@/lib/stories";

/** The signed-in admin, or null. Every admin action checks this first. */
export async function requireAdmin() {
  const profile = await currentProfile();
  return profile?.role === "admin" ? profile : null;
}

export function slugify(s: string) {
  const base = s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50) || "story";
  return `${base}-${randomBytes(3).toString("hex")}`;
}

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const AUDIO_TYPES: Record<string, string> = {
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/mp4": "m4a",
  "audio/x-m4a": "m4a",
  "audio/aac": "aac",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/ogg": "ogg",
  "audio/webm": "webm",
};

export function isFile(v: FormDataEntryValue | null): v is File {
  return v instanceof File && v.size > 0;
}

/**
 * Stores a picture as WebP (max 1600px wide, metadata removed) and returns its path.
 * Throws a readable message when the file isn't a picture or is too big.
 */
export async function storeImage(file: File, folder: string): Promise<string> {
  if (!IMAGE_TYPES.includes(file.type)) throw new Error("Pictures must be PNG, JPG or WebP.");
  if (file.size > 15 * 1024 * 1024) throw new Error("Pictures must be under 15 MB.");
  const sharp = (await import("sharp")).default;
  const webp = await sharp(Buffer.from(await file.arrayBuffer()))
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  const path = `${folder}/${randomBytes(8).toString("hex")}.webp`;
  const { error } = await createSupabaseAdmin().storage.from(MEDIA_BUCKET).upload(path, webp, { contentType: "image/webp" });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return path;
}

export async function storeAudio(file: File, folder: string): Promise<string> {
  const ext = AUDIO_TYPES[file.type];
  if (!ext) throw new Error("Narration must be MP3, M4A, WAV, OGG or WebM.");
  if (file.size > 30 * 1024 * 1024) throw new Error("Narration files must be under 30 MB.");
  const path = `${folder}/${randomBytes(8).toString("hex")}.${ext}`;
  const { error } = await createSupabaseAdmin().storage.from(MEDIA_BUCKET).upload(path, file, { contentType: file.type });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return path;
}

export async function removeMedia(paths: (string | null | undefined)[]) {
  const list = paths.filter((p): p is string => Boolean(p));
  if (list.length) await createSupabaseAdmin().storage.from(MEDIA_BUCKET).remove(list);
}
