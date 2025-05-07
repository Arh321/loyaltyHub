"use client";
import Image from "next/image";
import "../components/login-components/get-phone-styles.css";
const AppLoading = () => {
  const logo = localStorage.getItem("logo");
  return (
    <div className="w-full h-dvh bg-BG fixed top-0 z-[99999999] max-w-[470px] mx-auto left-0 right-0 flex flex-col items-center justify-center gap-4 ">
      {logo && (
        <div className="w-full flex flex-col gap-4 items-center animate-flicker ">
          <Image
            src={logo}
            alt="برادران حسینی"
            className=""
            width={200}
            height={200}
          />
        </div>
      )}
      <div className="relative animate-fadeIn">
        <span className="loader-otp !text-cta"></span>
      </div>
    </div>
  );
};

export default AppLoading;
