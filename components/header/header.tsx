"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

import logo from "../../public/images/hosseiniLogo.png";
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useState } from "react";

const Sidebar = React.lazy(() => import("./side-bar"));
const CancelSurveyModal = React.lazy(() => import("./cancel-survey-modal"));

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isSurveyPage = pathname.includes("survey");

  return (
    <header
      className="w-full bg-center bg-contain bg-repeat"
      style={{ backgroundImage: "url(/images/bg-art.png)" }}
    >
      <div className="bg-gradient-to-l from-green-600 via-transparent to-green-600">
        {isSurveyPage ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex justify-start px-4 py-4 text-Highlighter"
          >
            <Icon icon="stash:times" width="2.5rem" />
          </button>
        ) : (
          <div className="w-full flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-8">
              {pathname !== "/" && (
                <button
                  onClick={() => router.back()}
                  className="text-Highlighter"
                >
                  <Icon
                    icon="mingcute:left-fill"
                    width="32"
                    height="32"
                    className="text-Highlighter"
                  />
                </button>
              )}
              <button className="text-Highlighter">
                <Icon icon="lets-icons:user-light" width="2rem" />
              </button>
            </div>
            <Link href="/">
              <Image src={logo} alt="لوگو" priority />
            </Link>
            <Sidebar logo={logo} />
          </div>
        )}
      </div>
      <CancelSurveyModal setOpen={setIsModalOpen} open={isModalOpen} />
    </header>
  );
};

export default memo(Header);
