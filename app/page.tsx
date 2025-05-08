import BannerSlidersComponent from "@/components/landing/banners-slider/banners-slider-lazy";
import GiftsAndCoponsContainerLAzy from "@/components/landing/gifts-and-copons/gifts-and-copons-container-lazy";
import PagesContainer from "@/components/pages-container/pages-container";
import React from "react";

import { CurrentLevelSliderContainerLazy } from "@/components/landing/level-slider-container/level-slider-lazy";

export default function Home() {
  return (
    <PagesContainer>
      <div className="w-full h-full overflow-hidden pt-[16px] gap-4 flex flex-col sm:px-6 lsm:px-8 pb-[100px] animate-fadeIn">
        <CurrentLevelSliderContainerLazy />
        <BannerSlidersComponent />
        <GiftsAndCoponsContainerLAzy />
      </div>
    </PagesContainer>
  );
}
