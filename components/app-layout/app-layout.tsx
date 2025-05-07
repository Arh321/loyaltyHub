"use client";
import { Suspense } from "react";
import { LoadingIndicator } from "../loadingIndicator/loading-indicator";
import AppLoading from "@/app/loading";
import Header from "../header/header";
import { LazyFooterComponent } from "../footer/footer-components-index";
import useAppInitializer from "@/hooks/useAppInitializer";
import NotFoundComponent from "../not-found-page/not-found-component";

const AppLayOut = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { error, loading } = useAppInitializer();
  if (loading) return <AppLoading />;
  if (error) return <NotFoundComponent title="خطا در دریافت اطلاعات" />;
  return (
    <div
      dir="rtl"
      className="max-w-[470px] mx-auto h-dvh flex flex-col bg-cta overflow-hidden"
    >
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
  );
};

export default AppLayOut;
