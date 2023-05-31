import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const cookieToken = request.cookies.has("@contacts-book:token");

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (cookieToken)
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!cookieToken)
      return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/dashboard"],
};
