import ImageWithLoader from "../image-with-loader/image-with-loader";
import HoseinyLogoText from "../sharedIcons/hosseinyIcon";
import logo from "@/publicLOGO.png";
import clsx from "clsx";

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
  imageWidth: "!w-200px",
  imageHeight: "!h-100px",
} as const;

const CompanyLogoComponent = ({
  containerClass,
  height = DEFAULT_DIMENSIONS.height,
  imageClass,
  width = DEFAULT_DIMENSIONS.width,
  logoIconSize,
}: CompanyLogoComponentProps) => {
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
      <ImageWithLoader
        src={logo.src}
        alt="HoseinyLogo"
        width={width}
        height={height}
        imageClass={imageClassName}
      />
      <HoseinyLogoText
        color={logoIconSize?.color ?? "var(--cta)"}
        width={logoIconSize?.width ?? ""}
        height={logoIconSize?.height ?? ""}
      />
    </div>
  );
};

const MemoizedCompanyLogoComponent = CompanyLogoComponent;
export default MemoizedCompanyLogoComponent;
