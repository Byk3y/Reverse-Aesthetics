"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Browser client for the admin UI — writes the session to cookies so the
 * server client and middleware can read it.
 */
let cached: ReturnType<typeof createBrowserClient> | null = null;

export function browserClient() {
  if (!cached) {
    cached = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return cached;
}
