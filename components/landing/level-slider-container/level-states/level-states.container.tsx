import { LevelState } from "@/hooks/useLevels";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Progress } from "antd";
import clsx from "clsx";

interface LevelStatesContainerProps {
  styles: {
    readonly [key: string]: string;
  };
  levelStatus: LevelState;
  levelDetails: number[]; // [remainingPercent, remainingPoints]
}

const LevelStatesContainer: React.FC<LevelStatesContainerProps> = ({
  levelDetails,
  levelStatus,
  styles,
}) => {
  const [remainingPercent, remainingPoints] = levelDetails;

  const isDoneLevel = levelStatus === "Done";
  const isCurrentLevel = levelStatus === "Current";
  const isNextLevel = levelStatus === "Next";

  return (
    <div className="pt-[8px] relative">
      {isDoneLevel && (
        <span
          className="min-w-[88px] bg-BG font-Regular text-[14px] text-Primary px-4 py-[0.3rem] rounded-[50px] text-center"
          role="status"
        >
          تکمیل شده
        </span>
      )}

      {isCurrentLevel && (
        <span
          className="min-w-[88px] bg-Secondary2 text-white font-Regular text-[14px] px-4 py-[0.3rem] rounded-[50px] text-center"
          role="status"
        >
          سطح من
        </span>
      )}

      {isNextLevel && (
        <div className="relative w-full pb-4">
          <span
            className="min-w-[88px] text-Secondary2 bg-BG text-[12px] flex items-center gap-1 font-Bold px-4 py-2 rounded-[50px] text-center"
            role="status"
          >
            <span className="drop-shadow-sm whitespace-nowrap">
              امتیاز مانده
            </span>
            <span className="flex items-center gap-1">{remainingPoints}</span>
          </span>

          <span
            className="w-[34px] h-[34px] bg-Highlighter shadow-lg rounded-full p-2 text-sm font-Bold flex justify-center items-center absolute top-0 left-0 right-0 mx-auto -translate-y-[70%]"
            aria-label={`${remainingPercent}% Complete`}
            role="progressbar"
            aria-valuenow={remainingPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span className="text-Secondary2 text-xs">%</span>
            {remainingPercent}
          </span>

          <div className="absolute w-full -bottom-2">
            <Progress
              percent={remainingPercent}
              strokeColor="var(--Secondary2)"
              strokeWidth={2}
              showInfo={false}
              trailColor="var(--BG)"
              rootClassName="!px-3 !-mt-8 !h-3 !relative"
              strokeLinecap="round"
              className={clsx(styles["next-progresBar"])}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelStatesContainer;
