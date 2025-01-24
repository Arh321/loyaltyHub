import React, { useState } from "react";
import { Button, Drawer, Space } from "antd";
import ProfileEditMandatoryForm from "./profile-edit-mandatory";
import { IProfileInfo } from "@/types/profile";
import style from "./profile-edit-info.module.css";
import ProfileEditAdditionalForm from "./profile-complete-info-edit";
interface ProfileEditInfoContainerProps {
  open: boolean;
  onClose: () => void;
  info: IProfileInfo;
  sectionNameToEdit: "defaultAddress" | "additional" | "mandatory" | string;
}

const ProfileEditInfoContainer: React.FC<ProfileEditInfoContainerProps> = ({
  onClose,
  open,
  info,
  sectionNameToEdit,
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
          body: "!p-[10px]",
        }}
        onClose={onClose}
        open={open}
      >
        {sectionNameToEdit == "mandatory" && (
          <ProfileEditMandatoryForm
            headerTitle={"ویرایش اطلاعات کاربری"}
            mandatory={info.mandatory}
            style={style}
          />
        )}
        {sectionNameToEdit == "additional" && (
          <ProfileEditAdditionalForm
            headerTitle={"ویرایش اطلاعات تکمیلی"}
            additional={info.additional}
            style={style}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ProfileEditInfoContainer;
