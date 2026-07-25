import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Cookie-bound server client — carries the admin's session.
 * Use this in the admin section and route handlers, never on public pages
 * (it opts the route into dynamic rendering).
 */
export async function serverClient() {
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
}

/** The signed-in user, or null. */
export async function currentUser() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  const supabase = await serverClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** The signed-in user, but only if they are on the admin roster. */
export async function currentAdmin() {
  const user = await currentUser();
  if (!user) return null;

  const supabase = await serverClient();
  const { data } = await supabase
    .from("admin_users")
    .select("user_id, email, full_name")
    .eq("user_id", user.id)
    .maybeSingle();

  return data ? { user, admin: data } : null;
}
