import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_COOKIE_NAME,
  CUSTOMER_PROTECTED_ROUTES,
  ADMIN_PROTECTED_ROUTES,
} from "@/lib/auth/constants";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const sessionToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(sessionToken);

  // 1. Check if user is attempting to access a Customer Protected Route
  const isCustomerRoute = CUSTOMER_PROTECTED_ROUTES.some((route) => {
    if (route.includes("[id]")) {
      const baseRoute = route.split("/[id]")[0];
      return pathname.startsWith(baseRoute);
    }
    return pathname.startsWith(route);
  });

  if (isCustomerRoute && !isAuthenticated) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Check if user is attempting to access an Admin Protected Route
  const isAdminRoute = ADMIN_PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isAdminRoute && !isAuthenticated) {
    const adminLoginUrl = new URL("/admin/login", request.url);
    adminLoginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(adminLoginUrl);
  }

  // 3. Redirect authenticated users away from Auth page to intended route or default portal
  if (pathname === "/auth" && isAuthenticated) {
    const rawRedirect = searchParams.get("redirectTo");
    const targetUrl = rawRedirect ? rawRedirect.replace(/\.+$/, "").trim() : "/profile";
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};