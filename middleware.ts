import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Route change started:", request.nextUrl.pathname);
  return NextResponse.next();
}
