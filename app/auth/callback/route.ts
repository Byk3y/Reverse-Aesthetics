import { NextResponse, type NextRequest } from "next/server";
import { serverClient } from "../../lib/supabase/server";
import { isSupabaseConfigured } from "../../lib/supabase/config";

/**
 * OAuth landing point. Google sends the browser back here with a one-time
 * `code`, which we trade for a session cookie before handing the user on.
 *
 * `@supabase/ssr` uses the PKCE flow, so this exchange has to happen
 * server-side — there is no implicit-grant shortcut that skips it.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  // Only ever redirect within this site: an attacker-supplied absolute URL
  // here would turn the login into an open redirect.
  const requested = searchParams.get("next") ?? "/admin";
  const next = requested.startsWith("/") && !requested.startsWith("//")
    ? requested
    : "/admin";

  const fail = (reason: string) =>
    NextResponse.redirect(
      `${origin}/admin/login?error=${encodeURIComponent(reason)}`
    );

  // Google reports a refusal (closed window, denied consent) as `error`.
  const denied = searchParams.get("error_description") ?? searchParams.get("error");
  if (denied) return fail(denied);

  if (!isSupabaseConfigured()) return fail("Supabase isn't configured.");
  if (!code) return fail("That sign-in link was missing its code. Try again.");

  const supabase = await serverClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return fail(error.message);

  // Behind a proxy (Vercel) `origin` is the internal host, so prefer the
  // forwarded one to avoid bouncing the user to an internal URL.
  const forwardedHost = request.headers.get("x-forwarded-host");
  const base =
    process.env.NODE_ENV === "development" || !forwardedHost
      ? origin
      : `https://${forwardedHost}`;

  return NextResponse.redirect(`${base}${next}`);
}
