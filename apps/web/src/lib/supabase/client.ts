"use client";

import { createBrowserClient } from "@supabase/ssr";

import { supabasePublishableKey, supabaseUrl } from "./env";

export function createSupabaseBrowser() {
  return createBrowserClient(supabaseUrl(), supabasePublishableKey());
}
