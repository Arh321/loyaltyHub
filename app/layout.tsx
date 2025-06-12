import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppProvider from "@/redux/provider/app-provider";

import { NotifyProvider } from "@/components/notife/notife";
import AppLayOut from "@/components/app-layout/app-layout";
import { generateSiteMetadata } from "@/components/app-layout/matadata-components/generate";

export async function generateMetadata() {
  return generateSiteMetadata();
}
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
      <body className={`antialiased`}>
        <AppProvider>
          <AntdRegistry>
            <NotifyProvider>
              <AppLayOut>{children}</AppLayOut>
            </NotifyProvider>
          </AntdRegistry>
        </AppProvider>
      </body>
    </html>
  );
}
