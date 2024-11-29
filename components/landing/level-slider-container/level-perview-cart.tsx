import { IClubStatusNew } from "@/types/club-status";
import Image, { StaticImageData } from "next/image";
import SilverLevel from "../../../public/images/SilverLevel.png";
import BronzeLevel from "../../../public/images/BronzeLevel.png";
import GoldLevel from "../../../public/images/GoldLevel.png";

import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";

interface LevelPerviewCartProps {
  level: IClubStatusNew;
}

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

const LevelPerviewCart: React.FC<LevelPerviewCartProps> = ({ level }) => {
  return (
    <div className="w-[70%] flex flex-col items-center">
      <div className="w-[158px] flex items-center">
        <Image
          src={
            levelImages.find((item) => item?.id == level.id)
              ?.src as StaticImageData
          }
          alt=""
          className="w-full h-auto"
          style={{ objectFit: "contain" }}
        />
      </div>
      <p className="pt-[5px] relative">
        {level.customerLevelState == "Done" && (
          <span className="min-w-[88px] bg-BG font-Regular text-[12px] px-4 py-1 rounded-[50px] text-center">
            تکمیل شده
          </span>
        )}
        {level.customerLevelState == "Current" && (
          <span className="min-w-[88px] bg-Secondary text-white font-Regular text-[12px] px-4 py-1 rounded-[50px] text-center">
            تکمیل شده
          </span>
        )}
        {level.customerLevelState == "Next" && (
          <span className="min-w-[88px] text-Secondary2 bg-BG  flex items-center gap-1 font-Bold px-4 py-2 rounded-[50px] text-center">
            <span className="drop-shadow-sm"> خرید مانده</span>
            <span className="flex items-center gap-1">
              <span className="text-xs">تومان</span>
              {numberToPersianPrice(level.nextLevelRemainPrice)}
            </span>
          </span>
        )}
      </p>
    </div>
  );
};

export default LevelPerviewCart;
