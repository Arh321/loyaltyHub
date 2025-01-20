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
import InvoiceDetailHeader from "./invoice-detail-components/invoice-detail-header";
import InvoiceDetailSummary from "./invoice-detail-components/invoice-detail-summeries";
import InvoiceDetailItemsTable from "./invoice-detail-components/invoice-detail-table";
import InvoiceDetailsFooter from "./invoice-detail-components/invoice-detail-footer";
type InvoiceIdPageProps = {
  transactionID?: string;

  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  showServayButton: boolean;
  loadingInvoice?: boolean;
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
  loadingInvoice,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const { info } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );

  useEffect(() => {
    setLoading(!!loadingInvoice);
  }, [!!loadingInvoice]);

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
      <InvoiceDetailHeader
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

const InvoiceDetails: React.FC<{
  invoice: IInvoiceDetail;
  info: IValidateUser;
}> = ({ invoice, info }) => (
  <div className="flex flex-col justify-between text-xs font-Light bg-Highlighter ">
    <div id="testId">
      <InvoiceDetailSummary
        transactionID={invoice.factorID}
        saleDate={invoice.cusSaleDate}
        departmentName={invoice.cusDepName}
        info={info}
      />

      <InvoiceDetailItemsTable items={invoice.factorDetail} />
      <InvoiceDetailsFooter
        salePrice={invoice.salePrice}
        finalPrice={invoice.finallyFactorPrice}
        factorID={invoice.factorID}
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
    <InvoiceDetailHeader
      onClose={onClose}
      downloadPdf={downloadPdf}
      print={print}
    />
    <NotFoundComponent
      title="فاکتور خریدی یافت نشد"
      image={logo as StaticImageData}
    />
  </div>
);

export default InvoiceIdPage;
