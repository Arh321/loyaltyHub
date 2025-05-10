import { memo } from "react";
import ErrorBoundaryWrapper from "../error-component/ErrorBoundary";
import NotFoundComponent from "../not-found-page/not-found-component";

const PagesContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      style={{
        userSelect: "none",
      }}
      className="w-full grow no-scrollbar overflow-y-auto bg-BG rounded-t-[20px] animate-up"
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
  );
};

export default memo(PagesContainer);
