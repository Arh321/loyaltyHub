import { IClubStatusNew } from "@/types/club-status";
import Image from "next/image";

interface LevelPerviewCartProps {
  level: IClubStatusNew;
}

const levelImages = [
  {
    id: 0,
    src: "/BronzeLevel.png",
  },
  {
    id: 1,
    src: "/SilverLevel.png",
  },
  ,
  {
    id: 2,
    src: "/GoldLevel.png",
  },
];

const LevelPerviewCart: React.FC<LevelPerviewCartProps> = ({ level }) => {
  return (
    <div className="w-full aspect-square">
      <Image
        src={levelImages.find((item) => item?.id == level.id)?.src as string}
        alt=""
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default LevelPerviewCart;
