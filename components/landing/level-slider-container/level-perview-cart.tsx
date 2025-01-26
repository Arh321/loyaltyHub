import { IClubStatusNew } from "@/types/club-status";
import Image, { StaticImageData } from "next/image";
import SilverLevel from "../../../public/images/SilverLevel.webp";
import BronzeLevel from "../../../public/images/BronzeLevel.webp";
import GoldLevel from "../../../public/images/GoldLevel.webp";

import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Modal, Progress } from "antd";
import styles from "../../../styles/ant-custom-styles.module.css";
import clsx from "clsx";
import { FC, useCallback, useMemo, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import LevelDetailPopUp from "@/components/myLevels-page/level-list-cart-detail";

interface LevelPerviewCartProps {
  level: IClubStatusNew;
  inLevelPAge?: boolean;
}

const levelImages = [
  { id: 0, src: BronzeLevel, alt: "Bronze Level Badge" },
  { id: 1, src: SilverLevel, alt: "Silver Level Badge" },
  { id: 2, src: GoldLevel, alt: "Gold Level Badge" },
];

const LevelPerviewCart: FC<LevelPerviewCartProps> = ({
  level,
  inLevelPAge,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleCancel = () => {
    setOpen(false);
  };
  const levelImage = useMemo(
    () => levelImages.find((item) => item?.id === level.id),
    [level.id]
  );

  const isNextLevel = level.customerLevelState === "Next";
  const isCurrentLevel = level.customerLevelState === "Current";
  const isDoneLevel = level.customerLevelState === "Done";

  return (
    <>
      <section
        role="button"
        onClick={() => setOpen(true)}
        className="w-[70%] flex flex-col items-center"
      >
        <figure className="w-[158px] flex items-center">
          <Image
            src={levelImage?.src as StaticImageData}
            alt={levelImage?.alt || "Membership Level Badge"}
            className="w-full h-auto"
            style={{ objectFit: "contain" }}
            priority={level.customerLevelState === "Current"}
            loading={level.customerLevelState === "Current" ? "eager" : "lazy"}
          />
        </figure>

        {!inLevelPAge ? (
          <div className="pt-[8px] relative">
            {isDoneLevel && (
              <span
                className="min-w-[88px] bg-BG font-Regular text-[14px] text-Primary px-4 py-[0.3rem] rounded-[50px] text-center"
                role="status"
              >
                تکمیل شده
              </span>
            )}
            {isCurrentLevel && (
              <span
                className="min-w-[88px] bg-Secondary2 text-white font-Regular text-[14px] px-4 py-[0.3rem] rounded-[50px] text-center"
                role="status"
              >
                سطح من
              </span>
            )}
            {isNextLevel && (
              <div className="relative w-full pb-4">
                <span
                  className="min-w-[88px] text-Secondary2 bg-BG text-[12px] flex items-center gap-1 font-Bold px-4 py-2 rounded-[50px] text-center"
                  role="status"
                >
                  <span className="drop-shadow-sm whitespace-nowrap">
                    خرید مانده
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-[8px]">تومان</span>
                    {numberToPersianPrice(level.nextLevelRemainPrice)}
                  </span>
                </span>
                <span
                  className="w-[34px] h-[34px] bg-Highlighter shadow-lg rounded-full p-2 text-sm font-Bold flex justify-center items-center absolute top-0 left-0 right-0 mx-auto -translate-y-[70%]"
                  aria-label={`${level.levelPercent}% Complete`}
                  role="progressbar"
                  aria-valuenow={level.levelPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {level.levelPercent}
                </span>
                <div className="absolute w-full -bottom-2">
                  <Progress
                    percent={level.levelPercent}
                    strokeColor="var(--Secondary2)"
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
          <span
            className="min-w-[88px] bg-Secondary2 text-white font-Regular text-[14px] px-4 py-[0.3rem] rounded-[50px] text-center"
            role="button"
          >
            مشاهده جزئیات
          </span>
        )}
      </section>
      <Modal
        open={open}
        title={
          <div className="w-full flex items-center justify-center relative">
            <span>{level.title}</span>
            <CloseOutlined
              className="!text-Alert !absolute top-0 bottom-0 my-auto left-2"
              role="button"
              onClick={() => {
                setOpen(() => !open);
              }}
            />
          </div>
        }
        onCancel={handleCancel}
        style={{
          direction: "rtl",
          width: "95vw !important",
          maxWidth: "450px",
          height: "90dvh",
        }}
        classNames={{
          header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
          content: " !p-2 !bg-BG !h-full",
          footer: "!hidden",
        }}
        closeIcon={false}
        footer={false}
      >
        <LevelDetailPopUp
          levelImege={SilverLevel}
          status={level}
          onClose={setOpen}
        />
      </Modal>
    </>
  );
};

export default LevelPerviewCart;
