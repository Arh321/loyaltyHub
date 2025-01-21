"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  FactorIcon,
  HomeIcon,
  LevelsIcon,
  UserAddIcon,
} from "../sharedIcons/sharedIcons";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";

const FooterContainer = () => {
  const { navigateTo } = useNavigation();
  const pathname = usePathname();
  const handleNavigation = (pathName: string) => {
    navigateTo(pathName, { query: { ref: "home" }, shallow: true });
  };
  const footerItems = [
    {
      icon: (
        <HomeIcon
          width="32"
          height="32"
          color="var(--highliter)"
          fill={pathname.length < 2}
        />
      ),

      lable: "خانه",
      path: "/",
      isActive: pathname.length < 2,
    },
    {
      icon: (
        <FactorIcon
          width="32"
          height="32"
          color="var(--highliter)"
          fill={pathname.includes("invoices")}
        />
      ),

      lable: "فاکتورها",
      path: "/invoices",
      isActive: pathname.includes("invoices"),
    },
    {
      icon: (
        <LevelsIcon
          width="32"
          height="32"
          color="var(--highliter)"
          fill={pathname.includes("mylevel")}
        />
      ),

      lable: "سطح من",
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
          color="var(--highliter)"
        />
      ),
      lable: "پروفایل",
      path: "/profile",
      isActive: pathname.includes("profile"),
    },
  ];

  return (
    <footer
      dir="rtl"
      style={{
        backgroundImage: `url(/images/bg-art.png)`,
        backgroundSize: "contain", // Ensures the image covers the element
        backgroundRepeat: "repeat", // Prevents the image from repeating
        backgroundPosition: "center", // Centers the image
      }}
      className={clsx(
        "w-full max-w-[470px] fixed bottom-0 right-0 left-0 mx-auto rounded-t-[20px] overflow-hidden z-50",
        {
          hidden: pathname.includes("survey") || pathname.includes("login"),
        }
      )}
    >
      <div
        style={{
          background:
            "linear-gradient(to left, #198D41, transparent,transparent,#198D41)",
        }}
        className="w-full h-[80px] grid grid-cols-4 px-[16px] py-[10px] relative"
      >
        {footerItems.map((item, index) => {
          return (
            <p
              key={index}
              role="button"
              onClick={() => handleNavigation(item.path)}
              className="w-[70px] flex flex-col items-center justify-between  h-full "
            >
              <span>{item.icon}</span>
              <span
                className={clsx(
                  "text-Highlighter",
                  item.isActive ? "!font-Bold" : "font-Regular"
                )}
              >
                {item.lable}
              </span>
              {item.isActive && (
                <span className="w-[70px] h-[6px] rounded-t-[40px] bg-Highlighter absolute bottom-0"></span>
              )}
            </p>
          );
        })}
      </div>
    </footer>
  );
};

export default FooterContainer;

const useNavigation = () => {
  const { push } = useRouter();

  const navigateTo = (path, options = {}) => {
    // Default options

    // Perform navigation
    push(path, options);

    return { navigateTo };
  };
  return { navigateTo };
};
