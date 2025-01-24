"use client";
import { Radio, RadioChangeEvent } from "antd";
import ProfileOneRowInfo from "./profile-each-row";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { OpenEditPayload } from "@/hooks/useEditProfile";

interface ProfileInfoSectionProps {
  mandatory: {
    firstName: string;
    lastName: string;
    gender: boolean;
    birthdate: string;
  };
  cellPhone: string;
  headerTitle: string;
  showEditModal: (payload: OpenEditPayload) => void;
}

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  headerTitle,
  mandatory,
  cellPhone,
  showEditModal,
}) => {
  const [value, setValue] = useState(mandatory.gender);

  const onChange = (e: RadioChangeEvent) => {
    showEditModal({
      inputId: "",
      sectionName: "mandatory",
      show: true,
    });
  };

  const options = [
    {
      value: true,
      label: (
        <span dir="rtl" className="flex items-center gap-2 font-Medium ">
          <Icon icon="material-symbols-light:male" width="24" height="24" />
          <span>آقا</span>
        </span>
      ),
    },
    {
      value: false,
      label: (
        <span dir="rtl" className="flex items-center gap-2 font-Medium ">
          <Icon icon="icons8:female" width="24" height="24" />
          <span>خانم</span>
        </span>
      ),
    },
  ];
  return (
    <div
      dir="rtl"
      style={{
        animationFillMode: "forwards",
        transform: "translateY(150px)",
      }}
      className="w-full flex flex-col opacity-0 gap-[10px] bg-Highlighter rounded-[10px] p-[10px]  animate-fadeUp !duration-500"
    >
      <h2 className="text-Secondary2 text-lg font-Medium mb-[10px]">
        {headerTitle}
      </h2>
      <ProfileOneRowInfo
        items={[
          {
            title: "نام",
            value: mandatory.firstName,
          },
          {
            title: "نام خانوادگی",
            value: mandatory.lastName,
          },
        ]}
        onEditMethod={() =>
          showEditModal({
            inputId: "",
            sectionName: "mandatory",
            show: true,
          })
        }
      />
      <ProfileOneRowInfo
        items={[
          {
            title: "شماره همراه",
            value: cellPhone,
          },
          {
            title: "تلفن ثابت",
            value: mandatory.birthdate,
          },
        ]}
        onEditMethod={() =>
          showEditModal({
            inputId: "",
            sectionName: "mandatory",
            show: true,
          })
        }
      />
      <div className="w-full relative border border-Highlighter-Faded rounded-[10px] flex ">
        <Radio.Group
          onChange={onChange}
          defaultValue={value}
          buttonStyle="solid"
          className="!w-full !flex !items-center gap-[10px] !p-[10px] [&_.ant-radio-button-wrapper-checked]:!bg-Secondary2"
        >
          {options.map((option, index) => {
            return (
              <Radio.Button
                className="!w-full !border-none !shadow-none before:!hidden !rounded-[6px]"
                key={index}
                value={option.value}
              >
                {option.label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </div>
    </div>
  );
};

export default ProfileInfoSection;
