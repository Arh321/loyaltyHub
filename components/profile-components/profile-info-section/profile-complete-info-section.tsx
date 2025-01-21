"use client";
import { Radio, RadioChangeEvent } from "antd";
import ProfileOneRowInfo from "./profile-each-row";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ProfileCompleteInfoSectionProps {
  completeInfo: {
    nationalCode: string;
    birthDate: string;
    email: string;
    education: string;
    job: string;
    sexuality: "male" | "female";
  };
  headerTitle: string;
}

const ProfileCompleteInfoSection: React.FC<ProfileCompleteInfoSectionProps> = ({
  headerTitle,
  completeInfo,
}) => {
  const [value, setValue] = useState(completeInfo.sexuality);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const options = [
    {
      value: "male",
      label: (
        <span dir="rtl" className="flex items-center gap-2 font-Medium ">
          <Icon icon="material-symbols-light:male" width="24" height="24" />
          <span>آقا</span>
        </span>
      ),
    },
    {
      value: "female",
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
      className="w-full flex flex-col gap-[10px] bg-Highlighter rounded-[10px] p-[10px]"
    >
      <h2 className="text-Secondary2 text-lg font-Medium mb-[10px]">
        {headerTitle}
      </h2>
      <ProfileOneRowInfo
        items={[
          {
            title: "کد ملی",
            value: completeInfo.nationalCode,
          },
          {
            title: "تاریخ تولد",
            value: completeInfo.birthDate,
          },
        ]}
        onEditMethod={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <ProfileOneRowInfo
        items={[
          {
            title: "ایمیل",
            value: completeInfo.email,
          },
        ]}
        onEditMethod={() => console.log("miad")}
      />
      <ProfileOneRowInfo
        items={[
          {
            title: "تحصیلات",
            value: completeInfo.education,
          },
          {
            title: "شغل",
            value: completeInfo.job,
          },
        ]}
        onEditMethod={function (): void {
          throw new Error("Function not implemented.");
        }}
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

export default ProfileCompleteInfoSection;
