import Image from "next/image";
import border from "../../../public/images/level-custom-border.png";
import LevelSlidersComponent from "./level-slider-lazy";

const CurrentLevelSliderContainer = () => {
  return (
    <div className="w-full px-[25px]">
      <div className="w-full aspect-[8/6] relative sm:px-5 sm:pt-3 lsm:px-4 lsm:pt-3 flex flex-col justify-end">
        <div className="w-full h-full absolute top-0 right-0 z-0">
          <Image src={border} className="w-full" alt="border" />
        </div>
        <div className="w-full flex flex-col pt-4 gap-0 items-center justify-center aspect-square rounded-t-full bg-Highlighter z-[1] shadow-lg rounded-b-[999px] overflow-hidden">
          <p className="font-Regular text-sm text-Primary">امیر حسین نظامی</p>
          <div className="w-full aspect-[16/5]">
            <LevelSlidersComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentLevelSliderContainer;
