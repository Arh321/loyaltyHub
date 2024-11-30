import BannerSlidersComponent from "@/components/landing/banners-slider/banners-slider-lazy";
import GiftsAndCoponsContainerComponent from "@/components/landing/gifts-and-copons/gifts-and-copons-container";

import CurrentLevelSliderContainer from "@/components/landing/level-slider-container/level-slider-container";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-4 sm:px-6 lsm:px-8 bg-BG grow rounded-t-[20px] py-[18px] -mt-[10px]">
      <CurrentLevelSliderContainer />
      <BannerSlidersComponent />
      <GiftsAndCoponsContainerComponent />
    </div>
  );
}
