"use client";
import clsx from "clsx";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./banner-slider.module.css";
import banner1 from "@/public/images/banner1.png";
import banner2 from "@/public/images/banner2.png";
import banner3 from "@/public/images/banner3.png";
import Image from "next/image";

const BannerSlidersComponent = () => {
  const images = [banner1, banner2, banner3];
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
              className="w-full flex justify-center items-center "
            >
              <Image src={item} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BannerSlidersComponent;
