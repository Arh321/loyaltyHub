import { IClubStatusNew } from "@/types/club-status";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";

export type LevelStatesComponentsProps = {
  status: IClubStatusNew | undefined;
  levelImege: StaticImageData | undefined;
  onClose?: Dispatch<SetStateAction<boolean>>;
};

const LevelDetailPopUp: React.FC<LevelStatesComponentsProps> = ({
  status,
  levelImege,
  onClose,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-4 grow pt-[10px] pb-[20px] px-4 rounded-[6px] relative ">
      {status?.customerLevelState == "Done" && (
        <span className="w-max absolute top-4 right-6 z-10">
          <Icon
            icon="simple-line-icons:check"
            width="24"
            height="24"
            style={{ color: "var(--Secondary2)" }}
          />
        </span>
      )}
      {status?.customerLevelState == "Next" && (
        <span className="w-max absolute top-4 right-6 z-10">
          <Icon
            icon="lets-icons:lock-light"
            width="28"
            height="28"
            style={{ color: "var(--Alert)" }}
          />
        </span>
      )}
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

      <p className="regular-14 text-center">
        {status?.birthdayDiscountsDecription}
        {status?.weddingAnniversaryDiscountDecription}
      </p>
      <span className="w-max py-1 font-Bold text-lg px-3 flex items-center gap-1 text-primary ">
        <span>:مزایا و هدایای این سطح</span>
        <i className="pi pi-gift"></i>
      </span>
      <ul dir="rtl" className="px-4">
        {status?.birthdayDiscountsDecription &&
          status?.birthdayDiscountsDecription.length > 0 && (
            <li
              style={{
                listStyle: "outside",
              }}
              className="font-Medium"
            >
              {status.birthdayDiscountsDecription}
            </li>
          )}
        {status?.creditPercentageDecription &&
          status?.creditPercentageDecription.length > 0 && (
            <li
              style={{
                listStyle: "outside",
              }}
              className="font-Medium"
            >
              {status.creditPercentageDecription}
            </li>
          )}
        {status?.weddingAnniversaryDiscountDecription &&
          status?.weddingAnniversaryDiscountDecription.length > 0 && (
            <li
              style={{
                listStyle: "outside",
              }}
              className="font-Medium"
            >
              {status.weddingAnniversaryDiscountDecription}
            </li>
          )}
        {status?.birthdayMonthDiscountsDecription &&
          status?.birthdayMonthDiscountsDecription.length > 0 && (
            <li
              style={{
                listStyle: "outside",
              }}
              className="font-Medium"
            >
              {status.birthdayMonthDiscountsDecription}
            </li>
          )}
      </ul>
    </div>
  );
};

export default LevelDetailPopUp;
