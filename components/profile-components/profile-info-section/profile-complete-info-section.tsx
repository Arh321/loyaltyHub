"use client";
import { Radio, RadioChangeEvent } from "antd";
import ProfileOneRowInfo from "./profile-each-row";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ProfileCompleteInfoSectionProps {
  additional: {
    profilePhoto: string;
    lastNameEn: string;
    firstNameEn: string;
    email: string;
    nationalCode: number;
    marriage: boolean;
    spouseBirthdate: string;
    educationTitle: string;
    jobTitle: string;
  };

  headerTitle: string;
}

const ProfileCompleteInfoSection: React.FC<ProfileCompleteInfoSectionProps> = ({
  headerTitle,
  additional,
}) => {
  return (
    <div
      dir="rtl"
      style={{
        animationDelay: `0.1s`,
        animationFillMode: "forwards",
        transform: "translateY(150px)",
      }}
      className="w-full flex flex-col opacity-0 gap-[10px] bg-Highlighter rounded-[10px] p-[10px] animate-fadeUp !duration-500"
    >
      <h2 className="text-Secondary2 text-lg font-Medium mb-[10px]">
        {headerTitle}
      </h2>
      <ProfileOneRowInfo
        items={[
          {
            title: "کد ملی",
            value: additional.nationalCode
              ? additional.nationalCode.toString()
              : "",
          },
          {
            title: "تاریخ تولد",
            value: additional.spouseBirthdate,
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
            value: additional.email,
          },
        ]}
        onEditMethod={() => console.log("miad")}
      />
      <ProfileOneRowInfo
        items={[
          {
            title: "ازدواج",
            value: additional.marriage ? "متاهل" : "مجرد",
          },
          {
            title: "شغل",
            value: additional.jobTitle,
          },
        ]}
        onEditMethod={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default ProfileCompleteInfoSection;
