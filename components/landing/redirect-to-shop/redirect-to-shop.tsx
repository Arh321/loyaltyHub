"use client";
import Image from "next/image";

import logo from "@/publicLOGO.png";
import style from "./redirect-to-shop.module.css";
import { useState } from "react";

import { useRouter } from "next/navigation";
import RedirectLoadingModal from "./redirect-loading";
const RedirectToShopButton = () => {
  const navigate = useRouter();
  const [openRedirectModal, setOpenRedirectModal] = useState<boolean>(false);
  const onRedirectToShop = () => {
    setOpenRedirectModal(true);
    navigate.push("https://hosseinibrothers.ir/");
  };
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
          className="w-full flex bg-transparent items-center justify-end pr-12 gap-2 relative"
        >
          <div className={style["arrow"]}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="font-Medium text-Highlighter p-3 text-xl">
            رفتن به فروشگاه
          </span>
          <Image
            src={logo}
            alt="برادران حسینی"
            className=""
            width={60}
            height={60}
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
