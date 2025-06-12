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
  let loading = false;
  let companyInfo = null;

  try {
    loading = true;
    const result = await getCompanyInfo();
    companyInfo = result?.result;
    loading = false;
  } catch (error) {
    loading = false;
    // fail silently, pass null
    throw new Error("Error fetching companyInfo:", error);
  }
  if (loading) return <AppLoading />;
  if (!companyInfo) return <NotFoundComponent title="خطا در دریافت اطلاعات" />;
  return (
    <div
      dir="rtl"
      className="max-w-[470px] mx-auto h-dvh flex flex-col bg-cta overflow-hidden"
    >
      <Header />
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
