import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // If no token, redirect to the login page
  if (!token) {
    return handleUnauthorizedAccess(request);
  }

  // Redirect to login if accessing '/' with 'invoiceId' query parameter
  if (url.pathname === "/" && url.searchParams.has("invoiceId")) {
    // redirectToLoginWithInvoiceId(request);
    return;
  }

  console.log("Route change started:", url.pathname);
  return NextResponse.next();
}

function handleUnauthorizedAccess(request) {
  const url = request.nextUrl;
  const redirectUrl = new URL("/login", request.url);

  // Preserve the invoiceId parameter as backUrl for login
  if (url.searchParams.has("invoiceId")) {
    const invoiceId = url.searchParams.get("invoiceId");
    redirectUrl.searchParams.set("backUrl", invoiceId);
  }

  return NextResponse.redirect(redirectUrl);
}

function redirectToLoginWithInvoiceId(request) {
  const url = request.nextUrl;
  const invoiceId = url.searchParams.get("invoiceId");
  const loginUrl = new URL("/login", request.url);

  // Pass the invoiceId as backUrl to the login page
  loginUrl.searchParams.set("backUrl", invoiceId);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    // Protect all routes except login and public assets
    "/((?!login|_next/static|_next/image|favicon.ico).*)",
  ],
};
