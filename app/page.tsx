import BannerSlidersComponent from "@/components/landing/banners-slider/banners-slider-lazy";
import GiftsAndCoponsContainerLAzy from "@/components/landing/gifts-and-copons/gifts-and-copons-container-lazy";

import SurveySubmitModal from "@/components/landing/modals/survey-submit-modal";

import PagesContainer from "@/components/pages-container/pages-container";
import React, { Suspense } from "react";
import AppLoading from "./loading";

const CurrentLevelSliderContainer = React.lazy(
  () =>
    import("@/components/landing/level-slider-container/level-slider-container")
);

export default function Home() {
  return (
    <PagesContainer>
      <Suspense fallback={<AppLoading />}>
        <div className="w-full h-full overflow-y-auto pt-[16px] gap-4 flex flex-col sm:px-6 lsm:px-8 pb-[100px]">
          <CurrentLevelSliderContainer />
          <BannerSlidersComponent />
          <GiftsAndCoponsContainerLAzy />
        </div>
        <SurveySubmitModal />
      </Suspense>
    </PagesContainer>
  );
}
