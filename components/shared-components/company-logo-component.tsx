import { useSelector } from "react-redux";
import ImageWithLoader from "../image-with-loader/image-with-loader";
import HoseinyLogoText from "../sharedIcons/hosseinyIcon";
import logo from "@/publicLOGO.png";
import clsx from "clsx";
import { RootState } from "@/redux/store";

interface CompanyLogoComponentProps {
  containerClass?: string;
  width?: number;
  height?: number;
  imageClass?: string;
  logoIconSize?: {
    width: string;
    height: string;
    color: string;
  };
}

const DEFAULT_DIMENSIONS = {
  width: 200,
  height: 200,
  imageWidth: "!w-[200px]",
  imageHeight: "!h-[100px]",
} as const;

const CompanyLogoComponent = ({
  containerClass,
  height = DEFAULT_DIMENSIONS.height,
  imageClass,
  width = DEFAULT_DIMENSIONS.width,
  logoIconSize,
}: CompanyLogoComponentProps) => {
  const { info } = useSelector((state: RootState) => state.companySlice);
  const containerClassName = clsx(
    containerClass ?? "w-full flex flex-col gap-4 items-center"
  );

  const imageClassName = clsx(
    imageClass ?? [
      DEFAULT_DIMENSIONS.imageWidth,
      DEFAULT_DIMENSIONS.imageHeight,
      `[&_img]:!object-contain`,
    ]
  );

  return (
    <div className={containerClassName}>
      {info && (
        <ImageWithLoader
          src={info.logoUrl}
          alt="HoseinyLogo"
          width={width}
          height={height}
          imageClass={imageClassName}
        />
      )}
    </div>
  );
};

const MemoizedCompanyLogoComponent = CompanyLogoComponent;
export default MemoizedCompanyLogoComponent;
