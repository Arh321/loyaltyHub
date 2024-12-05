import Image, { StaticImageData } from "next/image";

interface SurvayQuestionCartComponentProps {
  imageUrl: string | StaticImageData;
  title: string;
}

const SurvayQuestionCartComponent: React.FC<
  SurvayQuestionCartComponentProps
> = ({ imageUrl, title }) => {
  return (
    <div className="w-full aspect-[7/8] relative rounded-[24px] overflow-hidden">
      <Image
        src={imageUrl}
        className="w-full h-full object-cover"
        alt={title}
      />
      <span className="absolute py-4 bottom-0 right-0 bg-custom-gradient w-full font-Regular text-2xl text-center text-Highlighter">
        {title}
      </span>
    </div>
  );
};

export default SurvayQuestionCartComponent;
