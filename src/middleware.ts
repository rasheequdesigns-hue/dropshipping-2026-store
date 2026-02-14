import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminToken } from "@/lib/auth/token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("dropforge_admin")?.value;
    const adminToken = getAdminToken();
    if (!token || token !== adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
