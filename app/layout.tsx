import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/header";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppProvider from "@/redux/provider/app-provider";
import FooterContainer from "@/components/footer/footer-container";
import logo from "@/publicimages/hosseiniLogo.png";
import { Suspense } from "react";
import AppLoading from "./loading";
import { LoadingIndicator } from "@/components/loadingIndicator/loading-indicator";

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
  title: "باشگاه مشتریان",
  description: "توسعه یافته توسط تیم LoyalityHub.ir",
  icons: {
    icon: [
      { url: "/icons/icon-72x72.png" }, // Default
    ],
  },
  openGraph: {
    title: "باشگاه مشتریان",
    description: "توسعه یافته توسط تیم LoyalityHub.ir",
    images: [
      {
        url: "/icons/icon-512x512.png", // Path to your OG image
        width: 512, // Optional: width of the image
        height: 512, // Optional: height of the image
        alt: "لوگوی باشگاه مشتریان", // Optional: alt text for the image
      },
    ],
    siteName: "باشگاه مشتریان آجیل حسینی", // Optional: the name of your website
    type: "website", // Optional: type of the content
    locale: "fa_IR", // Optional: specify locale for better SEO
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
        <meta name="theme-color" content="#fff" />
        <link
          rel="icon"
          href="icons/icon-72x72.png"
          type="image/x-icon"
          sizes="16x16"
        ></link>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <AntdRegistry>
            <div className="max-w-[470px] mx-auto h-dvh flex flex-col bg-cta overflow-hidden">
              <LoadingIndicator
                component={
                  <Suspense fallback={<AppLoading />}>
                    <Header />
                    {children}
                    <FooterContainer />
                  </Suspense>
                }
              ></LoadingIndicator>
            </div>
          </AntdRegistry>
        </AppProvider>
      </body>
    </html>
  );
}
