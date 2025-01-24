import React, { useState } from "react";
import { Button, Drawer, Space } from "antd";
import ProfileEditMandatoryForm from "./profile-edit-mandatory";
import { IProfileInfo } from "@/types/profile";
import style from "./profile-edit-info.module.css";
interface ProfileEditInfoContainerProps {
  open: boolean;
  onClose: () => void;
  info: IProfileInfo;
}

const ProfileEditInfoContainer: React.FC<ProfileEditInfoContainerProps> = ({
  onClose,
  open,
  info,
}) => {
  return (
    <div>
      <Drawer
        placement={"bottom"}
        width={500}
        classNames={{
          wrapper: "!h-max ",
          mask: "",
          content:
            "!h-full rounded-t-[10px] !p-0 !max-h-[80dvh] overflow-y-auto",
          header: "!hidden",
        }}
        onClose={onClose}
        open={open}
      >
        <ProfileEditMandatoryForm
          headerTitle={"ویرایش اطلاعات کاربری"}
          mandatory={info.mandatory}
          style={style}
        />
      </Drawer>
    </div>
  );
};

export default ProfileEditInfoContainer;
