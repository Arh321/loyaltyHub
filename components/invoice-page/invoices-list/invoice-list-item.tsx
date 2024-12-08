"use client";
import { FactorIcon } from "@/components/sharedIcons/sharedIcons";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Icon } from "@iconify/react/dist/iconify.js";
import InvoiceModalDetail from "../invoice-detail/invoice-detai-modal";
import { useState } from "react";

const InoiceListItem = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        dir="rtl"
        role="button"
        onClick={() => setOpen(true)}
        className="w-full flex flex-col gap-[12px] px-[10px] py-[12px] bg-Highlighter rounded-[10px] relative"
      >
        <div className="w-full flex items-center justify-between ">
          <span className="flex items-center gap-1 text-Secondary font-Regular">
            <Icon
              icon="ph:map-pin"
              width="24"
              height="24"
              style={{ color: "var(--Secondary)" }}
            />
            <span>پردیس</span>
          </span>
          <span className="px-[10px] min-w-[123px] py-1 flex items-start justify-center gap-1 bg-transparent border border-Focus rounded-[50px] text-Focus">
            <span className="font-Medium text-base">
              {numberToPersianPrice(13400000)}
            </span>
            <span className="font-Regular text-xs">تومان</span>
          </span>
        </div>
        <div className="w-full flex items-center justify-between ">
          <span className="flex items-center gap-1 text-Secondary font-Regular">
            <FactorIcon
              width="24"
              height="28"
              color="var(--Secondary)"
              fill={false}
            />
            <span>#123456789</span>
          </span>
          <span className="text-Secondary font-Regular">
            ۱۴۰۳/۰۲/۱۵ - ۱۶:۳۲
          </span>
        </div>

        <span className="w-3 h-3 bg-Alert rounded-full absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 "></span>
      </div>
      <InvoiceModalDetail
        setOpen={setOpen}
        open={open}
        showServayButton={true}
      />
    </>
  );
};

export default InoiceListItem;
