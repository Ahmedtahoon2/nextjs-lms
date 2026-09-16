import { type NextRequest, NextResponse } from "next/server";

/**
 * Proxy Middleware - Early Request Boundary
 *
 * This middleware provides early route protection by checking for Better Auth session cookies.
 * It performs lightweight cookie-based detection to redirect unauthenticated users before
 * they reach protected routes.
 *
 * SECURITY MODEL:
 *
 * 1. Cookie presence = early route protection only
 *    - Redirects to sign-in if no session cookie exists
 *    - Does NOT verify session validity or expiration
 *    - Does NOT perform authorization checks
 *
 * 2. Server-side session verification = source of truth
 *    - All Server Actions, Route Handlers, and Services MUST verify sessions server-side
 *    - Use authService.getCurrentSession() to authenticate
 *    - Never trust cookie existence as proof of authentication
 *
 * 3. Authorization = always server-side
 *    - Permission checks happen in services/authorization.ts
 *    - Role checks happen in services/authorization.ts
 *    - Never trust client-provided user IDs, roles, or permissions
 *
 * This layered approach provides:
 * - Fast UX (early redirect without server roundtrip)
 * - Strong security (server-side verification for all operations)
 */

const publicRoutes = ["/", "/sign-in", "/sign-up"];
const authRoutes = ["/sign-in", "/sign-up"];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function hasSessionCookie(request: NextRequest): boolean {
  const cookies = request.cookies;
  return cookies
    .getAll()
    .some(
      (cookie) =>
        cookie.name.startsWith("better-auth.") ||
        cookie.name.startsWith("__Secure-better-auth."),
    );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow auth API routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Allow Next.js internal routes and monitoring endpoints
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/monitoring")
  ) {
    return NextResponse.next();
  }

  const hasSession = hasSessionCookie(request);

  // Redirect unauthenticated users to sign-in
  if (!hasSession && !isPublicRoute(pathname)) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackURL", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users away from auth pages
  if (hasSession && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
