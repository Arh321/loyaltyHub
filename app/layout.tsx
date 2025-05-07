import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/header";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppProvider from "@/redux/provider/app-provider";
import { Suspense } from "react";
import AppLoading from "./loading";
import { LoadingIndicator } from "@/components/loadingIndicator/loading-indicator";
import { NotifyProvider } from "@/components/notife/notife";
import { LazyFooterComponent } from "@/components/footer/footer-components-index";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  metadataBase: new URL("https://hosseinibrothers.loyaltyhub.ir/"),
  title: "باشگاه مشتریان",
  description: "توسعه یافته توسط تیم LoyalityHub.ir",
  openGraph: {
    type: "website",
    url: "https://hosseinibrothers.loyaltyhub.ir/",
    title: "باشگاه مشتریان",
    description: "توسعه یافته توسط تیم LoyalityHub.ir",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 1200,
        height: 630,
        alt: "لوگوی باشگاه مشتریان",
      },
    ],
    siteName: "باشگاه مشتریان",
    locale: "fa_IR",
  },
  twitter: {
    card: "summary_large_image",
    title: "باشگاه مشتریان",
    description: "توسعه یافته توسط تیم LoyalityHub.ir",
    images: ["/icons/icon-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1E9C51" />
        <link
          rel="icon"
          href="icons/icon-72x72.png"
          type="image/x-icon"
          sizes="16x16"
        ></link>

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/icons/icon-512x512.png"
        />
        <meta
          property="og:logo"
          content="https://hosseinibrothers.loyaltyhub.ir/icons/icon-144x144.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <AntdRegistry>
            <NotifyProvider>
              <div className="max-w-[470px] mx-auto h-dvh flex flex-col bg-cta overflow-hidden">
                <LoadingIndicator
                  component={
                    <Suspense fallback={<AppLoading />}>
                      <Header />
                      {children}
                      <LazyFooterComponent />
                    </Suspense>
                  }
                ></LoadingIndicator>
              </div>
            </NotifyProvider>
          </AntdRegistry>
        </AppProvider>
      </body>
    </html>
  );
}
