"use client";
import { Modal } from "antd";
import {
  ProfileFirstViewLeftBorder,
  ProfileFirstViewRightBorder,
} from "@/components/sharedIcons/icons-index";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import ProfileFirstViewInfo from "./profile-first-view-info";
import AntdLazyImage from "../../image-with-loader/image-with-loader";

export interface ProfileFirstViewComponentProps {
  name: string;
  familyName: string;
  level: string;
  levelId: number;
}

const imageBackgrounds = [
  { id: 1, url: "https://s8.uupload.ir/files/profile-bg-1_z9yt.jpg" },
  { id: 2, url: "https://s8.uupload.ir/files/profile-bg-2_5jus.jpg" },
  { id: 3, url: "https://s8.uupload.ir/files/profile-bg-3_c30i.jpg" },
  { id: 4, url: "https://s8.uupload.ir/files/profile-bg-4_rjkz.jpg" },
];

const ProfileFirstViewComponent: React.FC<ProfileFirstViewComponentProps> = ({
  familyName,
  level,
  levelId,
  name,
}) => {
  const [selectedBG, setSelectedBG] = useState<{
    id: number;
    url: string;
  }>(imageBackgrounds[0]);
  const [openChangeProfileImage, serOpenChangeProfileImage] =
    useState<boolean>(false);
  const handleCancel = () => {
    serOpenChangeProfileImage(false);
  };
  return (
    <div className="w-full">
      <div className="w-full h-[102px] flex items-center justify-between gap-[10px]">
        <ProfileFirstViewLeftBorder width="23" height="102" color={""} />
        <div className="grow h-full relative rounded-[10px] overflow-hidden">
          <div className="w-full h-full ">
            <AntdLazyImage
              className="w-full h-full object-cover "
              src={selectedBG.url}
              alt="Descriptive text"
              width={200}
              height={200}
            />
          </div>
          <ProfileFirstViewInfo
            name={name}
            familyName={familyName}
            level={level}
            levelId={levelId}
          />
        </div>
        <ProfileFirstViewRightBorder width="23" height="102" color={""} />
      </div>
      <Modal
        open={openChangeProfileImage}
        title={
          <div className="w-full flex items-center justify-center relative">
            <span>تغییر تصویر</span>
            <CloseOutlined
              className="!text-Alert !absolute top-0 bottom-0 my-auto left-2"
              role="button"
              onClick={() => {
                serOpenChangeProfileImage(() => !openChangeProfileImage);
              }}
            />
          </div>
        }
        onCancel={handleCancel}
        style={{
          direction: "rtl",
          width: "95vw !important",
          maxWidth: "450px",
          height: "95dvh",
        }}
        classNames={{
          header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
          content: " !p-2 !bg-BG !h-full",
          footer: "!hidden",
        }}
        closeIcon={false}
        footer={false}
      ></Modal>
    </div>
  );
};
export default ProfileFirstViewComponent;
