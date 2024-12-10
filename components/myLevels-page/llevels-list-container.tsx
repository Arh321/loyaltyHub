import { IClubStatusNew } from "@/types/club-status";
import LevelsListCart from "./levels-list-cart";

interface LevelsLostContainerProps {
  levels: IClubStatusNew[];
}

const LevelsLostContainer: React.FC<LevelsLostContainerProps> = ({
  levels,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {levels
        .filter((item) => item.customerLevelState != "Current")
        .map((level, index) => {
          return <LevelsListCart key={index} level={level} />;
        })}
    </div>
  );
};

export default LevelsLostContainer;
