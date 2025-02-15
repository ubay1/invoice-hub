/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // const authToken = request.cookies.get("AuthToken");
  // const isLoginPage = request.nextUrl.pathname === "/login";

  // // If has token and on login page, redirect to home
  // if (authToken && isLoginPage) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // // If no token and not on login page, redirect to login
  // if (!authToken && !isLoginPage) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // Otherwise continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
