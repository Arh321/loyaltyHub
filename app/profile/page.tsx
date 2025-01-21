import PagesContainer from "@/components/pages-container/pages-container";
import ProfileFirstViewComponent from "@/components/profile-components/profile-first-view/profile-first-view";
import ProfileCompleteInfoSection from "@/components/profile-components/profile-info-section/profile-complete-info-section";
import ProfileInfoAddressSection from "@/components/profile-components/profile-info-section/profile-info-address-section";
import ProfileInfoSection from "@/components/profile-components/profile-info-section/profile-info-section";
import { ProfileInfo } from "@/types/profile";

const profileInfo: ProfileInfo = {
  userInfo: {
    name: "علی رضا",
    familyName: "حسن زاده نقدم",
    cellPhone: "09017522794",
    tellephone: "",
  },
  completeInfo: {
    nationalCode: "",
    birthDate: "1377/14/11",
    email: "alirezahasanzade@gmail.com",
    education: "لیسانس",
    job: "برنامه نویس",
    sexuality: "male",
  },
  addressInfo: {
    province: {
      id: 3,
      title: "خراسان رضوی",
    },
    city: {
      id: 7,
      title: "مشهد",
    },
    address: "مشهد، چهارراه دانشجو، نبش معلم ۲۶، پلاک ۶۷۵، طبق دوم، واحد ۳",
    zipCode: "",
  },
  levelInfo: {
    points: 1670,
    level: "پسته نقره ای",
    levelId: 1,
  },
};

const ProfilePage = () => {
  return (
    <PagesContainer>
      <div className="w-full h-full overflow-y-auto pt-[16px]  flex flex-col pb-[100px]">
        <ProfileFirstViewComponent
          name={profileInfo.userInfo.name}
          familyName={profileInfo.userInfo.familyName}
          level={profileInfo.levelInfo.level}
          levelId={profileInfo.levelInfo.levelId}
        />
        <div className="p-[32px] w-full flex flex-col gap-[10px]">
          <ProfileInfoSection
            headerTitle="اطلاعات کاربری"
            userInfo={profileInfo.userInfo}
          />
          <ProfileCompleteInfoSection
            headerTitle="اطلاعات تکمیلی"
            completeInfo={profileInfo.completeInfo}
          />
          <ProfileInfoAddressSection
            headerTitle="اطلاعات سکونت"
            addressInfo={profileInfo.addressInfo}
          />
        </div>
      </div>
    </PagesContainer>
  );
};

export default ProfilePage;
