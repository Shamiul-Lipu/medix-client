import { NextRequest, NextResponse } from "next/server";
import { UserRoles } from "./constants/userRoles";
import { userService } from "./service/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: string | null = null;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    userRole = data.user.role;
  }

  // Not authenticated → redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based redirects
  // prevent ADMIN from visiting customer dashboard
  if (userRole === UserRoles.ADMIN && pathname.startsWith("/customer")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (
    userRole === UserRoles.CUSTOMER &&
    pathname.startsWith("/admin-dashboard")
  ) {
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }

  if (
    userRole === UserRoles.SELLER &&
    pathname.startsWith("/admin-dashboard")
  ) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/customer-dashboard/:path*",
    "/seller-dashboard/:path*",
  ],
};
