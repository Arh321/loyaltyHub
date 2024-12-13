import BannerSlidersComponent from "@/components/landing/banners-slider/banners-slider-lazy";
import GiftsAndCoponsContainerLAzy from "@/components/landing/gifts-and-copons/gifts-and-copons-container-lazy";

import SurveySubmitModal from "@/components/landing/modals/survey-submit-modal";

import PagesContainer from "@/components/pages-container/pages-container";
import React from "react";

const CurrentLevelSliderContainer = React.lazy(
  () =>
    import("@/components/landing/level-slider-container/level-slider-container")
);

export default function Home() {
  return (
    <PagesContainer>
      <div className="w-full h-full overflow-y-auto pt-[16px] gap-4 flex flex-col sm:px-6 lsm:px-8 pb-[100px]">
        <CurrentLevelSliderContainer />
        <BannerSlidersComponent />
        <GiftsAndCoponsContainerLAzy />
      </div>
      <SurveySubmitModal />
    </PagesContainer>
  );
}
