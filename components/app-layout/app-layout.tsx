"use client";

import AppLoading from "@/app/loading";
import NotFoundComponent from "../not-found-page/not-found-component";
import useInitCompany from "@/hooks/useInitCompany";
import Header from "../header/header";
import { Suspense } from "react";
import MemoizedFooterContainer from "../footer/footer-container";

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
          <MemoizedFooterContainer />
        </Suspense>
      )}
    </div>
  );
};

export default AppLayOut;
