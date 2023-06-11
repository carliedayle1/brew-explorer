import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is /login redirect the user to /beers
  if (user && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/beers", req.url));
  }

  // if user is not signed in and the current path is /orders redirect the user to /login
  if (!user && req.nextUrl.pathname === "/orders") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // if user is not signed in and the current path is /cart redirect the user to /login
  if (!user && req.nextUrl.pathname === "/cart") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/beers", "/orders", "/cart", "/login"],
};
