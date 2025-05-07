"use client";
import Image from "next/image";
import { HoseinyIcon } from "@/components/sharedIcons/sharedIcons";
import logo from "@/public/LOGO.png";
import clsx from "clsx";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import style from "./redirect-to-shop.module.css";
interface openRedirectModalProps {
  openRedirectModal: boolean;
  setOpenRedirectModal: Dispatch<SetStateAction<boolean>>;
}

const RedirectLoadingModal: React.FC<openRedirectModalProps> = ({
  openRedirectModal,
  setOpenRedirectModal,
}) => {
  // Reset modal when leaving the tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setOpenRedirectModal(false); // Close the modal when the tab is not visible
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return (
    openRedirectModal && (
      <div
        className="bg-[rgba(0,0,0,0.9)] fixed top-0 h-dvh right-0 left-0 max-w-[470px] animate-fadeIn z-[5000] mx-auto flex flex-col justify-center items-center gap-12"
        role="dialog"
        aria-labelledby="redirect-modal-title"
        aria-describedby="redirect-modal-description"
        aria-live="polite"
      >
        <div
          className="w-full h-max flex flex-col gap-4 items-center animate-flicker"
          role="presentation"
        >
          <Image src={logo} alt="لوگوی برادران حسینی" priority className="" />
          <HoseinyIcon
            width="184"
            height="64"
            color="white"
            aria-label="آیکون برادران حسینی"
          />
        </div>
        <p
          id="redirect-modal-title"
          className="text-xl font-Medium text-Highlighter"
        >
          در حال انتقال به سایت فروشگاه
        </p>
        <div
          id="redirect-modal-description"
          className="relative animate-fadeIn"
        >
          <span
            className={clsx(style["loader-otp"], "!text-cta")}
            aria-hidden="true"
          ></span>
        </div>
      </div>
    )
  );
};

export default RedirectLoadingModal;
