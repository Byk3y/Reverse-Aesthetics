import { cache } from "react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Cookie-bound server client — carries the admin's session.
 * Use this in the admin section and route handlers, never on public pages
 * (it opts the route into dynamic rendering).
 *
 * Cached per request so the dozen-odd query helpers behind one admin page
 * share a single client (and its connections) instead of each building a new
 * one and re-reading cookies.
 */
export const serverClient = cache(async () => {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component — the middleware refreshes the
          // session cookie instead, so this is safe to swallow.
        }
      },
    },
  });
});

/**
 * The signed-in user, or null.
 *
 * `auth.getUser()` is a network call — it verifies the JWT against the auth
 * server rather than trusting the cookie, which is the whole point of using it
 * over getSession(). At ~600ms to eu-west-1 that is not something to do twice,
 * so this is wrapped in React's `cache`: every caller inside one request —
 * layout, page and any server action — shares a single lookup.
 */
export const currentUser = cache(async () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  const supabase = await serverClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

/**
 * The signed-in user, but only if they are on the admin roster.
 *
 * Also cached: the admin layout needs this, and so does every page and action
 * underneath it. Uncached, a single admin page load cost three sequential
 * round trips (getUser, getUser again via here, then admin_users) — about 1.8
 * seconds of waiting before a single row of data was even requested.
 */
export const currentAdmin = cache(async () => {
  const user = await currentUser();
  if (!user) return null;

  const supabase = await serverClient();
  const { data } = await supabase
    .from("admin_users")
    .select("user_id, email, full_name")
    .eq("user_id", user.id)
    .maybeSingle();

  return data ? { user, admin: data } : null;
});
