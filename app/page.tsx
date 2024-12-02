import BannerSlidersComponent from "@/components/landing/banners-slider/banners-slider-lazy";
import GiftsAndCoponsContainerLAzy from "@/components/landing/gifts-and-copons/gifts-and-copons-container-lazy";

import CurrentLevelSliderContainer from "@/components/landing/level-slider-container/level-slider-container";
import MembershopReqCardComponent from "@/components/landing/membershopReqCard/membershopReqCard";

export default function Home() {
  return (
    <div className="w-full grow  no-scrollbar overflow-y-auto bg-BG rounded-t-[20px]  -mt-[10px]">
      <div className=" w-full min-h-[calc(100vh-80px)] overflow-y-auto flex flex-col  gap-4 sm:px-6 lsm:px-8 pt-[18px] pb-[100px]">
        <CurrentLevelSliderContainer />
        <BannerSlidersComponent />
        <GiftsAndCoponsContainerLAzy />
        <MembershopReqCardComponent />
      </div>
    </div>
  );
}
