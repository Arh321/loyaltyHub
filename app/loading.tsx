import Image from "next/image";
import logo from "@/publicLOGO.png";
import { HoseinyIcon } from "@/components/sharedIcons/sharedIcons";

const AppLoading = () => {
  return (
    <div className="w-full h-dvh bg-BG fixed top-0 z-[99999999] max-w-[470px] mx-auto left-0 right-0 flex flex-col items-center justify-center gap-4 ">
      <div className="w-full flex flex-col gap-4 items-center animate-flicker ">
        <Image src={logo} alt="برادران حسینی" className="" />
        <HoseinyIcon width="184" height="64" color="" />
      </div>
    </div>
  );
};

export default AppLoading;
