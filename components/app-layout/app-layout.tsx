"use client";
import { LoadingIndicator } from "../loadingIndicator/loading-indicator";
import AppLoading from "@/app/loading";
import { LazyFooterComponent } from "../footer/footer-components-index";
import NotFoundComponent from "../not-found-page/not-found-component";
import useInitCompany from "@/hooks/useInitCompany";
import Header from "../header/header";
import { Suspense } from "react";

const AppLayOut = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { errorCompanyInfo, loadingCompanyInfo } = useInitCompany();

  if (errorCompanyInfo)
    return <NotFoundComponent title="خطا در دریافت اطلاعات" />;
  return (
    <div
      dir="rtl"
      className="max-w-[470px] mx-auto h-dvh flex flex-col bg-cta overflow-hidden"
    >
      {loadingCompanyInfo ? (
        <AppLoading />
      ) : (
        <Suspense fallback={<AppLoading />}>
          <Header />
          {children}
          <LazyFooterComponent />
        </Suspense>
      )}
    </div>
  );
};

export default AppLayOut;
