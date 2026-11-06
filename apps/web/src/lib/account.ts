import "server-only";

import { createSupabaseAdmin } from "@/lib/supabase/server";

/** Private bucket holding grown-ups' recorded voices, one folder per family. */
const VOICES_BUCKET = "family-voices";

type Admin = ReturnType<typeof createSupabaseAdmin>;

/** Every file path under a folder in a bucket (Storage lists one level at a time). */
async function listAll(admin: Admin, bucket: string, prefix: string): Promise<string[]> {
  const files: string[] = [];
  const folders = [prefix];
  while (folders.length) {
    const folder = folders.pop()!;
    for (let offset = 0; ; offset += 1000) {
      const { data, error } = await admin.storage.from(bucket).list(folder, { limit: 1000, offset });
      if (error || !data?.length) break;
      for (const item of data) {
        const path = folder ? `${folder}/${item.name}` : item.name;
        // Folders come back without an id.
        if (item.id === null) folders.push(path);
        else files.push(path);
      }
      if (data.length < 1000) break;
    }
  }
  return files;
}

async function removePaths(admin: Admin, bucket: string, paths: string[]) {
  for (let i = 0; i < paths.length; i += 500) {
    await admin.storage.from(bucket).remove(paths.slice(i, i + 500));
  }
}

/** Removes a family's recorded voices from Storage. Returns how many files were removed. */
export async function removeFamilyFiles(familyId: string): Promise<number> {
  if (!/^[0-9a-f-]{36}$/.test(familyId)) return 0;
  const admin = createSupabaseAdmin();
  const files = await listAll(admin, VOICES_BUCKET, familyId);
  await removePaths(admin, VOICES_BUCKET, files);
  return files.length;
}

/**
 * Deletes a family's account for good: their voice recordings first, then the sign-in account,
 * which removes the profile, children, stars, settings, game time, Telegram link and recording
 * rows with it. Payments are kept for the accounts without a link to the family (0010).
 */
export async function deleteFamilyAccount(familyId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await removeFamilyFiles(familyId);
    const { error } = await createSupabaseAdmin().auth.admin.deleteUser(familyId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Could not delete the account" };
  }
}

/**
 * Safety net for accounts deleted some other way (for example from the Supabase dashboard):
 * removes voice folders whose family no longer exists. Runs with the hourly job.
 */
export async function sweepOrphanVoiceFolders(): Promise<number> {
  const admin = createSupabaseAdmin();
  const { data } = await admin.storage.from(VOICES_BUCKET).list("", { limit: 1000 });
  const folders = (data ?? []).filter((d) => d.id === null && /^[0-9a-f-]{36}$/.test(d.name)).map((d) => d.name);
  if (!folders.length) return 0;
  const { data: alive } = await admin.from("profiles").select("id").in("id", folders);
  const keep = new Set((alive ?? []).map((p) => p.id));
  let removed = 0;
  for (const id of folders) if (!keep.has(id)) removed += await removeFamilyFiles(id);
  return removed;
}
