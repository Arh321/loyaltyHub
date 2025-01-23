"use client";
import clsx from "clsx";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./banner-slider.module.css";
import { memo } from "react";
import ImageWithLoader from "@/components/image-with-loader/image-with-loader";

const BannerSlidersComponent = () => {
  const images = [
    "https://s8.uupload.ir/files/banner1_hx66.png",
    "https://s8.uupload.ir/files/banner2_il4z.png",
    "https://s8.uupload.ir/files/banner3_0b8.png",
  ];
  return (
    <div className="w-full h-full relative animate-fadeIn">
      <Swiper
        slidesPerView={1}
        pagination={true}
        navigation={false}
        autoplay={true}
        modules={[Navigation, Pagination, Autoplay]}
        className={clsx(style["bannersSlider-swiper"])}
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="w-full aspect-[16/6] rounded-[10px] overflow-hidden flex justify-center items-center "
            >
              <ImageWithLoader
                src={item}
                alt="index"
                imageClass="!w-full !h-full object-cover"
                width={406}
                height={100}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default memo(BannerSlidersComponent);
