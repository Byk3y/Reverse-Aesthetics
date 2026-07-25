/**
 * Supabase environment configuration.
 *
 * Every accessor is deliberately lazy and non-throwing so the site still
 * builds and renders (with an empty blog) before the keys are in place.
 * Only the admin section hard-requires credentials.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const MEDIA_BUCKET = "blog-media";

/** True once the public (anon) credentials are available. */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

let warned = false;

/** Warn once per process instead of on every query. */
export function warnUnconfigured(context: string): void {
  if (warned || process.env.NODE_ENV === "production") return;
  warned = true;
  console.warn(
    `[supabase] ${context} skipped — set NEXT_PUBLIC_SUPABASE_URL and ` +
      `NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to enable the blog.`
  );
}

/** The storage hostname, used by next.config image remotePatterns. */
export function supabaseStorageHost(): string | null {
  if (!SUPABASE_URL) return null;
  try {
    return new URL(SUPABASE_URL).hostname;
  } catch {
    return null;
  }
}
