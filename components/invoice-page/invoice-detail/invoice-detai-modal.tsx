import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import InvoiceIdPage from "./invoice-detail-component";

interface InvoiceModalDetailProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const InvoiceModalDetail: React.FC<InvoiceModalDetailProps> = ({
  open,
  setOpen,
}) => {
  const searchParams = useSearchParams();

  // Memoized values for average and survey
  const { average, survey } = useMemo(() => {
    const avg = searchParams.get("average");
    const srv = searchParams.get("survey");
    return { average: avg, survey: srv };
  }, [searchParams]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (average && survey) {
      showModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal
      open={open}
      title={
        <div className="w-full flex items-center justify-center relative">
          <span>دیدگاه شما ثبت شد</span>
          <CloseOutlined
            className="!text-Alert !absolute top-0 bottom-0 my-auto left-2"
            role="button"
            onClick={() => setOpen(false)}
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
        showServayButton={false}
        transactionID="1234567"
      />
    </Modal>
  );
};

export default InvoiceModalDetail;
