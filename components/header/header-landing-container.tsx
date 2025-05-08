import React, { memo, Suspense } from "react";
import SideBar from "./side-bar";
import { Skeleton } from "antd";
import Link from "next/link";
import MemoizedNavigationButtons from "./header-navigations";
import { deleteCookie } from "@/utils/common-methods/cookiesMethodes";
import { useRouter } from "next/navigation";
import MemoizedCompanyLogoComponent from "../shared-components/company-logo-component";

interface HeaderLandingContainerProps {
  isInMainRoute: boolean;
}

const HeaderLandingContainer: React.FC<HeaderLandingContainerProps> = ({
  isInMainRoute,
}) => {
  const router = useRouter();

  const onLogOut = () => {
    deleteCookie("token");
    router.push("/login");
  };

  return (
    <div className="w-full flex items-center justify-between relative">
      <Suspense
        fallback={
          <div>
            <Skeleton.Avatar shape="square" active size={"small"} />
          </div>
        }
      >
        <SideBar />
      </Suspense>
      <Link href="/" className="absolute inset-0 m-auto w-max h-max">
        <MemoizedCompanyLogoComponent
          height={48}
          width={48}
          imageClass="!w-[60px] !h-[48px] [&_img]:!object-contain"
          containerClass="w-max h-max"
        />
      </Link>

      <MemoizedNavigationButtons
        isInMainRoute={isInMainRoute}
        onBack={() => router.back()}
        onLogOut={onLogOut}
      />
    </div>
  );
};

const MemoizedHeaderLandingContainer = memo(HeaderLandingContainer);

export default MemoizedHeaderLandingContainer;
