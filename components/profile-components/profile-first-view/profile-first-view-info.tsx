import { Icon } from "@iconify/react/dist/iconify.js";
import Image, { StaticImageData } from "next/image";
import SilverLevel from "../../../public/images/SilverLevel.png";
import BronzeLevel from "../../../public/images/BronzeLevel.png";
import GoldLevel from "../../../public/images/GoldLevel.png";
import { ProfileFirstViewComponentProps } from "./profile-first-view";

const levelImages = [
  {
    id: 0,
    src: BronzeLevel,
  },
  {
    id: 1,
    src: SilverLevel,
  },
  ,
  {
    id: 2,
    src: GoldLevel,
  },
];
const ProfileFirstViewInfo: React.FC<ProfileFirstViewComponentProps> = ({
  familyName,
  level,
  levelId,
  name,
}) => {
  const hasLevelImage = levelImages.find((item) => item?.id == levelId);
  return (
    <div
      dir="rtl"
      className="absolute w-full h-full flex items-center justify-between px-4 right-0 top-0 bottom-0 my-auto bg-custom-gradient-white"
    >
      <div className="w-max h-max flex flex-col justify-center gap-1">
        <p dir="rtl" className="flex items-center gap-1 text-Highlighter">
          <span className="w-6 flex justify-center">
            <Icon icon="mingcute:user-3-line" width="24" height="24" />
          </span>
          <span className="font-Bold text-lg">
            {name}
            {familyName}
          </span>
        </p>
        <p dir="rtl" className="flex items-center gap-1 text-Highlighter-Faded">
          <span className="w-6 flex justify-center">
            <Icon
              icon="material-symbols:crown-outline-rounded"
              width="20"
              height="20"
            />
          </span>
          <span className="font-Regular text-sm">{level}</span>
        </p>
      </div>
      {!!hasLevelImage && (
        <div className="w-[58px] flex items-center animate-movable">
          <Image
            src={hasLevelImage.src as StaticImageData}
            alt=""
            className="w-full h-auto"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileFirstViewInfo;
