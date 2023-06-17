import { NextResponse, NextRequest } from "next/server";
import { verifyJwtToken } from "./libs/auth";

const AUTH_PAGES = ["/login", "/register"];

const isAuthPages = (url: string) => {
  return AUTH_PAGES.some((e) => e.startsWith(url));
};

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;

  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));

  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", url));
  }

  if (!hasVerifiedToken) {
    return NextResponse.redirect(new URL("/login", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register","/my-profile"],
};
