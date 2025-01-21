"use client";
import ProfileOneRowInfo from "./profile-each-row";

interface ProfileInfoAddressSectionProps {
  addressInfo: {
    province: {
      id: number;
      title: string;
    };
    city: {
      id: number;
      title: string;
    };
    address: string;
    zipCode: string;
  };
  headerTitle: string;
}

const ProfileInfoAddressSection: React.FC<ProfileInfoAddressSectionProps> = ({
  headerTitle,
  addressInfo,
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
            title: "استان",
            value: addressInfo.province.title,
          },
          {
            title: "شهر",
            value: addressInfo.city.title,
          },
        ]}
        onEditMethod={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <ProfileOneRowInfo
        items={[
          {
            title: "آدرس",
            value: addressInfo.address,
          },
        ]}
        onEditMethod={() => console.log("miad")}
      />
      <ProfileOneRowInfo
        items={[
          {
            title: "کدپشتی",
            value: addressInfo.zipCode,
          },
        ]}
        onEditMethod={() => console.log("miad")}
      />
    </div>
  );
};

export default ProfileInfoAddressSection;
