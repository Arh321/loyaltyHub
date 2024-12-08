"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import image1 from "../../../public/surveys/Pistachio.jpg";
import image2 from "../../../public/surveys/Rectangle 4402.png";
import image3 from "../../../public/surveys/peeled-almonds-clay-plate-stone-tile-wooden-background.jpg";
import image4 from "../../../public/surveys/1029.png";
import image5 from "../../../public/surveys/hosseini.png";
import SurvayQuestionCartComponent from "./survey-question-cart";
import { useEffect, useState, useCallback } from "react";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import useScore from "@/hooks/useScore";
import style from "./survay-questions-slider.module.css";

const survays = [
  { id: 1, mediuUrl: image1, question: "تنوع و کیفیت کالا", score: 4 },
  { id: 2, mediuUrl: image2, question: "سرعت و کیفیت خدمات", score: 3 },
  { id: 3, mediuUrl: image3, question: "محیط و تمیزی فروشگاه", score: 0 },
  { id: 4, mediuUrl: image4, question: "امکانات و تجهیزات", score: 1 },
  { id: 5, mediuUrl: image5, question: "تجربه کلی از خرید", score: 1 },
];

const SurveyQuestionsSlider = () => {
  const [loading, setLoading] = useState(true);
  const { setActiveIndex, setReset, setSlides, setTempSlides, state } =
    useScore(survays);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const navigate = useRouter();

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle slide submission
  const handleSubmitSurvey = useCallback(() => {
    const average = state.slides.reduce((prev, curr) => prev + curr.score, 0);
    const query = new URLSearchParams({
      average: (average / state.slides.length).toFixed(1),
      survey: "done",
    }).toString();

    navigate.push(`/?${query}`);
  }, [state.slides, navigate]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (!swiperInstance) return;

    setSlides(state.tempSlides);
    swiperInstance.slideNext();

    if (state.activeIndex === state.slides.length - 1) {
      handleSubmitSurvey();
    }
    setReset(false);
  }, [swiperInstance, state, handleSubmitSurvey, setSlides, setReset]);

  const handlePrev = useCallback(() => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
      setReset(true);
    }
  }, [swiperInstance, setReset]);

  if (loading) {
    return (
      <div className="w-full flex justify-center gap-[10px] p-[20px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton.Node
            key={index}
            className="!flex !w-[370px] aspect-[2/3] !h-auto"
            active
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full grow relative pt-[20px] animate-fadeIn">
      <Swiper
        slidesPerView={1.3}
        centeredSlides
        pagination
        spaceBetween={10}
        speed={500}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Pagination]}
        allowTouchMove={false}
        className={clsx(style["survey-swiper"])}
      >
        {state.slides.map((item, index) => (
          <SwiperSlide key={index} className="flex flex-col gap-[20px]">
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
        ))}
      </Swiper>
      <div className="w-full flex flex-col gap-[20px] pt-[20px]">
        <div className="w-full flex flex-col gap-[10px] items-center h-[100px]">
          <button
            onClick={handleNext}
            className="font-Medium bg-Secondary2 text-Highlighter p-3 text-lg rounded-lg w-[284px]"
          >
            ثبت و بعدی
          </button>
          <button
            onClick={handlePrev}
            className={clsx(
              "font-Medium bg-Highlighter text-Secondary2 p-3 text-lg rounded-lg w-[284px]",
              state.activeIndex === 0 && "hidden"
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
