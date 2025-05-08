"use client";

import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import Image from "next/image";
import logo from "../../public/images/hosseiniLogo.webp";
import { usePathname } from "next/navigation";
import React, { memo, useMemo, useState } from "react";
import useAppInitializer from "@/hooks/useAppInitializer";
import MemoizedCtaButton from "../shared-components/cta-button";
import HeaderModalsContainer from "./header-modals-container";
import { Skeleton } from "antd";
import MemoizedCompanyLogoComponent from "../shared-components/company-logo-component";
import Link from "next/link";

// Dynamically import components with loading fallbacks
const LazyHeaderLanding = dynamic(() => import("./header-landing-container"), {
  loading: () => (
    <div className="w-full flex items-center justify-between [&_.ant-skeleton-element]:!rounded-[4px]">
      <Skeleton.Avatar active size={"small"} shape={"square"} />
      <Skeleton.Image active className="!size-[50px] [&_svg]:!scale-75" />
      <Skeleton.Avatar active size={"small"} shape={"square"} />
    </div>
  ),
  ssr: false,
});

// Extracted components for better code splitting
const SurveyButton = ({ onClick }: { onClick: () => void }) => (
  <MemoizedCtaButton
    onClick={onClick}
    className="w-full flex !justify-end px-4 py-4 text-Highlighter"
  >
    <Icon icon="stash:times" width="2.5rem" />
  </MemoizedCtaButton>
);

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const pathname = usePathname();
  useAppInitializer();

  const isSurveyPage = useMemo(() => pathname.includes("survey"), [pathname]);
  const isLoginPage = useMemo(() => pathname.includes("login"), [pathname]);
  const isInMainRoute = useMemo(() => pathname === "/", [pathname]);

  return (
    <header
      className="w-full bg-center bg-contain bg-repeat "
      style={{ backgroundImage: "url(/images/bg-art.webp)" }}
    >
      <div className="bg-gradient-to-l from-cta via-transparent to-cta px-4 py-3">
        {isSurveyPage ? (
          <SurveyButton onClick={() => setIsModalOpen(true)} />
        ) : !isLoginPage ? (
          <LazyHeaderLanding isInMainRoute={isInMainRoute} />
        ) : (
          <div className="w-full flex items-center justify-center relative">
            <Link href="/" className="w-max h-max">
              <MemoizedCompanyLogoComponent
                height={48}
                width={48}
                imageClass="!size-[48px] [&_img]:!object-contain pt-4"
                containerClass="w-max h-max"
              />
            </Link>
          </div>
        )}
      </div>
      <HeaderModalsContainer
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        pathname={pathname}
      />
    </header>
  );
};

export default memo(Header);
