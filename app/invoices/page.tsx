"use client";

import InvoicesListContainer from "@/components/invoice-page/invoices-list/invoices-list-container";
import SortInvoiceListItems from "@/components/invoice-page/invoices-list/sort-invoice-list";
import PagesContainer from "@/components/pages-container/pages-container";
import { IInvoice } from "@/types/invoice";
import { getAllInvoices } from "@/utils/invoiceService";
import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";

export default function InvoicesPAge() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<IInvoice[]>([]);
  const onGetAllInvoices = async () => {
    setLoading(true);

    try {
      const response = await getAllInvoices({ page: 1, size: 10 });

      if (response.status) {
        setData(() => response.result.data);
      } else {
        //  notify("error", response.statusMessage || "خطا در دریافت فاکتور");
        setError(true);
      }
    } catch (error) {
      //  notify("error", "خطا در دریافت فاکتور");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetAllInvoices();
  }, []);

  if (loading || !data)
    return (
      <PagesContainer>
        <div className="w-full h-[80dvh] flex flex-col gap-[12px] custome-scrool-bar overflow-y-auto pt-4 sm:px-6 lsm:px-8 pb-[100px]">
          {Array.from({ length: 8 }).map((_, index) => {
            return (
              <Skeleton.Node
                key={index}
                className="!flex !w-full !h-full aspect-[16/5] rounded-[10px]"
                active
              />
            );
          })}
        </div>
      </PagesContainer>
    );

  return (
    <PagesContainer>
      <div className="w-full z-10  sticky top-0">
        <div className="w-full flex items-center justify-center border-gradient-secondary border-b text-Secondary2 font-Medium text-xl py-4  overflow-hidden">
          فاکتورهای من
          <SortInvoiceListItems
            data={data}
            setData={setData}
            initialData={data}
          />
        </div>
      </div>
      <div className="w-full h-[80dvh] flex flex-col custome-scrool-bar overflow-y-auto gap-4 pt-4 sm:px-6 lsm:px-8 pb-[100px]">
        <InvoicesListContainer data={data} />
      </div>
    </PagesContainer>
  );
}
