import Image from "next/image";
import logo from "@/publicimages/loyaltyhub.png";

const AppLoading = () => {
  return (
    <div className="w-full h-dvh bg-BG fixed top-0 z-[99999999] max-w-[470px] mx-auto left-0 right-0 flex flex-col items-center justify-center gap-4 ">
      <Image src={logo} alt="loyalty-hub" className="w-[200px]" />
      <div className="loader"></div>
    </div>
  );
};

export default AppLoading;
