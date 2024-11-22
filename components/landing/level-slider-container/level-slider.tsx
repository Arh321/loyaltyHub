import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const LevelsSlider = () => {
  return (
    <div className="w-full relative">
      <Swiper
        slidesPerView={1}
        pagination={true}
        modules={[Navigation, Pagination]}
      >
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  );
};
