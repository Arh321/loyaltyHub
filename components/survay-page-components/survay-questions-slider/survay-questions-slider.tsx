"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "../../../public/surveys/Pistachio.jpg";
import image2 from "../../../public/surveys/Rectangle 4402.png";
import image3 from "../../../public/surveys/peeled-almonds-clay-plate-stone-tile-wooden-background.jpg";
import image4 from "../../../public/surveys/1029.png";
import image5 from "../../../public/surveys/hosseini.png";
import SurvayQuestionCartComponent from "./survey-question-cart";

import clsx from "clsx";
import { useEffect, useState } from "react";
import style from "./survay-questions-slider.module.css";
import useScore from "@/hooks/useScore";
import { useRouter } from "next/navigation";
import { Pagination } from "swiper/modules";
import { Skeleton } from "antd";

const survays = [
  {
    id: 1,
    mediuUrl: image1,
    question: "تنوع و کیفیت کالا",
    score: 4,
  },
  {
    id: 2,
    mediuUrl: image2,
    question: "سرعت و کیفیت خدمات",
    score: 3,
  },
  {
    id: 3,
    mediuUrl: image3,
    question: "محیط و تمیزی فروشگاه",
    score: 0,
  },
  {
    id: 4,
    mediuUrl: image4,
    question: "امکانات و تجهیزات",
    score: 1,
  },
  {
    id: 5,
    mediuUrl: image5,
    question: "تجربه کلی از خرید",
    score: 1,
  },
];

const SurveyQuestionsSlider = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setActiveIndex, setReset, setSlides, setTempSlides, state } =
    useScore(survays);

  const [swiperInstance, setSwiperInstance] = useState(null);

  const navigate = useRouter();

  const handleNext = () => {
    if (swiperInstance) {
      setSlides(state.tempSlides);
      swiperInstance.slideNext();
      if (state.activeIndex === state.slides.length - 1) {
        handleSubmitSurvey();
      }
      setReset(false);
    }
  };

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
      setReset(true);
    }
  };

  const handleSubmitSurvey = () => {
    const average = state.slides.reduce(
      (prev, curr) => (prev = curr.score + prev),
      0
    );
    const query = new URLSearchParams({
      average: `${average / state.slides.length}`,
      survey: "done",
    }).toString();

    // Navigate to the desired route with query parameters
    navigate.push(`/?${query}`);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError(null);
    }, 1500);
  }, []);

  if (loading)
    return (
      <div className="w-full mx-auto flex justify-center overflow-x-auto gap-[10px] p-[20px]">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <Skeleton.Node
              key={index}
              className="!flex !w-[370px] !h-full aspect-[2/3]"
              active
            />
          );
        })}
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!loading)
    return (
      <div className="w-full grow relative pt-[20px] animate-fadeIn">
        <Swiper
          slidesPerView={1.3}
          centeredSlides={true}
          pagination={true}
          spaceBetween={10}
          speed={500}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          modules={[Pagination]}
          allowTouchMove={false} // Disable dragging
          className={clsx(style["survey-swiper"])}
        >
          {state.slides.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex flex-col gap-[20px] transition-all duration-500"
              >
                <SurvayQuestionCartComponent
                  imageUrl={item.mediuUrl}
                  title={item.question}
                  score={item.score}
                  index={item.id}
                  setTempSlides={setTempSlides}
                  tempSlides={state.tempSlides}
                  reset={state.reset}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="w-full flex flex-col gap-[20px] pt-[20px]">
          <div className="w-full flex flex-col gap-[10px] items-center h-[100px]">
            <button
              onClick={handleNext}
              className="font-Medium  bg-Secondary2 text-Highlighter p-3 text-lg rounded-lg w-[284px]"
            >
              ثبت و بعدی
            </button>
            <button
              onClick={handlePrev}
              className={clsx(
                "font-Medium bg-Highlighter text-Secondary2 p-3 text-lg rounded-lg w-[284px] animate-fadeIn",
                state.activeIndex == 0 && "hidden"
              )}
            >
              قبلی
            </button>
          </div>
        </div>
      </div>
    );
};

export default SurveyQuestionsSlider;
