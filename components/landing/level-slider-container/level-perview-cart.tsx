import { IClubStatusNew } from "@/types/club-status";
import Image, { StaticImageData } from "next/image";
import SilverLevel from "../../../public/images/SilverLevel.webp";
import BronzeLevel from "../../../public/images/BronzeLevel.webp";
import GoldLevel from "../../../public/images/GoldLevel.webp";

import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Modal, Progress } from "antd";
import styles from "../../../styles/ant-custom-styles.module.css";
import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import LevelDetailPopUp from "@/components/myLevels-page/level-list-cart-detail";
import { LevelState } from "@/hooks/useLevels";
import LevelStatesContainer from "./level-states/level-states.container";

interface LevelPerviewCartProps {
  level: IClubStatusNew;
  inLevelPAge?: boolean;
  levelStatus: LevelState;
  levelsStatus: [string, string][];
  getRemainingPointsAndPercent: (level: IClubStatusNew) => number[];
}

const LevelPerviewCart: FC<LevelPerviewCartProps> = ({
  level,
  inLevelPAge,
  levelStatus,
  levelsStatus,
  getRemainingPointsAndPercent,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <section
        role="button"
        onClick={() => setOpen(true)}
        className="w-[70%] flex flex-col items-center"
      >
        <figure className="w-[158px] flex items-center">
          <Image
            src={"https://hubapi.loyaltyhub.ir" + level.imageUrl}
            alt={"Membership Level Badge"}
            className="w-full h-auto"
            style={{ objectFit: "contain" }}
            priority={levelStatus === "Current"}
            loading={levelStatus === "Current" ? "eager" : "lazy"}
            width={158}
            height={158}
          />
        </figure>

        {!inLevelPAge ? (
          <LevelStatesContainer
            styles={styles}
            levelDetails={getRemainingPointsAndPercent(level)}
            levelStatus={levelStatus}
          />
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
          levelsStatus={levelsStatus}
        />
      </Modal>
    </>
  );
};

export default LevelPerviewCart;
