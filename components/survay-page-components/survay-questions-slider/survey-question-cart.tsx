import Image, { StaticImageData } from "next/image";
import CustomRate from "./survey-stars-container";
import { SurveySlide } from "@/hooks/useScore";

interface SurvayQuestionCartComponentProps {
  imageUrl: string | StaticImageData;
  title: string;
  score: number;
  index: number;
  tempSlides: SurveySlide[];
  setTempSlides: (slides: SurveySlide[]) => void;
  reset: boolean;
}

const SurvayQuestionCartComponent: React.FC<
  SurvayQuestionCartComponentProps
> = ({ imageUrl, title, index, score, setTempSlides, tempSlides, reset }) => {
  const handleChange = (value: number, index: number) => {
    const find = tempSlides.map((item) => {
      if (item.id == index) {
        return {
          id: item.id,
          mediuUrl: item.mediuUrl,
          question: item.question,
          score: value,
        };
      } else return item;
    });
    setTempSlides(find);
  };

  return (
    <>
      <div className="w-full aspect-[7/9] relative rounded-[24px] overflow-hidden">
        <Image
          src={imageUrl}
          width={200}
          height={400}
          className="w-full h-full object-cover"
          alt={title}
        />
        <span className="absolute py-4 bottom-0 right-0 bg-custom-gradient w-full font-Regular text-2xl text-center text-Highlighter">
          {title}
        </span>
      </div>
      <CustomRate
        score={score}
        index={index}
        getValue={(value) => handleChange(value, index)}
        reset={reset}
      />
    </>
  );
};

export default SurvayQuestionCartComponent;
