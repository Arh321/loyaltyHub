"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "../../../public/surveys/Pistachio.jpg";
import image2 from "../../../public/surveys/Rectangle 4402.png";
import image3 from "../../../public/surveys/peeled-almonds-clay-plate-stone-tile-wooden-background.jpg";
import image4 from "../../../public/surveys/1029.png";
import image5 from "../../../public/surveys/hosseini.png";
import SurvayQuestionCartComponent from "./survey-question-cart";
import { Rate } from "antd";
import clsx from "clsx";
import { useState } from "react";
import style from "./survay-questions-slider.module.css";

const survays = [
  {
    id: 1,
    mediuUrl: image1,
    question: "تنوع و کیفیت کالا",
  },
  {
    id: 2,
    mediuUrl: image2,
    question: "سرعت و کیفیت خدمات",
  },
  {
    id: 3,
    mediuUrl: image3,
    question: "محیط و تمیزی فروشگاه",
  },
  {
    id: 4,
    mediuUrl: image4,
    question: "امکانات و تجهیزات",
  },
  {
    id: 5,
    mediuUrl: image5,
    question: "تجربه کلی از خرید",
  },
];

const SurveyQuestionsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleNext = () => {
    if (swiperInstance) {
      console.log(swiperInstance);
      swiperInstance.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };
  return (
    <div className="w-full grow relative pt-[20px]">
      <Swiper
        slidesPerView={1.3}
        centeredSlides={true}
        spaceBetween={10}
        speed={500}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        allowTouchMove={false} // Disable dragging
        className={clsx(style["survey-swiper"])}
      >
        {survays.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="flex flex-col gap-[20px] transition-all duration-500"
            >
              <SurvayQuestionCartComponent
                imageUrl={item.mediuUrl}
                title={item.question}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="w-full flex flex-col gap-[20px] pt-[20px]">
        <Rate
          allowHalf
          defaultValue={2.5}
          className={clsx("w-full !text-[40px] !flex justify-center gap-4")}
        />
        <div className="w-full flex flex-col gap-[10px] items-center ">
          <button
            onClick={handleNext}
            className="font-Medium  transform  bg-Secondary2 text-Highlighter p-2 rounded w-[284px]"
          >
            ثبت
          </button>
          <button
            onClick={handlePrev}
            className="font-Medium bg-Highlighter text-Secondary2 p-2 rounded w-[284px]"
          >
            قبلی
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestionsSlider;
