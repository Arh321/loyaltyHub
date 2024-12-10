import AppLoading from "@/app/loading";
import { Suspense } from "react";
import ErrorBoundaryWrapper from "../error-component/ErrorBoundary";
import NotFoundComponent from "../not-found-page/not-found-component";
import logo from "@/publicLOGO.png";
const PagesContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense fallback={<AppLoading />}>
      <div className="w-full grow  no-scrollbar overflow-y-auto bg-BG rounded-t-[20px]  -mt-[12px]">
        <div className=" w-full min-h-[calc(100vh-80px)] relative  flex flex-col  ">
          <ErrorBoundaryWrapper
            fallback={
              <NotFoundComponent
                image={logo}
                title="در هنگام برقراری ارتباط خطایی رخ داده است"
              />
            }
          >
            {children}
          </ErrorBoundaryWrapper>
        </div>
      </div>
    </Suspense>
  );
};

export default PagesContainer;
