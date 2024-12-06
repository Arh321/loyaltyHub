import AppLoading from "@/app/loading";
import { Suspense } from "react";

const PagesContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense fallback={<AppLoading />}>
      <div className="w-full grow  no-scrollbar overflow-y-auto bg-BG rounded-t-[20px]  -mt-[12px]">
        <div className=" w-full min-h-[calc(100vh-80px)] relative  flex flex-col  pb-[100px]">
          {children}
        </div>
      </div>
    </Suspense>
  );
};

export default PagesContainer;
