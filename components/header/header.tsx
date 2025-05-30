"use client";

import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import React, { memo, useMemo, useState } from "react";
import useAppInitializer from "@/hooks/useAppInitializer";
import MemoizedCtaButton from "../shared-components/cta-button";
import HeaderModalsContainer from "./header-modals-container";
import { Skeleton } from "antd";
import MemoizedCompanyLogoComponent from "../shared-components/company-logo-component";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SmartBackground from "../shared-components/smart-background";
import clsx from "clsx";

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
    className="w-max !h-max flex !justify-end p-1!bg-transparent  text-Highlighter"
  >
    <Icon icon="stash:times" width="2.5rem" />
  </MemoizedCtaButton>
);

const Header = () => {
  const { info } = useSelector((state: RootState) => state.companySlice);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const pathname = usePathname();
  useAppInitializer();

  const isSurveyPage = useMemo(() => pathname.includes("survey"), [pathname]);
  const isLoginPage = useMemo(() => pathname.includes("login"), [pathname]);
  const isInMainRoute = useMemo(() => pathname === "/", [pathname]);

  return (
    <SmartBackground
      className="w-full"
      style={{
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
      externalUrl={info ? info["Background-design"] : ""}
      fallbackUrl={"/images/bg-art.webp"}
    >
      <div
        className={clsx(
          "w-full bg-gradient-to-l from-cta via-transparent to-cta px-4 py-3",
          isSurveyPage && "flex justify-end items-center !py-2"
        )}
      >
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
    </SmartBackground>
  );
};

export default memo(Header);
