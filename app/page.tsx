import BannerSlidersComponent from "@/components/landing/banners-slider/banners-slider-lazy";
import GiftsAndCoponsContainerLAzy from "@/components/landing/gifts-and-copons/gifts-and-copons-container-lazy";

import CurrentLevelSliderContainer from "@/components/landing/level-slider-container/level-slider-container";
import MembershopReqCardComponent from "@/components/landing/membershopReqCard/membershopReqCard";
import SurveySubmitModal from "@/components/landing/modals/survey-submit-modal";
import PagesContainer from "@/components/pages-container/pages-container";

export default function Home() {
  return (
    <PagesContainer>
      <div className="w-full h-full overflow-y-auto pt-[16px] gap-4 flex flex-col sm:px-6 lsm:px-8 pb-[100px]">
        <CurrentLevelSliderContainer />
        <BannerSlidersComponent />
        <GiftsAndCoponsContainerLAzy />
        <MembershopReqCardComponent />
      </div>
      <SurveySubmitModal />
    </PagesContainer>
  );
}
