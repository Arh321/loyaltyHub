"use client";
import { FactorIcon } from "@/components/sharedIcons/sharedIcons";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Icon } from "@iconify/react/dist/iconify.js";
import InvoiceModalDetail from "../invoice-detail/invoice-detai-modal";
import { useState } from "react";
import clsx from "clsx";
import { IInvoice } from "@/types/invoice";

interface InoiceListItemProps {
  index: number;
  invoice: IInvoice;
}

const InoiceListItem: React.FC<InoiceListItemProps> = ({ index, invoice }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        dir="rtl"
        role="button"
        onClick={() => setOpen(true)}
        style={{
          animationDelay: `${(index + 1) * 0.05}s`,
          animationFillMode: "forwards",
          transform: "translateY(250px)",
        }}
        className={clsx(
          "w-full flex flex-col opacity-0 gap-[12px] px-[10px] py-[12px] bg-Highlighter rounded-[10px] relative animate-fadeUp"
        )}
      >
        <div className="w-full flex items-center justify-between ">
          <span className="flex items-center gap-1 text-Secondary font-Regular">
            <Icon
              icon="ph:map-pin"
              width="24"
              height="24"
              style={{ color: "var(--Secondary)" }}
            />
            <span>{invoice.cusDepName}</span>
          </span>
          <span className="px-[10px] min-w-[123px] py-1 flex items-start justify-center gap-1 bg-transparent border border-Focus rounded-[50px] text-Focus">
            <span className="font-Medium text-base">
              {numberToPersianPrice(invoice.salePrice)}
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
            <span>#{invoice.transactionID}</span>
          </span>
          <span className="text-Secondary font-Regular">
            {invoice.cusSaleDate}
          </span>
        </div>

        {invoice.hasSurvey && !invoice.isComplete && (
          <span className="w-3 h-3 bg-Alert rounded-full absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 "></span>
        )}
      </div>
      <InvoiceModalDetail
        setOpen={setOpen}
        open={open}
        showSurveyButton={invoice.hasSurvey && !invoice.isComplete}
        loadingInvoice={false}
        // showServayButton={}
      />
    </>
  );
};

export default InoiceListItem;
