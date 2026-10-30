import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import { isSupabaseConfigured, supabasePublishableKey, supabaseSecretKey, supabaseUrl } from "./env";

/** A client that acts as the signed-in person. Row-level security applies. */
export async function createSupabaseServer() {
  const store = await cookies();
  return createServerClient(supabaseUrl(), supabasePublishableKey(), {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Server Components can't set cookies; the proxy refreshes sessions instead.
        }
      },
    },
  });
}

/** A client with the secret key. Server only; bypasses row-level security. */
export function createSupabaseAdmin() {
  return createClient(supabaseUrl(), supabaseSecretKey(), { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function currentUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function currentProfile() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  const { data: profile } = await supabase.from("profiles").select("id, display_name, role").eq("id", data.user.id).single();
  return profile ? { ...profile, email: data.user.email } : null;
}
