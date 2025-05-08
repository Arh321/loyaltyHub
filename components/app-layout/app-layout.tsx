"use client";
import { LoadingIndicator } from "../loadingIndicator/loading-indicator";
import AppLoading from "@/app/loading";
import { LazyFooterComponent } from "../footer/footer-components-index";
import NotFoundComponent from "../not-found-page/not-found-component";
import useInitCompany from "@/hooks/useInitCompany";
import LazyHeader from "../header/header-lazy-component";

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
      <LoadingIndicator
        component={
          loadingCompanyInfo ? (
            <AppLoading />
          ) : (
            <>
              <LazyHeader />
              {children}
              <LazyFooterComponent />
            </>
          )
        }
      ></LoadingIndicator>
    </div>
  );
};

export default AppLayOut;
