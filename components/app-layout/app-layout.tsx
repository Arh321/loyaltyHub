import NotFoundComponent from "../not-found-page/not-found-component";
import Header from "../header/header";
import MemoizedFooterContainer from "../footer/footer-container";
import CompanyClientWrapper from "./CompanyClientWrapper";
import { getCompanyInfo } from "@/utils/companyInfoService";
import { Suspense } from "react";
import AppLoading from "@/app/loading";

const AppLayOut = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  let companyInfo = null;

  try {
    const result = await getCompanyInfo();
    companyInfo = result[0];
  } catch (error) {
    // fail silently, pass null
    console.error("Error fetching companyInfo:", error);
  }

  if (!companyInfo) return <NotFoundComponent title="خطا در دریافت اطلاعات" />;
  return (
    <div
      dir="rtl"
      className="max-w-[470px] mx-auto h-dvh flex flex-col bg-cta overflow-hidden"
    >
      <Suspense fallback={<AppLoading />}>
        <Header />
        {companyInfo ? (
          <CompanyClientWrapper companyInfo={companyInfo}>
            {children}
          </CompanyClientWrapper>
        ) : (
          <NotFoundComponent title="خطا در دریافت اطلاعات مجموعه" />
        )}
        <MemoizedFooterContainer />
      </Suspense>
    </div>
  );
};

export default AppLayOut;
