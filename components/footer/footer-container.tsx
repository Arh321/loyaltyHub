"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  FactorIcon,
  HomeIcon,
  HoseinyIcon,
  LevelsIcon,
  ProfileIcon,
} from "../sharedIcons/sharedIcons";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import Image from "next/image";
import logo from "@/public/LOGO.png";
import footerBg from "@/publicimages/bg-art.webp";
import RedirectLoadingModal from "../landing/redirect-to-shop/redirect-loading";
import { useEffect, useState } from "react";
import style from "../landing/redirect-to-shop/redirect-to-shop.module.css";

const FooterContainer = () => {
  const [openRedirectModal, setOpenRedirectModal] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (pathName: string) => {
    router.prefetch(pathName);
    router.push(pathName);
  };

  const onRedirectToShop = () => {
    setOpenRedirectModal(true);
    setTimeout(() => {
      window.location.href = "https://hosseinibrothers.ir/";
    }, 1000); // Redirect after showing the modal for 1 second
  };

  const footerItems = [
    {
      icon: (
        <HomeIcon
          width="32"
          height="32"
          color="var(--highlighter)"
          fill={pathname.length < 2}
        />
      ),
      label: "خانه",
      path: "/",
      isActive: pathname.length < 2,
    },
    {
      icon: (
        <FactorIcon
          width="32"
          height="32"
          color="var(--highlighter)"
          fill={pathname.includes("invoices")}
        />
      ),
      label: "فاکتورها",
      path: "/invoices",
      isActive: pathname.includes("invoices"),
    },
    {
      icon: (
        <div className="pt-[40px] flex flex-col items-center">
          <Image
            src={logo}
            alt="فروشگاه برادران حسینی"
            width={80}
            height={80}
          />
          <HoseinyIcon
            width="70"
            height="44"
            color="white"
            aria-label="آیکون برادران حسینی"
          />
        </div>
      ),
      label: "",
      path: "https://hosseinibrothers.ir/",
      isActive: false,
      shop: true,
    },
    {
      icon: (
        <LevelsIcon
          width="32"
          height="32"
          color="var(--highlighter)"
          fill={pathname.includes("mylevel")}
        />
      ),
      label: "سطح من",
      path: "/mylevel",
      isActive: pathname.includes("mylevel"),
    },
    {
      icon: (
        <ProfileIcon
          width="32"
          height="32"
          color="var(--highlighter)"
          fill={pathname.includes("profile")}
        />
      ),
      label: "پروفایل",
      path: "/profile",
      isActive: pathname.includes("profile"),
    },
  ];

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
    <footer className="w-full max-w-[470px] fixed bottom-0 right-0 left-0 mx-auto  z-50">
      <div
        dir="rtl"
        className={clsx("w-full relative h-[80px] ", {
          hidden: pathname.includes("survey") || pathname.includes("login"),
        })}
      >
        <div
          style={{
            backgroundImage: `url(/images/bg-art.webp)`,
            backgroundSize: "contain",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
          }}
          className="w-full h-full rounded-t-[20px] overflow-hidden"
        ></div>
        <nav
          aria-label="Footer Navigation"
          style={{
            background:
              "linear-gradient(to left, #198D41, transparent, transparent, #198D41)",
          }}
          className="w-full h-[80px] grid grid-cols-5 justify-between px-[4px]  rounded-t-[20px] absolute top-0 right-0"
        >
          {footerItems.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                item.shop ? onRedirectToShop() : handleNavigation(item.path)
              }
              className={clsx(
                "col-span-1 h-full flex flex-col items-center gap-1 py-[10px]  focus:outline-none",
                item.shop &&
                  "!justify-center !py-0 -translate-y-1/2 active:!scale-100"
              )}
              aria-current={item.isActive ? "page" : undefined}
              aria-label={item.label}
            >
              <span>{item.icon}</span>
              {!item.shop && (
                <span
                  className={clsx(
                    "text-Highlighter",
                    item.isActive ? "!font-Bold" : "font-Regular"
                  )}
                >
                  {item.label}
                </span>
              )}
              {item.isActive && (
                <span className="w-[70px] h-[6px] rounded-t-[40px] bg-Highlighter absolute bottom-0"></span>
              )}
            </button>
          ))}
        </nav>
      </div>
      <RedirectLoadingModal
        openRedirectModal={openRedirectModal}
        style={style}
      />
    </footer>
  );
};

export default FooterContainer;
