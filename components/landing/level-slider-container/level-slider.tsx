"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./level-slider.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IClubStatusNew } from "@/types/club-status";
// import axiosInstance, { controlers } from "@/utils/apiConfig";
import { Skeleton } from "antd";
import LevelPerviewCart from "./level-perview-cart";

const levelsData: IClubStatusNew[] = [
  {
    id: 0,
    title: "پسته برنزی",
    fromPrice: 50000000,
    toPrice: 150000000,
    buyPriceInYear: 71680000,
    customerLevelID: 1,
    color: "",
    birthdayDiscountsDecription: " دريافت 25 درصد تخفيف روز تولد",
    birthdayMonthDiscountsDecription: "",
    weddingAnniversaryDiscountDecription: " دريافت 25 درصد تخفيف سالگرد ازدواج",
    creditPercentageDecription:
      " دريافت 5 درصد اعتبار از هر فاکتور براي خريد بعدي دريافت 7 درصد اعتبار از  خريد ماه درابتداي ماه بعدي",
    nextLevelPercent: 48,
    levelPercent: 100,
    nextLevelTitle: "نقره اي",
    nextLevelRemainPrice: 78320000,
    clubControlDays: 550,
    loialityReduction: 0,
    chargeFromPurchase: 5,
    chargeMonthlyPercent: 7,
    birthDayPercent: 25,
    birthDayMonthlyReduction: 0,
    customerLevelState: "Done",
  },
  {
    id: 1,
    title: "پسته نقره‌ای",
    fromPrice: 150000000,
    toPrice: 200000000,
    buyPriceInYear: 71680000,
    customerLevelID: 1,
    color: "",
    birthdayDiscountsDecription: " دريافت 25 درصد تخفيف روز تولد",
    birthdayMonthDiscountsDecription: "",
    weddingAnniversaryDiscountDecription: " دريافت 25 درصد تخفيف سالگرد ازدواج",
    creditPercentageDecription:
      " دريافت 5 درصد اعتبار از هر فاکتور براي خريد بعدي دريافت 7 درصد اعتبار از  خريد ماه درابتداي ماه بعدي",
    nextLevelPercent: 0,
    levelPercent: 100,
    nextLevelTitle: "نقره اي",
    nextLevelRemainPrice: 78320000,
    clubControlDays: 550,
    loialityReduction: 0,
    chargeFromPurchase: 5,
    chargeMonthlyPercent: 7,
    birthDayPercent: 25,
    birthDayMonthlyReduction: 0,
    customerLevelState: "Current",
  },
  {
    id: 2,
    title: "پسته طلایی",
    fromPrice: 200000000,
    toPrice: 250000000,
    buyPriceInYear: 71680000,
    customerLevelID: 1,
    color: "",
    birthdayDiscountsDecription: " دريافت 25 درصد تخفيف روز تولد",
    birthdayMonthDiscountsDecription: "",
    weddingAnniversaryDiscountDecription: " دريافت 25 درصد تخفيف سالگرد ازدواج",
    creditPercentageDecription:
      " دريافت 5 درصد اعتبار از هر فاکتور براي خريد بعدي دريافت 7 درصد اعتبار از  خريد ماه درابتداي ماه بعدي",
    nextLevelPercent: 37,
    levelPercent: 37,
    nextLevelTitle: "نقره اي",
    nextLevelRemainPrice: 78320000,
    clubControlDays: 550,
    loialityReduction: 0,
    chargeFromPurchase: 5,
    chargeMonthlyPercent: 7,
    birthDayPercent: 25,
    birthDayMonthlyReduction: 0,
    customerLevelState: "Next",
  },
];

const LevelsSlider = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IClubStatusNew[] | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData(levelsData);
      setError(null);
    }, 1500);
  }, []);

  if (loading)
    return (
      <div className="w-2/3 mx-auto flex justify-center">
        <Skeleton.Node className="!flex !w-full !h-full aspect-square" active />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!loading && data)
    return (
      <div className="w-full h-full relative ">
        <Swiper
          slidesPerView={1}
          pagination={true}
          navigation={true}
          modules={[Navigation, Pagination]}
          className={clsx(style["LevelsSlider-swiper"])}
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className="w-full flex justify-center items-center "
              >
                <LevelPerviewCart level={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
};

export default LevelsSlider;
