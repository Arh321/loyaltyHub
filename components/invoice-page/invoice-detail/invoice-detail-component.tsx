"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Link from "next/link";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "jalali-moment";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import NotFoundComponent from "@/components/not-found-page/not-found-component";
import { RootState } from "@/redux/store";
import { ProfileSliceType } from "@/redux/profile/profileSlice";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { FactorDetail, IInvoiceDetail } from "@/types/invoice";
import Image, { StaticImageData } from "next/image";
import { IValidateUser } from "@/types/profile";
import logo from "@/public/images/hosseiniLogo.png";
type InvoiceIdPageProps = {
  transactionID?: string;

  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  showServayButton: boolean;
};

const invoice: IInvoiceDetail = {
  factorDetail: [
    {
      id: 10193579,
      k_name: "يقه گرد 34767",
      k_Price: 15890000,
      k_Amount: 1,
      kbArcode: null,
      vat: 0,
      reduction: 50,
      finallyPrice: 15890000,
      finallyReduction: 7945000,
      afterReduction: 7945000,
      finallyPriceAfterReduction: 7945000,
      kVatPrice: 0,
    },
  ],
  salePrice: 15890000,
  cusSaleDate: "1403/05/24 23:20",
  cusDepName: "سجاد",
  factorID: 2772429,
  finallyFactorPrice: 7945000,
  finalReductionPrice: 7945000,
  salePriceAfterReduction: 7945000,
};

const InvoiceIdPage: React.FC<InvoiceIdPageProps> = ({
  transactionID,
  onClose,
  showServayButton,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { info } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );

  useEffect(() => {
    setError(false);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const downloadPdfDocument = () => {
    const input = document.getElementById("testId");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.setFontSize(40);
        pdf.addImage(imgData, "JPEG", 15, 40, 180, 200);
        pdf.save("download.pdf");
      });
    }
  };

  const print = () => window.print();

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        onClose={onClose}
        downloadPdf={downloadPdfDocument}
        print={print}
      />
    );
  }

  return (
    <div
      dir="rtl"
      className="w-full flex flex-col h-full overflow-hidden animate-fadeIn bg-Highlighter p-1 rounded-lg"
    >
      <Header
        transactionID={transactionID}
        onClose={onClose}
        downloadPdf={downloadPdfDocument}
        print={print}
      />
      <InvoiceDetails invoice={invoice} info={info} />
      {showServayButton && <SurveyButton />}
    </div>
  );
};

const Header: React.FC<{
  transactionID?: string;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  downloadPdf: () => void;
  print: () => void;
}> = ({ onClose, downloadPdf, print }) => (
  <div className="flex justify-between px-2 items-center py-2 text-lg font-Light ">
    <span>رسید فاکتور</span>
    <div className="flex gap-8 items-center">
      <button onClick={print}>
        <PrinterOutlined />
      </button>
      <button onClick={downloadPdf}>
        <DownloadOutlined />
      </button>
      {!!onClose && (
        <button onClick={() => onClose(false)}>
          <i role="button" className="pi pi-times"></i>
        </button>
      )}
    </div>
  </div>
);

const InvoiceDetails: React.FC<{
  invoice: IInvoiceDetail;
  info: IValidateUser;
}> = ({ invoice, info }) => (
  <div className="flex flex-col justify-between text-xs font-Light bg-Highlighter ">
    <div id="testId">
      <InvoiceSummary
        transactionID={invoice.factorID}
        saleDate={invoice.cusSaleDate}
        departmentName={invoice.cusDepName}
        info={info}
      />

      <InvoiceItemsTable items={invoice.factorDetail} />
      <InvoiceTotals
        salePrice={invoice.salePrice}
        finalPrice={invoice.finallyFactorPrice}
        factorID={invoice.factorID}
      />
    </div>
  </div>
);

const InvoiceSummary: React.FC<{
  transactionID: number;
  saleDate: string;
  departmentName: string;
  info: IValidateUser;
}> = ({ transactionID, saleDate, departmentName, info }) => (
  <div className="bg-Highlighter">
    <div className="border font-Medium bg-Secondary2 px-2 py-1 text-base text-Highlighter text-highlighter text-center">
      مشخصات فاکتور
    </div>

    <div className="px-2">
      <span className="flex border-b justify-between p-2 bg-highlighter">
        <span className="text-sm">#{transactionID}</span>
        <span className="text-sm">
          {moment(saleDate).locale("fa").format("YYYY/MM/DD - HH:mm")}
        </span>
      </span>
    </div>
    <div className="font-Regular grid grid-cols-4 gap-1 items-center px-2 py-1">
      <span className="col-span-1 font-Regular bg-highlighter">فروشنده</span>
      <div className="col-span-3 flex gap-2 bg-highlighter items-center">
        <div className="flex items-center gap-2 pl-2 border-l-2 border-Secondary">
          <Image className="w-[50px]" src={logo} alt="" />
          <span>آجیل حسینی</span>
        </div>
        <span>{departmentName}</span>
      </div>
    </div>
    <div className="grid grid-cols-4 text-primary gap-1 px-2 py-1 ">
      <span className="col-span-1 font-Regular bg-highlighter flex items-center">
        خریدار
      </span>
      <div className="col-span-3 text-sm flex items-center  justify-between p-2 bg-highlighter">
        <span className="flex items-center gap-1 font-Medium text-Primary">
          {info.firstName} {info.lastName}
        </span>
        <span className="font-Regular">{info.mobile}</span>
      </div>
    </div>
  </div>
);

