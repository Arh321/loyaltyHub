import { memo } from "react";
import ImageWithLoader from "../image-with-loader/image-with-loader";
import HoseinyLogoText from "../sharedIcons/hosseinyIcon";
import logo from "@/publicLOGO.png";

const CompanyLogoComponent = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <ImageWithLoader
        src={logo.src}
        alt="HoseinyLogo"
        width={200}
        height={200}
        imageClass="!w-[200px] !h-[100px] [&_img]:!object-contain"
      />
      <HoseinyLogoText color={""} width={""} height={""} />
    </div>
  );
};

const MemoizedCompanyLogoComponent = memo(CompanyLogoComponent);

export default MemoizedCompanyLogoComponent;
