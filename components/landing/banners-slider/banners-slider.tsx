"use client";
import clsx from "clsx";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./banner-slider.module.css";
import { memo, useCallback, useEffect, useState } from "react";
import ImageWithLoader from "@/components/image-with-loader/image-with-loader";
import { getLandingBanners } from "@/utils/landingService";
import { IBanners } from "@/types/banners-type";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BannerSlidersComponent = () => {
  const [banners, setBanners] = useState<IBanners[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useRouter();

  const getBAnners = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getLandingBanners();
      if (response.status) {
        setBanners(() => response.result);
      } else {
        setLoading(false);

        setError(true);
      }
    } catch (error) {
      setLoading(false);

      setError(true);
    } finally {
      setLoading(false);
    }
  }, [banners]);

  useEffect(() => {
    getBAnners();
  }, []);

  if (loading)
    return (
      <div>
        <Skeleton.Node
          className="!flex !w-full !h-full aspect-[16/7] rounded-[10px]"
          active
        />
      </div>
    );

  if (error) return null;

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
        {banners.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="w-full aspect-[16/6] rounded-[10px] overflow-hidden flex justify-center items-center "
            >
              <Link href={item.linkUrl} className="!w-full !h-full">
                <ImageWithLoader
                  src={"https://hubapi.loyaltyhub.ir" + item.mobileImageUrl}
                  alt="index"
                  imageClass="!w-full !h-full object-cover"
                  width={406}
                  height={100}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default memo(BannerSlidersComponent);
