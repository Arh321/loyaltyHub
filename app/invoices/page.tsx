"use client";
import InvoicesListContainer from "@/components/invoice-page/invoices-list/invoices-list-container";
import SortInvoiceListItems from "@/components/invoice-page/invoices-list/sort-invoice-list";
import PagesContainer from "@/components/pages-container/pages-container";
import { IInvoice } from "@/types/invoice";
import { useState } from "react";

const invoices = [
  {
    factorID: 2849584,
    cusDepName: "سجاد",
    salePrice: 42546000,
    cusSaleDate: "1403/07/24 23:11",
    hasSurvey: true,
    isComplete: false,
    transactionID: "1035564",
  },
  {
    factorID: 2849585,
    cusDepName: "توحید",
    salePrice: 38900000,
    cusSaleDate: "1403/07/23 18:45",
    hasSurvey: false,
    isComplete: true,
    transactionID: "1035565",
  },
  {
    factorID: 2849586,
    cusDepName: "وکیل آباد",
    salePrice: 52230000,
    cusSaleDate: "1403/07/22 10:30",
    hasSurvey: true,
    isComplete: false,
    transactionID: "1035566",
  },
  {
    factorID: 2849587,
    cusDepName: "علی",
    salePrice: 67250000,
    cusSaleDate: "1403/07/25 20:20",
    hasSurvey: true,
    isComplete: true,
    transactionID: "1035567",
  },
  {
    factorID: 2849588,
    cusDepName: "فاطمه",
    salePrice: 31000000,
    cusSaleDate: "1403/07/26 09:15",
    hasSurvey: false,
    isComplete: false,
    transactionID: "1035568",
  },
  {
    factorID: 2849589,
    cusDepName: "مهدی",
    salePrice: 44000000,
    cusSaleDate: "1403/07/27 14:50",
    hasSurvey: true,
    isComplete: true,
    transactionID: "1035569",
  },
  {
    factorID: 2849590,
    cusDepName: "نرگس",
    salePrice: 78000000,
    cusSaleDate: "1403/07/28 16:40",
    hasSurvey: false,
    isComplete: true,
    transactionID: "1035570",
  },
  {
    factorID: 2849591,
    cusDepName: "حسین",
    salePrice: 66000000,
    cusSaleDate: "1403/07/29 12:25",
    hasSurvey: true,
    isComplete: false,
    transactionID: "1035571",
  },
  {
    factorID: 2849592,
    cusDepName: "لیلا",
    salePrice: 49000000,
    cusSaleDate: "1403/07/30 11:15",
    hasSurvey: true,
    isComplete: true,
    transactionID: "1035572",
  },
  {
    factorID: 2849593,
    cusDepName: "رضا",
    salePrice: 87000000,
    cusSaleDate: "1403/08/01 19:05",
    hasSurvey: false,
    isComplete: false,
    transactionID: "1035573",
  },
];

export default function InvoicesPAge() {
  const [data, setData] = useState<IInvoice[]>(invoices);
  return (
    <PagesContainer>
      <div className="w-full z-10  sticky top-0">
        <div className="w-full flex items-center justify-center border-gradient-secondary border-b text-Secondary2 font-Medium text-xl py-4  overflow-hidden">
          فاکتورهای من
          <SortInvoiceListItems
            data={data}
            setData={setData}
            initialData={invoices}
          />
        </div>
      </div>
      <div className="w-full h-[80dvh] flex flex-col custome-scrool-bar overflow-y-auto gap-4 pt-4 sm:px-6 lsm:px-8 pb-[100px]">
        <InvoicesListContainer data={data} />
      </div>
    </PagesContainer>
  );
}
