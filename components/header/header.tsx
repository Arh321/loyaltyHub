"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import logo from "../../public/images/hosseiniLogo.png";
import Image from "next/image";
import Sidebar from "./side-bar";
import { usePathname } from "next/navigation";
import { Modal } from "antd";
import CancelSurveyModal from "./cancel-survey-modal";
import { useState } from "react";
const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      style={{
        backgroundImage: `url(/images/bg-art.png)`,
        backgroundSize: "contain", // Ensures the image covers the element
        backgroundRepeat: "repeat", // Prevents the image from repeating
        backgroundPosition: "center", // Centers the image
      }}
      className="w-full "
    >
      {
        <div
          style={{
            background:
              "linear-gradient(to left, #198D41, transparent,transparent,#198D41)",
          }}
        >
          {pathname.includes("survey") ? (
            <span
              role="button"
              onClick={() => setOpen(true)}
              className="w-full flex justify-start px-[16px] py-[16px] text-Highlighter"
            >
              <Icon icon="stash:times" width="2.5rem" />
            </span>
          ) : (
            <div className="w-full flex items-center justify-between px-[16px] py-[16px]">
              <button className="text-Highlighter">
                <Icon
                  icon="lets-icons:user-light"
                  color="white"
                  width={"2rem"}
                />
              </button>
              <Link href={"/"}>
                <Image src={logo} alt="لوگو" />
              </Link>
              <Sidebar logo={logo} />
            </div>
          )}
        </div>
      }
      <CancelSurveyModal setOpen={setOpen} open={open} />
    </header>
  );
};

export default Header;
