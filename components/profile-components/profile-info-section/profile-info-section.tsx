"use client";
import ProfileOneRowInfo from "./profile-each-row";

interface ProfileInfoSectionProps {
  userInfo: {
    name: string;
    familyName: string;
    cellPhone: string;
    tellephone: string;
  };
  headerTitle: string;
}

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  headerTitle,
  userInfo,
}) => {
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
            title: "نام",
            value: userInfo.name,
          },
          {
            title: "نام خانوادگی",
            value: userInfo.familyName,
          },
        ]}
        onEditMethod={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <ProfileOneRowInfo
        items={[
          {
            title: "شماره همراه",
            value: userInfo.cellPhone,
          },
          {
            title: "تلفن ثابت",
            value: userInfo.tellephone,
          },
        ]}
        onEditMethod={() => console.log("miad")}
      />
    </div>
  );
};

export default ProfileInfoSection;
