import Image from "next/image";
import border from "../../../public/images/level-custom-border.png";
import LevelsSlider from "./level-slider";

const CurrentLevelSliderContainer = () => {
  return (
    <div className="w-full aspect-[8/7] relative px-8 flex flex-col justify-end">
      <div className="w-full h-full absolute top-0 right-0 z-0">
        <Image src={border} className="w-full" alt="border" />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4 aspect-square rounded-t-full bg-Highlighter z-[1] shadow-lg rounded-b-[999px] overflow-hidden">
        <p>امیر حسین نظامی</p>
        <div className="w-full">
          <LevelsSlider />
        </div>
      </div>
    </div>
  );
};

export default CurrentLevelSliderContainer;
