"use client";

import InvoiceModalDetail from "@/components/invoice-page/invoice-detail/invoice-detai-modal";
import moment from "jalali-moment";
import { useState } from "react";

interface SurvayHeaderProps {
  invoiceDate: string;
  invoiceId: string;
  survayDescription: string;
  survayTopic: string;
}

const SurvayHeader: React.FC<SurvayHeaderProps> = ({
  invoiceDate,
  invoiceId,
  survayDescription,
  survayTopic,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="w-full flex flex-col gap-4 py-4 border-b border-Secondary sm:px-6"
    >
      <h1 className="w-full font-Medium text-Primary text-center ">
        {survayTopic}
      </h1>
      <div className="w-full flex items-center justify-between">
        <span className="font-Regular border-r-2 border-Secondary2 px-[10px] flex items-end gap-1">
          <span>فاکتور</span>
          <span>،</span>
          <span>
            {moment(invoiceDate, "jYYYY/jMM/jDD")
              .locale("fa")
              .format("dddd jD jMMMM")}
          </span>
        </span>
        <button
          onClick={() => setOpen(true)}
          className="w-[136px] h-[46px] text-Secondary2 font-Medium flex justify-center items-center rounded-[8px] border border-Secondary2"
        >
          مشاهده فاکتور
        </button>
      </div>
      <p className="text-center w-full text-Secondary font-Regular">
        {survayDescription}
      </p>
      <InvoiceModalDetail
        setOpen={setOpen}
        open={open}
        loadingInvoice={false}
      />
    </div>
  );
};

export default SurvayHeader;
