import { Icon } from "@iconify/react";
import Link from "next/link";
import logo from "../../public/images/hosseiniLogo.png";
import Image from "next/image";
import Sidebar from "./side-bar";
const Header = () => {
  return (
    <header
      style={{
        backgroundImage: "url(../../public/images/Group 366250 1.png)",
      }}
      className="w-full flex items-center justify-between px-[16px] py-[16px]"
    >
      <button className="text-Highlighter">
        <Icon icon="lets-icons:user-light" color="white" width={"2rem"} />
      </button>
      <Link href={"/"}>
        <Image src={logo} alt="لوگو" />
      </Link>

      <Sidebar logo={logo} />
    </header>
  );
};

export default Header;
