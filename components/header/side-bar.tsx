"use client";
import React, { useState } from "react";
import { Drawer } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image, { StaticImageData } from "next/image";
// import { useDispatch } from "react-redux";
import Link from "next/link";

const Sidebar = ({ logo }: { logo: StaticImageData }) => {
  const [collapsed, setCollapsed] = useState(false);
  //   const dispatch = useDispatch();
  const content = [
    {
      icon: <Icon icon="lets-icons:user-light" width="1.6em" height="1.6em" />,
      label: "حساب کاربری من",
      url: "/profile",
    },
    {
      icon: <Icon icon="solar:chat-line-linear" width="1.6em" height="1.6em" />,
      label: "انتقادات و پیشنهادات",
      // command: () => {
      //   dispatch(triggerModal({ key: "MemberShipVisible", value: true }));
      // },
    },
    {
      icon: (
        <Icon
          icon="lets-icons:group-share-light"
          width="1.6rem"
          height="1.6rem"
        />
      ),
      label: "درخواست همکاری",
      url: "/work-request",
    },

    {
      icon: <Icon icon="fluent-mdl2:phone" width="1.6em" height="1.6em" />,
      label: "تماس با ما",
      url: "/contact-us",
    },
    {
      icon: <Icon icon="simple-line-icons:info" width="1.6em" height="1.6em" />,
      label: "درباره ما",
      url: "/about-us",
    },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <button onClick={toggleCollapsed} className="text-Highlighter">
        <Icon icon="lucide:menu" color="white" width={"2rem"} />
      </button>
      <Drawer
        title={false}
        placement={"right"}
        closable={false}
        onClose={toggleCollapsed}
        open={collapsed}
        className="p-0"
        classNames={{
          body: "!p-0 ",

          wrapper:
            "!w-[70vw] rounded-tl-[50px] rounded-bl-[50px] overflow-hidden relative",
        }}
      >
        <div className="w-full h-full flex flex-col gap-4 relative">
          <div className="w-full flex items-center justify-between">
            <button
              onClick={toggleCollapsed}
              className="text-Highlighter w-[74px] h-[64px]"
            >
              <span
                style={{
                  boxShadow: "4px 4px 6px 0px rgba(0,0,0,0.29) inset",
                }}
                className="w-full h-full bg-BG rounded-br-[50px] flex items-center  text-Alert text-3xl"
              >
                <Icon icon="stash:times" className="translate-x-1/2" />
              </span>
            </button>
            <div className="pt-4">
              <Image src={logo} alt="برادران حسینی" />
            </div>
          </div>
          <div
            dir="rtl"
            className="w-full flex flex-col gap-[10px] relative grow "
          >
            {content.map((item, index) => {
              return item.url ? (
                <Link
                  key={index}
                  href={`${item.url}`}
                  className="font-Regular  px-[20px] text-[14px] flex items-center gap-[10px] text-primary py-2"
                >
                  <span className="text-Secondary2">{item.icon}</span>
                  <span className="text-Primary">{item.label}</span>
                </Link>
              ) : (
                <button
                  // onClick={(e: any) => item.command && item.command(e)}
                  className="font-Regular  px-[20px] text-[14px] flex items-center gap-[10px] text-primary py-2"
                >
                  <span className="text-Secondary2">{item.icon}</span>
                  <span className="text-Primary">{item.label}</span>
                </button>
              );
            })}
          </div>
          <div
            style={{
              backgroundImage: `url(/images/bg-art.png)`,
              backgroundSize: "cover", // Ensures the image covers the element
              backgroundRepeat: "no-repeat", // Prevents the image from repeating
              backgroundPosition: "center", // Centers the image
            }}
            className="absolute bottom-0 right-0 left-0 mx-auto w-full h-[250px]"
          >
            <div
              style={{
                background:
                  "linear-gradient(165deg,#fff 20%, rgba(255,255,255,0.5) 80%)",
              }}
              className="w-full h-full flex items-end pb-12"
            >
              <div
                style={{
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderImage:
                    "linear-gradient(to right, transparent, rgb(255,255,255,0.5),transparent) 1",
                }}
                className="w-full font-Regular text-Secondary2 flex flex-col gap-2 backdrop-blur-md items-center justify-center "
              >
                <span>طراحی و تولید توسط</span>
                <span
                  style={{
                    letterSpacing: "4px",
                  }}
                >
                  LoyalityHub.ir
                </span>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
