"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Link from "next/link";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import NotFoundComponent from "@/components/not-found-page/not-found-component";
import { RootState } from "@/redux/store";
import { ProfileSliceType } from "@/redux/profile/profileSlice";

import { IInvoice, IInvoiceDetail, IInvoiceId } from "@/types/invoice";
import { StaticImageData } from "next/image";
import { IProfileInfo } from "@/types/profile";
import logo from "@/public/images/hosseiniLogo.webp";
import InvoiceDetailHeader from "./invoice-detail-components/invoice-detail-header";
import InvoiceDetailSummary from "./invoice-detail-components/invoice-detail-summeries";
import InvoiceDetailItemsTable from "./invoice-detail-components/invoice-detail-table";
import InvoiceDetailsFooter from "./invoice-detail-components/invoice-detail-footer";
import { getInvoiceById } from "@/utils/invoiceService";
type InvoiceIdPageProps = {
  transactionID?: string;
  invoiceDetail?: IInvoiceDetail;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  showServayButton: boolean;
  loadingInvoice?: boolean;
};

const InvoiceIdPage: React.FC<InvoiceIdPageProps> = ({
  transactionID,
  invoiceDetail,
  onClose,
  showServayButton,
  loadingInvoice,
}) => {
  const [invoice, setInvoice] = useState<IInvoiceDetail>(invoiceDetail);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const { info } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );
  const onLoadSearchedInvoice = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await getInvoiceById({ invoiceId: transactionID });

      if (response.status) {
        setInvoice(response.result);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [transactionID, onClose]);

  useEffect(() => {
    onLoadSearchedInvoice();
  }, [transactionID]);

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
        onLoadSearchedInvoice={onLoadSearchedInvoice}
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
  info: IProfileInfo;
}> = ({ invoice, info }) => (
  <div className="flex flex-col justify-between text-xs font-Light bg-Highlighter ">
    <div id="testId">
      <InvoiceDetailSummary
        transactionID={invoice.id}
        saleDate={invoice.purchaseDate}
        departmentName={"سجاد"}
        info={info}
      />

      <div className="max-h-[35dvh] overflow-y-auto custome-scrool-bar">
        <InvoiceDetailItemsTable items={invoice.body} />
      </div>
      <InvoiceDetailsFooter
        salePrice={invoice.totalPrice}
        finalPrice={invoice.totalPriceAfterDiscount}
        factorID={invoice.id}
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
  onLoadSearchedInvoice: () => Promise<void>;
  downloadPdf: () => void;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  print: () => void;
}> = ({ onClose, onLoadSearchedInvoice, downloadPdf, print }) => (
  <div
    dir="rtl"
    className="w-full flex flex-col gap-20 h-[50dvh] overflow-hidden animate-fadeIn"
  >
    <InvoiceDetailHeader
      onClose={onClose}
      downloadPdf={downloadPdf}
      print={print}
    />
    <button
      onClick={() => onLoadSearchedInvoice()}
      className="font-Medium bg-Secondary2 text-Highlighter p-3 text-lg rounded-lg w-max"
    >
      تلاش مجدد
    </button>
  </div>
);

export default InvoiceIdPage;
