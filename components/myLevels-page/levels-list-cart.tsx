import { IClubStatusNew } from "@/types/club-status";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import BronzeLevel from "@/publicimages/image 1372.png";
import GoldLevel from "@/publicimages/goldPeste.png";
import SilverLevel from "@/publicimages/silverPeste.png";
import Image from "next/image";
import { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { CloseOutlined } from "@ant-design/icons";
import LevelDetailPopUp from "./level-list-cart-detail";

interface LevelsListCartProps {
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
const LevelsListCart: React.FC<LevelsListCartProps> = ({ level }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div
      style={{
        backgroundImage: "url(/images/Lines.png)",
        direction: "rtl",
      }}
      className="w-full rounded-[10px] aspect-[16/7] shadow"
    >
      <div
        onClick={() => setOpen(true)}
        className="w-full h-full flex flex-col justify-between pt-[20px]"
      >
        <div className="w-full flex items-center justify-between pr-[14px]">
          <span className="text-Secondary2 font-Medium text-xl">
            {level.title}
          </span>
          <span
            className={clsx(
              "w-[74px] h-[34px] flex items-center rounded-r-[50px] border-r border-y pr-[10px]",
              level.customerLevelState == "Done"
                ? "border-Secondary2"
                : "border-Alert"
            )}
          >
            {level.customerLevelState == "Done" ? (
              <Icon
                icon="simple-line-icons:check"
                width="24"
                height="24"
                style={{ color: "var(--Secondary2)" }}
              />
            ) : (
              <Icon
                icon="lets-icons:lock-light"
                width="28"
                height="28"
                style={{ color: "var(--Alert)" }}
              />
            )}
          </span>
        </div>
        <div className="w-full flex justify-center">
          <div
            className={clsx(
              "w-[132px] h-[66px] rounded-t-full bg-Highlighter  border-x border-t flex items-end justify-center",
              level.customerLevelState == "Done"
                ? "border-Secondary2"
                : "border-Alert"
            )}
          >
            <div
              style={{
                background: `linear-gradient(to top, ${
                  level.customerLevelState == "Done"
                    ? "var(--Secondary2)"
                    : "#FF0004"
                }, transparent)`,
              }}
              className="w-[120px] h-[60px]  rounded-t-full relative"
            >
              <div className="absolute bottom-full translate-y-1/2 left-0 right-0 mx-auto w-max">
                {level.customerLevelState == "Next" && (
                  <Image src={GoldLevel} width={60} height={60} alt="Next" />
                )}
                {level.customerLevelState == "Done" && (
                  <Image src={BronzeLevel} width={60} height={60} alt="Next" />
                )}
              </div>
              {level.customerLevelState == "Next" && (
                <span
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                  className="w-[34px] h-[34px] bg-Highlighter text-Alert rounded-full p-2 text-sm font-Bold flex justify-center items-center absolute top-0 left-0 right-0 mx-auto translate-y-1/2 "
                >
                  {level.levelPercent}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={!!open}
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
          levelImege={GoldLevel}
          status={level}
          onClose={setOpen}
        />
      </Modal>
    </div>
  );
};

export default LevelsListCart;
