import Header from "../header/header";
import MemoizedFooterContainer from "../footer/footer-container";
import { Suspense } from "react";
import SplashScreenWrapper from "./splash-screen-loader/SplashScreenWrapper";

const AppLayOut = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SplashScreenWrapper>
      <Suspense
        fallback={
          <div className="!flex !w-full !h-[56px] animate-skeleton"></div>
        }
      >
        <div
          dir="rtl"
          className="max-w-[470px] mx-auto h-dvh flex flex-col bg-cta overflow-hidden"
        >
          <Header />
          {children}
          <MemoizedFooterContainer />
        </div>
      </Suspense>
    </SplashScreenWrapper>
  );
};

export default AppLayOut;
