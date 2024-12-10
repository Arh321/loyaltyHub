import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/header";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppProvider from "@/redux/provider/app-provider";
import FooterContainer from "@/components/footer/footer-container";
import LoadingIndicator from "@/components/loadingIndicator/loading-indicator";
import { Suspense } from "react";
import AppLoading from "./loading";

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
  title: "Create Next App",
  description: "توسعه یافته توسط تیم LoyalityHub.ir",
  icons: {
    icon: [
      { url: "/images/loyaltyhub.png" }, // Default
    ],
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
        <title>باشگاه مشتریان</title>
        <link
          rel="icon"
          href="/images/loyaltyhub.png"
          type="image/x-icon"
          sizes="16x16"
        ></link>
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
