"use client";

import useAuth from "@/hooks/useAuth";
import { Dispatch, SetStateAction, useEffect } from "react";
import CancelSurveyModal from "./cancel-survey-modal";
import InvoiceModalDetail from "../invoice-page/invoice-detail/invoice-detai-modal";

interface HeaderModalsContainerProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  pathname: string;
}

const HeaderModalsContainer: React.FC<HeaderModalsContainerProps> = ({
  isModalOpen,
  setIsModalOpen,
  pathname,
}) => {
  const {
    invoiceDetail,
    loadingInvoice,
    showInvoice,
    invoiceId,
    setShowInvoice,
  } = useAuth();
  useEffect(() => {
    setShowInvoice(false);
    if (invoiceDetail) {
      setShowInvoice(true);
    }
  }, [pathname, invoiceDetail, setShowInvoice]);
  return (
    <>
      <CancelSurveyModal setOpen={setIsModalOpen} open={isModalOpen} />

      <InvoiceModalDetail
        setOpen={setShowInvoice}
        open={showInvoice}
        loadingInvoice={loadingInvoice}
        invoiceDetail={invoiceDetail}
        transactionID={invoiceId}
      />
    </>
  );
};

export default HeaderModalsContainer;
