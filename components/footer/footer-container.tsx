"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  FactorIcon,
  HomeIcon,
  LevelsIcon,
  UserAddIcon,
} from "../sharedIcons/sharedIcons";
import clsx from "clsx";

const FooterContainer = () => {
  const { navigateTo } = useNavigation();
  const path = usePathname();
  const handleNavigation = (pathName: string) => {
    console.log(path);
    navigateTo(pathName, { query: { ref: "home" }, shallow: true });
  };
  const footerItems = [
    {
      icon: (
        <HomeIcon
          width="32"
          height="32"
          color="var(--highliter)"
          fill={path.length < 2}
        />
      ),

      lable: "خانه",
      path: "/",
    },
    {
      icon: (
        <FactorIcon
          width="32"
          height="32"
          color="var(--highliter)"
          fill={path.includes("invoices")}
        />
      ),

      lable: "فاکتورها",
      path: "invoices",
    },
    {
      icon: (
        <LevelsIcon
          width="32"
          height="32"
          color="var(--highliter)"
          fill={path.includes("mylevel")}
        />
      ),

      lable: "سطح من",
      path: "mylevel",
    },
    {
      icon: <UserAddIcon width="32" height="32" color="var(--highliter)" />,
      lable: "معرفی",
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
      className="w-full max-w-[470px] fixed bottom-0 right-0 left-0 mx-auto rounded-t-[20px] overflow-hidden"
    >
      <div
        style={{
          background:
            "linear-gradient(to left, #198D41, transparent,transparent,#198D41)",
        }}
        className="w-full h-[80px] grid grid-cols-4 px-[16px] py-[10px]"
      >
        {footerItems.map((item, index) => {
          return (
            <p
              key={index}
              role="button"
              onClick={() => handleNavigation(item.path)}
              className="w-full flex flex-col items-center justify-between  h-full "
            >
              <span>{item.icon}</span>
              <span
                className={clsx(
                  "text-Highlighter",
                  path.length < 2 && item.lable == "خانه"
                    ? "!font-Bold"
                    : "font-Regular",
                  path.includes(item.path) && path.length > 2
                    ? "font-Bold"
                    : "font-Light"
                )}
              >
                {item.lable}
              </span>
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