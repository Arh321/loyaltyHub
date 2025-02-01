import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // If no token, redirect to the login page
  if (!token) {
    return handleUnauthorizedAccess(request);
  }

  // Redirect to login if accessing '/' with 'invoiceId' query parameter
  if (url.pathname === "/" && url.searchParams.has("invoiceId")) {
    return redirectToLoginWithInvoiceId(request);
  }

  // Cache API responses for GET requests
  if (url.pathname.startsWith("/api/") && request.method === "GET") {
    const cacheKey = `cache:${url.pathname}${url.search}`;
    const cache = await caches.open("next-api-cache");

    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = NextResponse.next();
    cache.put(cacheKey, response.clone());

    return response;
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
    // Protect all routes except login, public assets, and icons
    "/((?!login|_next/static|_next/image|favicon.ico|icons/).*)",
  ],
};