const InvoiceItemsTable: React.FC<{
  items: IInvoiceDetail["factorDetail"];
}> = ({ items }) => (
  <div className="w-full border-collapse font-Regular flex flex-col">
    <div className="border font-Medium bg-Secondary2 px-2 py-1 text-base text-Highlighter text-highlighter text-center">
      مشخصات فاکتور
    </div>
    <div className="font-bold w-full flex ">
      <div className="font-bold bg-Highlighter w-full p-1 flex border-b border-Secondary2">
        <div className="w-2/5 px-2 py-1 h-full border-l border-highlighter">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[10px]">نام کالا</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[10px]">بارکد کالا</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 h-full border-l border-highlighter">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[10px]">تعداد</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[10px]">%تخفیف</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 h-full border-l border-highlighter">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[10px]">قیمت</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[10px]">پس از تخفیف</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 h-full">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[10px]">مبلغ نهایی</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[10px]">مبلغ تخفیف</span>
          </p>
        </div>
      </div>
    </div>
    <div className="w-full ">
      {items.map((item, index) => (
        <RowOfFactorDetail key={index} item={item} />
      ))}
    </div>
  </div>
);

const InvoiceTotals: React.FC<{
  salePrice: number;
  finalPrice: number;
  factorID: number;
}> = ({ finalPrice, salePrice, factorID }) => (
  <div className=" bg-Highlighter flex flex-col py-2 px-2">
    <div className="w-full flex items-center justify-between px-4 py-2 bg-highlighter mb-2 border-b border-[#e2e2e2]">
      <span className="text-[16px] font-Bold">مبلغ فاکتور</span>
      <div className="flex gap-2 justify-between items-center w-1/4">
        <span className="font-Bold text-[16px]">
          {numberToPersianPrice(salePrice)}
        </span>
        <span className="text-[10px] font-Bold">تومان</span>
      </div>
    </div>
    <div className="w-full flex items-center justify-between px-4 py-2 bg-highlighter mb-2 border-b border-[#e2e2e2]">
      <span className="text-[16px] font-Bold">مبلغ کل خرید</span>
      <div className="flex gap-2 justify-between items-center w-1/4">
        <span className="font-Bold text-[16px]">
          {numberToPersianPrice(finalPrice)}
        </span>
        <span className="text-[10px] font-Bold">تومان</span>
      </div>
    </div>
    <div className="w-full flex flex-col items-center mt-6 gap-2">
      <Image
        alt={factorID.toString()}
        src={`https://barcode.tec-it.com/barcode.ashx?data=${factorID}&code=Code25IL&multiplebarcodes=true&translate-esc=on`}
        className="h-[5opx] w-[160px] animate-fadeIn"
        width={200}
        height={50}
      />
    </div>
  </div>
);

const SurveyButton: React.FC = () => (
  <Link
    href="/survey"
    className=" py-3 flex justify-center rounded-md bg-Secondary2 text-Highlighter hover:!text-Highlighter w-2/3 mx-auto text-highlighter font-Bold"
  >
    ثبت نظر برای این فاکتور
  </Link>
);

const ErrorState: React.FC<{
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  downloadPdf: () => void;
  print: () => void;
}> = ({ onClose, downloadPdf, print }) => (
  <div
    dir="rtl"
    className="w-full flex flex-col h-full overflow-hidden animate-fadeIn"
  >
    <Header onClose={onClose} downloadPdf={downloadPdf} print={print} />
    <NotFoundComponent
      title="فاکتور خریدی یافت نشد"
      image={logo as StaticImageData}
    />
  </div>
);

export default InvoiceIdPage;

const RowOfFactorDetail = ({ item }: { item: FactorDetail }) => {
  return (
    <div className="font-bold bg-Highlighter w-full p-1 flex border-b border-Secondary2">
      <div className="w-2/5 px-2 py-1 h-full border-l border-highlighter">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[10px]">{item.k_name}</span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[10px]">
            {item.kbArcode ? item.kbArcode : "---"}
          </span>
        </p>
      </div>
      <div className="w-1/5 px-2 py-1 h-full border-l border-highlighter">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[10px]">{item.k_Amount}</span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[10px]">{item.reduction}</span>
        </p>
      </div>
      <div className="w-1/5 px-2 py-1 h-full border-l border-highlighter">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[10px]">
            {numberToPersianPrice(item.k_Price)}
          </span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[10px]">
            {numberToPersianPrice(item.afterReduction)}
          </span>
        </p>
      </div>
      <div className="w-1/5 px-2 py-1 h-full">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[10px]">
            {numberToPersianPrice(item.finallyPrice)}
          </span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[10px]"> {item.finallyReduction}</span>
        </p>
      </div>
    </div>
  );
};
