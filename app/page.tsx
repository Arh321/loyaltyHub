import CurrentLevelSliderContainer from "@/components/landing/level-slider-container/level-slider-container";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-4 px-8 bg-BG grow rounded-t-[20px] py-[18px] -mt-[10px]">
      <CurrentLevelSliderContainer />
    </div>
  );
}
