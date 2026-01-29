import { NextRequest, NextResponse } from "next/server";
import { UserRoles } from "./constants/userRoles";
import { userService } from "./service/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  // Not authenticated → redirect to login
  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = data?.user?.role;

  // Admin cannot visit customer or seller dashboards
  if (
    userRole === UserRoles.ADMIN &&
    (pathname.startsWith("/dashboard/customer") ||
      pathname.startsWith("/dashboard/seller"))
  ) {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  // Customer cannot visit admin or seller dashboards
  if (
    userRole === UserRoles.CUSTOMER &&
    (pathname.startsWith("/dashboard/admin") ||
      pathname.startsWith("/dashboard/seller"))
  ) {
    return NextResponse.redirect(new URL("/dashboard/customer", request.url));
  }

  // Seller cannot visit admin or customer dashboards
  if (
    userRole === UserRoles.SELLER &&
    (pathname.startsWith("/dashboard/admin") ||
      pathname.startsWith("/dashboard/customer"))
  ) {
    return NextResponse.redirect(new URL("/dashboard/seller", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
