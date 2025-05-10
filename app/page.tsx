import BannerSlidersComponent from "@/components/landing/banners-slider/banners-slider-lazy";
import GiftsAndCoponsContainerLAzy from "@/components/landing/gifts-and-copons/gifts-and-copons-container-lazy";
import PagesContainer from "@/components/pages-container/pages-container";
import React, { Suspense } from "react";
import CurrentLevelSliderContainer from "@/components/landing/level-slider-container/level-slider-container";
import { LoadingOutlined } from "@ant-design/icons";

export default function Home() {
  return (
    <Suspense fallback={<div>درحال بارگذاری</div>}>
      <PagesContainer>
        <div className="w-full h-full overflow-hidden pt-[16px] gap-4 flex flex-col sm:px-6 lsm:px-8 pb-[100px] animate-fadeIn">
          <CurrentLevelSliderContainer />
          <BannerSlidersComponent />
          <GiftsAndCoponsContainerLAzy />
        </div>
      </PagesContainer>
    </Suspense>
  );
}
