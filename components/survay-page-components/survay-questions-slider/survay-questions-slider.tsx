"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import SurvayQuestionCartComponent from "./survey-question-cart";
import { useEffect, useState, useCallback } from "react";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import useScore from "@/hooks/useScore";
import style from "./survay-questions-slider.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { ISurveyQuestions } from "@/types/survet-types";

const survays = [
  {
    id: 1,
    mediuUrl: "https://s8.uupload.ir/files/1029_(1)_(1)_jx89.jpg",
    question: "تنوع و کیفیت کالا",
    score: 4,
  },
  {
    id: 2,
    mediuUrl: "https://s8.uupload.ir/files/2149139388_(1)_(1)_2em5.jpg",
    question: "سرعت و کیفیت خدمات",
    score: 3,
  },
  {
    id: 3,
    mediuUrl: "https://s8.uupload.ir/files/hosseini_u1mo.jpg",
    question: "محیط و تمیزی فروشگاه",
    score: 0,
  },
  {
    id: 4,
    mediuUrl:
      "https://s8.uupload.ir/files/peeled-almonds-clay-plate-stone-tile-wooden-background_(1)_(1)_qpd.jpg",
    question: "امکانات و تجهیزات",
    score: 1,
  },
  {
    id: 5,
    mediuUrl: "https://s8.uupload.ir/files/rectangle_4402_hjng.jpg",
    question: "تجربه کلی از خرید",
    score: 1,
  },
];

interface SurveyQuestionsSliderProps {
  questions: ISurveyQuestions[];
  surveyId: number;
}

const SurveyQuestionsSlider: React.FC<SurveyQuestionsSliderProps> = ({
  questions,
  surveyId,
}) => {
  const [loading, setLoading] = useState(true);

  const {
    setActiveIndex,
    setReset,
    setSlides,
    setTempSlides,
    state,
    applyLoading,
    onApplyPoints,
    loadingNavigate,
  } = useScore(questions);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const navigate = useRouter();

  // Handle loading state
  useEffect(() => {
    navigate.prefetch("/");

    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle slide submission

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (!swiperInstance) return;
    console.log(state.tempSlides[state.activeIndex]);
    onApplyPoints(
      state.tempSlides[state.activeIndex],
      surveyId,
      swiperInstance
    );
    setReset(false);
  }, [swiperInstance, state, setSlides, setReset]);

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
              imageUrl={item.imageUrl}
              title={item.title}
              score={item.givenPoint}
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
            disabled={applyLoading || loadingNavigate}
            onClick={handleNext}
            className="font-Medium bg-Secondary2 text-Highlighter p-3 text-lg rounded-lg w-[284px]"
          >
            {applyLoading || (loadingNavigate && <LoadingOutlined />)}
            ثبت و بعدی
          </button>
          <button
            disabled={applyLoading || loadingNavigate}
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
