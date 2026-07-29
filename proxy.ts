import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Keeps the Supabase session cookie fresh and gates /admin.
 *
 * (Next 16 renamed the `middleware` file convention to `proxy`.)
 *
 * Membership of the admin roster is checked in the admin layout (and enforced
 * for real by RLS); this only answers "is anyone signed in?", which is all a
 * redirect needs and keeps the proxy free of database round-trips.
 */
/**
 * URL prefixes from the old WordPress theme's demo content.
 *
 * These sections never described this clinic: sixteen fabricated doctors with
 * invented Harvard/Mayo credentials, twenty surgical and hair-salon "services"
 * the clinic does not perform, a portfolio of plastic surgery cases, and a
 * WooCommerce skincare shop. Roughly 130 URLs in total.
 *
 * They return 410 Gone rather than 404. Both eventually drop out of the index,
 * but 410 states the removal is permanent and Google acts on it faster — which
 * matters here, because until these clear, the clinic is publicly advertising
 * procedures it doesn't offer and staff who don't exist.
 *
 * Deliberately NOT redirected anywhere: a 301 would tell Google these pages
 * *became* the new clinic pages, dragging plastic-surgery and salon topicality
 * onto them.
 */
const GONE_PREFIXES = [
  "/service/",
  "/portfolio/",
  "/portfolio-category/",
  "/product/",
  "/product-category/",
  "/team/",
  "/tag/",
  "/category/", // the new blog uses /blog/category/, so no collision
];

/** WooCommerce pages, including the theme's duplicated "-2" variants. */
const GONE_EXACT = new Set([
  "/shop",
  "/shop-2",
  "/cart",
  "/cart-2",
  "/checkout",
  "/checkout-2",
  "/my-account",
  "/my-account-2",
  "/wishlist",
  "/wishlist-2",
]);

/**
 * The one old /team/ URL that was real. next.config.ts redirects it to /about,
 * but this proxy runs before redirects resolve, so it has to be let through.
 */
const RESCUED = new Set(["/team/ral-abana"]);

function isGone(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  if (RESCUED.has(path)) return false;
  if (GONE_EXACT.has(path)) return true;
  return GONE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function proxy(request: NextRequest) {
  if (isGone(request.nextUrl.pathname)) {
    return new NextResponse(null, { status: 410 });
  }

  // Everything below guards /admin only. The matcher now also covers the
  // legacy WordPress paths above, so anything that isn't an admin route has to
  // leave here — otherwise a signed-out visitor to an old URL would be bounced
  // to the admin login screen.
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Without credentials there is no session to refresh and nothing to guard —
  // the admin pages render their own "not configured" notice.
  if (!url || !key) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (!user && !isLogin) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = "/admin/login";
    redirect.searchParams.set("next", pathname);
    return NextResponse.redirect(redirect);
  }

  if (user && isLogin) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = "/admin";
    redirect.search = "";
    return NextResponse.redirect(redirect);
  }

  return response;
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    // Legacy WordPress demo-content sections — see GONE_PREFIXES.
    "/service/:path*",
    "/portfolio/:path*",
    "/portfolio-category/:path*",
    "/product/:path*",
    "/product-category/:path*",
    "/team/:path*",
    "/tag/:path*",
    "/category/:path*",
    // WooCommerce pages — see GONE_EXACT.
    "/shop",
    "/shop-2",
    "/cart",
    "/cart-2",
    "/checkout",
    "/checkout-2",
    "/my-account",
    "/my-account-2",
    "/wishlist",
    "/wishlist-2",
  ],
};
