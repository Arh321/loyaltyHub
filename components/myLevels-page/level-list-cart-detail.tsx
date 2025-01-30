import { IClubStatusNew } from "@/types/club-status";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";

export type LevelStatesComponentsProps = {
  status: IClubStatusNew | undefined;
  levelImege: StaticImageData | undefined;
  onClose?: Dispatch<SetStateAction<boolean>>;
  levelsStatus: [string, string][];
};

const LevelDetailPopUp: React.FC<LevelStatesComponentsProps> = ({
  status,
  levelImege,
  onClose,
  levelsStatus,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-4 grow pt-[10px] pb-[20px] px-4 rounded-[6px] relative ">
      {onClose && (
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 left-6 z-10 text-primary"
        >
          <i className="pi pi-times" style={{ fontSize: "1rem" }}></i>
        </button>
      )}
      <p className="regular-16 w-full flex flex-col gap-2 items-center relative">
        <Image src={levelImege} width={60} height={60} alt="Next" />
        <p className="flex items-center gap-1 font-Bold">
          <span>{status?.title}</span>
        </p>
      </p>

      <p className="font-Regular text-center">{status.description}</p>
      <span className="w-max py-1 font-Bold text-lg px-3 flex items-center gap-1 text-primary ">
        <span>:مزایا و هدایای این سطح</span>
        <i className="pi pi-gift"></i>
      </span>
      <ul dir="rtl" className="px-4">
        {status.levelBenefits.map((item, index) => {
          return (
            <li
              key={index}
              style={{
                listStyle: "outside",
              }}
              className="font-Medium"
            >
              {item.description}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LevelDetailPopUp;
