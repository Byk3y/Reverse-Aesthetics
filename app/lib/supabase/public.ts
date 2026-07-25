import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/**
 * Cookie-less anon client for the public blog.
 *
 * Deliberately session-free: it reads nothing from cookies or headers, so
 * pages using it stay statically renderable and can be served from the ISR
 * cache rather than being forced into dynamic rendering.
 */
let cached: SupabaseClient | null = null;

export function publicClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (cached) return cached;

  cached = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return cached;
}
