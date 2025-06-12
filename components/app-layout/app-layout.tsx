import NotFoundComponent from "../not-found-page/not-found-component";
import Header from "../header/header";
import MemoizedFooterContainer from "../footer/footer-container";
import CompanyClientWrapper from "./CompanyClientWrapper";
import { Suspense } from "react";
import AppLoading from "@/app/loading";
import { fetchCompanyInfo } from "./matadata-components/company-api";

const AppLayOut = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const companyInfo = await fetchCompanyInfo();

  if (!companyInfo) return <NotFoundComponent title="خطا در دریافت اطلاعات" />;

  if (!companyInfo) return <NotFoundComponent title="خطا در دریافت اطلاعات" />;
  return (
    <div
      dir="rtl"
      className="max-w-[470px] mx-auto h-dvh flex flex-col bg-cta overflow-hidden"
    >
      <Suspense
        fallback={
          <div className="!flex !w-full !h-[20px] animate-skeleton"></div>
        }
      >
        <Header />
      </Suspense>
      {companyInfo ? (
        <CompanyClientWrapper companyInfo={companyInfo}>
          {children}
        </CompanyClientWrapper>
      ) : (
        <NotFoundComponent title="خطا در دریافت اطلاعات مجموعه" />
      )}
      <MemoizedFooterContainer />
    </div>
  );
};

export default AppLayOut;
