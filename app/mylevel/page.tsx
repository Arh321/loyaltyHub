import LevelPerviewCart from "@/components/landing/level-slider-container/level-perview-cart";
import PagesContainer from "@/components/pages-container/pages-container";
import { IClubStatusNew } from "@/types/club-status";
import border from "@/public/images/level-custom-border.png";
import Image from "next/image";
import LevelsLostContainer from "@/components/myLevels-page/llevels-list-container";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
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
    nextLevelPercent: 37,
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
    nextLevelPercent: 97,
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
export default function InvoicesPAge() {
  return (
    <PagesContainer>
      <div className="w-full h-full overflow-y-auto pt-[16px] gap-4 flex flex-col sm:px-6 lsm:px-8 pb-[100px]">
        <div className="w-3/4 aspect-[8/6] relative sm:px-5 sm:pt-3 lsm:px-4 lsm:pt-3 flex flex-col justify-end mx-auto">
          <div className="w-full h-full absolute top-0 right-0 z-0">
            <Image src={border} className="w-full" alt="border" />
          </div>
          <div className="w-full flex flex-col pt-4 gap-0 items-center justify-center aspect-square rounded-t-full bg-Highlighter z-[1] shadow-lg rounded-b-[999px] overflow-hidden">
            <p className="font-Regular text-sm text-Primary">امیر حسین نظامی</p>
            <div className="w-full aspect-[16/5]">
              <div className="w-full flex justify-center items-center ">
                <LevelPerviewCart level={levelsData[0]} />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            background:
              "linear-gradient(to right,transparent,#fff, transparent)",
          }}
          className="w-full h-max flex items-end"
        >
          <div
            style={{
              borderWidth: "2px",
              borderStyle: "solid",
              borderImage:
                "linear-gradient(to right, transparent, rgb(255,255,255,0.5),transparent) 1",
            }}
            className="w-full font-Regular flex flex-col gap-2 backdrop-blur-md items-center justify-center "
          >
            <span>تا فعال شدن سطح بعدی</span>
            <span className="text-Secondary2 border border-Secondary2 rounded-[50px] px-6 py-[1px] font-Medium text-lg flex items-end gap-[2px]">
              <span className="text-[12px]">تومان</span>
              {numberToPersianPrice(
                levelsData.filter(
                  (item) => item.customerLevelState == "Current"
                )[0].nextLevelRemainPrice
              )}
            </span>
          </div>
        </div>
        <LevelsLostContainer levels={levelsData} />
      </div>
    </PagesContainer>
  );
}
