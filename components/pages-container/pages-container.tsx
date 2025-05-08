import AppLoading from "@/app/loading";
import { memo, Suspense } from "react";
import ErrorBoundaryWrapper from "../error-component/ErrorBoundary";
import NotFoundComponent from "../not-found-page/not-found-component";

const PagesContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense fallback={<AppLoading />}>
      <div
        style={{
          userSelect: "none",
        }}
        className="w-full grow no-scrollbar overflow-y-auto bg-BG rounded-t-[20px]"
      >
        <div className=" w-full h-max relative flex flex-col">
          <ErrorBoundaryWrapper
            fallback={
              <NotFoundComponent title="در هنگام برقراری ارتباط خطایی رخ داده است" />
            }
          >
            {children}
          </ErrorBoundaryWrapper>
        </div>
      </div>
    </Suspense>
  );
};

export default memo(PagesContainer);
