"use client";
import Image from "next/image";
import { HoseinyIcon } from "@/components/sharedIcons/sharedIcons";

import logo from "@/publicLOGO.png";
import style from "./redirect-to-shop.module.css";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import RedirectLoadingModal from "./redirect-loading";
const RedirectToShopButton = () => {
  const navigate = useRouter();
  const [openRedirectModal, setOpenRedirectModal] = useState<boolean>(false);

  const onRedirectToShop = () => {
    setOpenRedirectModal(true);
    setTimeout(() => {
      window.location.href = "https://hosseinibrothers.ir/";
    }, 1000); // Delay to show the modal before redirecting
  };

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
    <>
      <button
        onClick={() => onRedirectToShop()}
        style={{
          backgroundImage: `url(/images/bg-art.webp)`,
          backgroundSize: "contain", // Ensures the image covers the element
          backgroundRepeat: "repeat", // Prevents the image from repeating
          backgroundPosition: "center", // Centers the image
        }}
        className="animate-fadeIn w-full h-max  rounded-[10px] overflow-hidden shadow-lg border border-gray-100"
      >
        <div
          style={{
            background:
              "linear-gradient(to left, #198D41, transparent,transparent,#198D41)",
          }}
          className="w-full flex bg-transparent items-center justify-end pr-4 lsm:pr-12 gap-2 relative"
        >
          <div className={style["arrow"]}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <HoseinyIcon
            width="70"
            height="54"
            color="white"
            aria-label="آیکون برادران حسینی"
          />
          <Image
            src={logo}
            alt="برادران حسینی"
            className="lsm:!w-[60px]"
            width={40}
            height={40}
          />
        </div>
      </button>
      <RedirectLoadingModal
        openRedirectModal={openRedirectModal}
        style={style}
      />
    </>
  );
};

export default RedirectToShopButton;
