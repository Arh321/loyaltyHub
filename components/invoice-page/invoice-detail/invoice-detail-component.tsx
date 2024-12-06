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
import { IInvoiceDetail } from "@/types/invoice";
import Image from "next/image";
import { IValidateUser } from "@/types/profile";
import logo from "@/public/images/hosseiniLogo.png";
type InvoiceIdPageProps = {
  transactionID?: string;
  customerKey: string;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  showServayButton: boolean;
};

const invoice: IInvoiceDetail = {
  factorDetail: [
    {
      id: 1,
      k_name: "Smartphone",
      k_Price: 1200,
      k_Amount: 2,
      kbArcode: "123456789012",
      vat: 10,
      reduction: 100,
      finallyPrice: 2300, // (k_Price * k_Amount) + vat - reduction
      finallyReduction: 200, // Total reduction for this item
      afterReduction: 2200, // Final price after reductions
    },
    {
      id: 2,
      k_name: "Headphones",
      k_Price: 200,
      k_Amount: 1,
      kbArcode: "987654321098",
      vat: 5,
      reduction: 20,
      finallyPrice: 185,
      finallyReduction: 20,
      afterReduction: 180,
    },
    {
      id: 3,
      k_name: "Laptop",
      k_Price: 1500,
      k_Amount: 1,
      kbArcode: "456789123456",
      vat: 50,
      reduction: 100,
      finallyPrice: 1450,
      finallyReduction: 100,
      afterReduction: 1400,
    },
  ],
  salePrice: 5000, // Sum of final prices before reductions
  cusSaleDate: "2024-12-05",
  cusDepName: "Electronics Department",
  factorID: 1001,
  finallyFactorPrice: 3835, // Total final price after all reductions
};

const InvoiceIdPage: React.FC<InvoiceIdPageProps> = ({
  transactionID,
  customerKey,
  onClose,
  showServayButton,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { info } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );

  useEffect(() => {
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
      className="w-full flex flex-col h-full overflow-hidden animate-fadeIn"
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
  <div className="flex justify-between px-2 items-center py-3 light-12">
    <span>رسید فاکتور</span>
    <div className="flex gap-8 items-center">
      <button onClick={print}>
        <PrinterOutlined />
      </button>
      <button onClick={downloadPdf}>
        <DownloadOutlined />
      </button>
      {onClose && (
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
  <div className="flex flex-col justify-between text-xs light-12">
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
  <div>
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
      <span className="col-span-1 regular-14 bg-highlighter">فروشنده</span>
      <div className="col-span-3 flex gap-2 bg-highlighter items-center">
        <div className="flex items-center gap-2 pl-2 border-l-2 border-Secondary">
          <Image className="w-[50px]" src={logo} alt="" />
          <span>آجیل حسینی</span>
        </div>
        <span>{departmentName}</span>
      </div>
    </div>
    <div className="grid grid-cols-4 text-primary gap-1 px-2 py-1 border-b">
      <span className="col-span-1 regular-14 bg-highlighter flex items-center">
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
  <table className="w-full border-collapse border-y border-highlighter font-Regular">
    <div className="w-full p-1 flex items-center">
      <div className="font-bold bg-Highlighter w-full flex items-center">
        <div className="w-2/5 px-2 py-1 border-l border-highlighter">
          <p className="flex flex-col gap-2">
            <span className="text-[10px]">نام کالا</span>
            <span className="border-b border-tertiary px-2"></span>
            <span className="text-[10px]">بارکد کالا</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 border-l border-highlighter">
          <p className="flex flex-col gap-2">
            <span className="text-[10px]">تعداد</span>
            <span className="border-b border-tertiary px-2"></span>
            <span className="text-[10px]">%تخفیف</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 border-l border-highlighter">
          <p className="flex flex-col gap-2">
            <span className="text-[10px]">قیمت</span>
            <span className="border-b border-tertiary px-2"></span>
            <span className="text-[10px]">پس از تخفیف</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 border-l border-highlighter">
          <p className="flex flex-col gap-2">
            <span className="text-[10px]">مبلغ نهایی</span>
            <span className="border-b border-tertiary px-2"></span>
            <span className="text-[10px]">مبلغ تخفیف</span>
          </p>
        </div>
      </div>
    </div>
    <div className="w-full p-1">
      {items.map((item, index) => (
        <div key={index} className="font-bold bg-Highlighter w-full my-1 flex">
          <div className="w-2/5 px-2 py-1 border-l-4 border-BG align-middle">
            <div className="flex flex-col justify-center h-full gap-1">
              <span className="text-xs text-center">{item.k_name}</span>
              <span className="border-b border-tertiary mx-auto w-full "></span>
              <span className="text-xs text-center">
                {item.kbArcode ? item.kbArcode : "---"}
              </span>
            </div>
          </div>
          <div className="w-1/5 px-2 py-1 border-l-4 border-BG align-bottom ">
            <div className="flex flex-col justify-center h-full gap-1">
              <span className="text-xs text-center">{item.k_Amount}</span>
              <span className="border-b border-tertiary mx-auto w-full"></span>
              <span className="text-xs text-center">{item.reduction}</span>
            </div>
          </div>
          <div className="w-1/5 px-2 py-1 border-l-4 border-BG align-bottom">
            <div className="flex flex-col justify-center h-full gap-1">
              <span className="text-xs text-center">
                {numberToPersianPrice(item.k_Price)}
              </span>
              <span className="border-b border-tertiary mx-auto w-full"></span>
              <span className="text-xs text-center">
                {numberToPersianPrice(item.afterReduction)}
              </span>
            </div>
          </div>
          <div className="w-1/5 px-2 py-1  align-bottom">
            <div className="flex flex-col justify-end h-full  gap-1">
              <span className="text-xs text-center">
                {numberToPersianPrice(item.finallyPrice)}
              </span>
              <span className="border-b border-tertiary mx-auto w-full"></span>
              <span className="text-xs text-center">
                {item.finallyReduction}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </table>
);

const InvoiceTotals: React.FC<{
  salePrice: number;
  finalPrice: number;
}> = () => <div>{/* Totals */}</div>;

const SurveyButton: React.FC = () => (
  <Link
    href="/survey/2/1/1019700/1011598"
    className="w-full py-3 flex justify-center font-Regular rounded-md bg-CTA text-highlighter bold-14"
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
    <NotFoundComponent title="فاکتور خریدی یافت نشد" image={logo} />
  </div>
);

export default InvoiceIdPage;
