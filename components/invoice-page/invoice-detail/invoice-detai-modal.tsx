import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import InvoiceIdPage from "./invoice-detail-component";

interface InvoiceModalDetailProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  showSurveyButton?: boolean;
  loadingInvoice: boolean;
}

const InvoiceModalDetail: React.FC<InvoiceModalDetailProps> = ({
  open,
  setOpen,
  showSurveyButton,
  loadingInvoice,
}) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={!!open}
      title={
        <div className="w-full flex items-center justify-center relative">
          <span>فاکتور</span>
          <CloseOutlined
            className="!text-Alert !absolute top-0 bottom-0 my-auto left-2"
            role="button"
            onClick={() => {
              setOpen(() => !open);
            }}
          />
        </div>
      }
      onCancel={handleCancel}
      style={{
        direction: "rtl",
        width: "95vw !important",
        maxWidth: "450px",
        height: "90dvh",
      }}
      classNames={{
        header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
        content: " !p-2 !bg-BG !h-full",
        footer: "!hidden",
      }}
      closeIcon={false}
      footer={false}
    >
      <InvoiceIdPage
        onClose={setOpen}
        showServayButton={showSurveyButton}
        transactionID="1234567"
        loadingInvoice={!!loadingInvoice}
      />
    </Modal>
  );
};

export default InvoiceModalDetail;
