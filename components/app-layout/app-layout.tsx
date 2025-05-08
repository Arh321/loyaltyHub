"use client";
import { Suspense } from "react";
import { LoadingIndicator } from "../loadingIndicator/loading-indicator";
import AppLoading from "@/app/loading";
import Header from "../header/header";
import { LazyFooterComponent } from "../footer/footer-components-index";
import NotFoundComponent from "../not-found-page/not-found-component";
import useInitCompany from "@/hooks/useInitCompany";

const AppLayOut = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { errorCompanyInfo, loadingCompanyInfo } = useInitCompany();
  if (loadingCompanyInfo) return <AppLoading />;
  if (errorCompanyInfo)
    return <NotFoundComponent title="خطا در دریافت اطلاعات" />;
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
