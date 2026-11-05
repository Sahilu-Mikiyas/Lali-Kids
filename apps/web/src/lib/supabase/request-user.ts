import "server-only";

import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

import { supabasePublishableKey, supabaseUrl } from "./env";
import { createSupabaseServer } from "./server";

export type RequestUser = { user: User; supabase: SupabaseClient };

/**
 * The signed-in person behind a request: the mobile app sends `Authorization: Bearer <access token>`,
 * the website sends its session cookie. The returned client acts as that person, so
 * row-level security still applies.
 */
export async function requestUser(request: Request): Promise<RequestUser | null> {
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  if (token) {
    const supabase = createClient(supabaseUrl(), supabasePublishableKey(), {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data } = await supabase.auth.getUser(token);
    return data.user ? { user: data.user, supabase } : null;
  }
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  return data.user ? { user: data.user, supabase } : null;
}
