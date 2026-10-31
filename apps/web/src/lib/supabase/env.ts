/**
 * Supabase settings come from the environment, never from source code.
 * Public values (safe in the browser) use the NEXT_PUBLIC_ prefix.
 */
export function supabaseUrl(): string {
  return required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL);
}

export function supabasePublishableKey(): string {
  return required(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY,
  );
}

/** Server only. Bypasses row-level security, so it never reaches the browser. */
export function supabaseSecretKey(): string {
  return required("SUPABASE_SECRET_KEY", process.env.SUPABASE_SECRET_KEY);
}

/** True when the server can use the secret key (paid-plan checks, book pages, uploads). */
export function hasSecretKey(): boolean {
  return Boolean(process.env.SUPABASE_SECRET_KEY);
}

export function isSupabaseConfigured(): boolean {
  return Boolean((process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL) && (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY));
}

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing ${name}. See docs/SETUP_SUPABASE.md.`);
  return value;
}
