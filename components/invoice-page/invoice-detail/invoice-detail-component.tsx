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
  id: 109,
  sourceId: "81",
  customerId: 2280,
  firstName: "",
  lastName: "",
  phone: "09017522794",
  fullAddress:
    "تهران, ستارخان خيابان شادمان خ خوشرو كوچه سرابي پ ٢ واحد ١, , , , 09124990037",
  purchaseDate: "2024-10-15T23:00:38",
  vat: 0,
  discountPercent: 0,
  discountPrice: 0,
  giftUsedAmount: 0,
  additionalAmount: 85954.489,
  payAmount: 835308,
  detailsDiscount: 34952.34,
  detailsPriceBeforeDiscount: 729023.6,
  detailsPriceAfterDiscount: 694071.26,
  discountUsedAmount: 0,
  totalPriceAfterDiscount: 694071.26,
  totalPrice: 694071.26,
  vatPrice: 55282.251,
  finalPrice: 749353.511,
  body: [
    {
      id: 190,
      sourceId: "201",
      productName: "لیمو فلفلی 105 گرم پت",
      productCode: "5022410008",
      fee: 47000,
      quantity: 1,
      discountPercent: 0,
      discountPrice: 0,
      vat: 10,
      vatPrice: 4700,
      priceOfDiscounts: 0,
      priceBeforeDiscount: 47000,
      priceAfterDiscount: 47000,
      finalPrice: 51700,
    },
    {
      id: 191,
      sourceId: "202",
      productName: "فلفل قرمز 80 گرم پت",
      productCode: "5020610016",
      fee: 39563.25,
      quantity: 1,
      discountPercent: 15,
      discountPrice: 0,
      vat: 10,
      vatPrice: 3362.87625,
      priceOfDiscounts: 5934.4875,
      priceBeforeDiscount: 39563.25,
      priceAfterDiscount: 33628.7625,
      finalPrice: 36991.63875,
    },
    {
      id: 192,
      sourceId: "203",
      productName: "زردچوبه 500 گرم پت",
      productCode: "5020310018",
      fee: 205000,
      quantity: 1,
      discountPercent: 0,
      discountPrice: 0,
      vat: 10,
      vatPrice: 20500,
      priceOfDiscounts: 0,
      priceBeforeDiscount: 205000,
      priceAfterDiscount: 205000,
      finalPrice: 225500,
    },
    {
      id: 193,
      sourceId: "204",
      productName: "زیره سیاه 100 گرم پاکتی",
      productCode: "5020410005",
      fee: 166175,
      quantity: 1,
      discountPercent: 15,
      discountPrice: 0,
      vat: 0,
      vatPrice: 0,
      priceOfDiscounts: 24926.25,
      priceBeforeDiscount: 166175,
      priceAfterDiscount: 141248.75,
      finalPrice: 141248.75,
    },
    {
      id: 194,
      sourceId: "205",
      productName: "دارچین 70 گرم پت",
      productCode: "5020210015",
      fee: 37550,
      quantity: 2,
      discountPercent: 0,
      discountPrice: 0,
      vat: 10,
      vatPrice: 7510,
      priceOfDiscounts: 0,
      priceBeforeDiscount: 75100,
      priceAfterDiscount: 75100,
      finalPrice: 82610,
    },
    {
      id: 195,
      sourceId: "206",
      productName: "ادویه مرغ 60 گرم پت",
      productCode: "5021110014",
      fee: 30909,
      quantity: 1,
      discountPercent: 0,
      discountPrice: 0,
      vat: 10,
      vatPrice: 3090.9,
      priceOfDiscounts: 0,
      priceBeforeDiscount: 30909,
      priceAfterDiscount: 30909,
      finalPrice: 33999.9,
    },
    {
      id: 196,
      sourceId: "207",
      productName: "ادویه کاری 65 گرم پت",
      productCode: "5021510016",
      fee: 27277.35,
      quantity: 1,
      discountPercent: 15,
      discountPrice: 0,
      vat: 10,
      vatPrice: 2318.57475,
      priceOfDiscounts: 4091.6025,
      priceBeforeDiscount: 27277.35,
      priceAfterDiscount: 23185.7475,
      finalPrice: 25504.32225,
    },
    {
      id: 197,
      sourceId: "208",
      productName: "ادویه خورشی 60 گرم پت",
      productCode: "5021410013",
      fee: 30909,
      quantity: 1,
      discountPercent: 0,
      discountPrice: 0,
      vat: 10,
      vatPrice: 3090.9,
      priceOfDiscounts: 0,
      priceBeforeDiscount: 30909,
      priceAfterDiscount: 30909,
      finalPrice: 33999.9,
    },
    {
      id: 198,
      sourceId: "209",
      productName: "پرلیمو 100 گرم پاکتی",
      productCode: "5020810004",
      fee: 64545,
      quantity: 1,
      discountPercent: 0,
      discountPrice: 0,
      vat: 10,
      vatPrice: 6454.5,
      priceOfDiscounts: 0,
      priceBeforeDiscount: 64545,
      priceAfterDiscount: 64545,
      finalPrice: 70999.5,
    },
    {
      id: 199,
      sourceId: "210",
      productName: "چاشنی سالاد 90 گرم پت",
      productCode: "5022910002",
      fee: 42545,
      quantity: 1,
      discountPercent: 0,
      discountPrice: 0,
      vat: 10,
      vatPrice: 4254.5,
      priceOfDiscounts: 0,
      priceBeforeDiscount: 42545,
      priceAfterDiscount: 42545,
      finalPrice: 46799.5,
    },
  ],
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
