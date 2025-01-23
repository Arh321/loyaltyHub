import { IClubStatusNew } from "@/types/club-status";
import Image, { StaticImageData } from "next/image";
import SilverLevel from "../../../public/images/SilverLevel.webp";
import BronzeLevel from "../../../public/images/BronzeLevel.webp";
import GoldLevel from "../../../public/images/GoldLevel.webp";

import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Progress } from "antd";
import styles from "../../../styles/ant-custom-styles.module.css";
import clsx from "clsx";

interface LevelPerviewCartProps {
  level: IClubStatusNew;
  inLevelPAge?: boolean;
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

const LevelPerviewCart: React.FC<LevelPerviewCartProps> = ({
  level,
  inLevelPAge,
}) => {
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
      {!inLevelPAge ? (
        <div className="pt-[8px] relative">
          {level.customerLevelState == "Done" && (
            <span className="min-w-[88px] bg-BG font-Regular text-[14px] text-Primary px-4 py-[0.3rem] rounded-[50px] text-center">
              تکمیل شده
            </span>
          )}
          {level.customerLevelState == "Current" && (
            <span className="min-w-[88px] bg-Secondary2 text-white font-Regular text-[14px] px-4 py-[0.3rem] rounded-[50px] text-center">
              سطح من
            </span>
          )}
          {level.customerLevelState == "Next" && (
            <div className="relative w-full pb-4">
              <span className="min-w-[88px] text-Secondary2 bg-BG text-[12px] flex items-center gap-1 font-Bold px-4 py-2 rounded-[50px] text-center">
                <span className="drop-shadow-sm whitespace-nowrap">
                  خرید مانده
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[8px]">تومان</span>
                  {numberToPersianPrice(level.nextLevelRemainPrice)}
                </span>
              </span>
              <span className="w-[34px] h-[34px] bg-Highlighter shadow-lg rounded-full p-2 text-sm font-Bold flex justify-center items-center absolute top-0 left-0 right-0 mx-auto  -translate-y-[70%]">
                {level.levelPercent}
              </span>
              <div className="absolute w-full -bottom-2">
                <Progress
                  percent={50}
                  strokeColor={"var(--Secondary2)"}
                  strokeWidth={2}
                  showInfo={false}
                  trailColor="var(--BG)"
                  rootClassName="!px-3 !-mt-8 !h-3 !relative"
                  strokeLinecap="round"
                  className={clsx(styles["next-progresBar"])}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <span className="min-w-[88px] bg-Secondary2 text-white font-Regular text-[14px] px-4 py-[0.3rem] rounded-[50px] text-center">
          مشاهده جزئیات
        </span>
      )}
    </div>
  );
};

export default LevelPerviewCart;
