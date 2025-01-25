"use client";

import { usePathname, useRouter } from "next/navigation";
import { FactorIcon, HomeIcon, LevelsIcon } from "../sharedIcons/sharedIcons";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import Image from "next/image";
import logo from "@/public/LOGO.png";
import RedirectLoadingModal from "../landing/redirect-to-shop/redirect-loading";
import { useState } from "react";
import style from "../landing/redirect-to-shop/redirect-to-shop.module.css";

const FooterContainer = () => {
  const [openRedirectModal, setOpenRedirectModal] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (pathName: string) => {
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
        <Icon
          icon={
            pathname.includes("profile")
              ? "ix:user-profile-filled"
              : "ix:user-profile"
          }
          width="2rem"
          color="var(--highlighter)"
        />
      ),
      label: "پروفایل",
      path: "/profile",
      isActive: pathname.includes("profile"),
    },
    {
      icon: (
        <Image src={logo} alt="فروشگاه برادران حسینی" width={60} height={60} />
      ),
      label: "فروشگاه",
      path: "https://hosseinibrothers.ir/",
      isActive: false,
      shop: true,
    },
  ];

  return (
    <footer
      dir="rtl"
      style={{
        backgroundImage: `url(/images/bg-art.webp)`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
      className={clsx(
        "w-full max-w-[470px] fixed bottom-0 right-0 left-0 mx-auto rounded-t-[20px] overflow-hidden z-50",
        {
          hidden: pathname.includes("survey") || pathname.includes("login"),
        }
      )}
    >
      <nav
        aria-label="Footer Navigation"
        style={{
          background:
            "linear-gradient(to left, #198D41, transparent, transparent, #198D41)",
        }}
        className="w-full h-[80px] grid grid-cols-5 px-[16px] py-[10px] relative"
      >
        {footerItems.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              item.shop ? onRedirectToShop() : handleNavigation(item.path)
            }
            className="w-[70px] flex flex-col items-center justify-between h-full focus:outline-none"
            aria-current={item.isActive ? "page" : undefined}
            aria-label={item.label}
          >
            <span>{item.icon}</span>
            <span
              className={clsx(
                "text-Highlighter",
                item.isActive ? "!font-Bold" : "font-Regular"
              )}
            >
              {item.label}
            </span>
            {item.isActive && (
              <span className="w-[70px] h-[6px] rounded-t-[40px] bg-Highlighter absolute bottom-0"></span>
            )}
          </button>
        ))}
      </nav>
      <RedirectLoadingModal
        openRedirectModal={openRedirectModal}
        style={style}
      />
    </footer>
  );
};

export default FooterContainer;
