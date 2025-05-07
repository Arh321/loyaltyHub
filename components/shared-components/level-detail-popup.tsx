import { IClubStatusNew } from "@/types/club-status";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import LevelDetailPopUp from "../myLevels-page/level-list-cart-detail";
import MemoizedCtaButton from "./cta-button";

interface LevelPopUpDetailProps {
  level: IClubStatusNew;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  levelsStatus: [string, string][];
}

const LevelPopUpDetail: React.FC<LevelPopUpDetailProps> = ({
  level,
  open,
  setOpen,
  levelsStatus,
}) => {
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      title={
        <div className="w-full flex items-center justify-center relative">
          <span>{level.title}</span>
          <MemoizedCtaButton
            onClick={handleCloseModal}
            className="!bg-transparent !p-2 !absolute -top-2 left-0"
          >
            <CloseOutlined className="!text-Alert text-xl" role="button" />
          </MemoizedCtaButton>
        </div>
      }
      onCancel={handleCloseModal}
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
        levelImege={level.imageUrl}
        status={level}
        levelsStatus={levelsStatus}
      />
    </Modal>
  );
};

export default LevelPopUpDetail;
