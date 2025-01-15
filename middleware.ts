import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;

  // Check if the pathname is '/' and contains the 'invoiceId' query parameter
  if (url.pathname === "/" && url.searchParams.has("invoiceId")) {
    // Get the invoiceId from the query parameter
    const invoiceId = url.searchParams.get("invoiceId");

    // Create a new URL for the login page
    const loginUrl = new URL("/login", request.url);

    // Optionally, pass the invoiceId as a query parameter to the login page
    loginUrl.searchParams.set("backUrl", invoiceId);

    return NextResponse.redirect(loginUrl);
  }

  console.log("Route change started:", url.pathname);
  return NextResponse.next();
}
