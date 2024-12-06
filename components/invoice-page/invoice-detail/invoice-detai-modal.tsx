import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import InvoiceIdPage from "./invoice-detail-component";

interface InvoiceModalDetailProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const InvoiceModalDetail: React.FC<InvoiceModalDetailProps> = ({
  open,
  setOpen,
}) => {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const navigate = useRouter();
  // Memoized values for average and survey
  const { average, survey } = useMemo(() => {
    const avg = searchParams.get("average");
    const srv = searchParams.get("survey");
    return { average: avg, survey: srv };
  }, [searchParams]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      navigate.push("/");
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (average && survey) {
      showModal();
    }
  }, []);
  return (
    <Modal
      open={open}
      title="دیدگاه شما ثبت شد"
      onOk={handleOk}
      onCancel={handleCancel}
      style={{
        direction: "rtl",
        width: "95vw",
        maxWidth: "450px",
        height: "90dvh",
      }}
      classNames={{
        header: "w-full text-center font-Medium !bg-transparent",
        content: " !px-[23px] !bg-BG ",
      }}
      footer={
        <div className="w-full flex justify-center">
          <button
            onClick={handleOk}
            disabled={loading}
            className="font-Bold hover:bg-SecondaryHover disabled:!opacity-50 transition-all text-xl bg-Secondary2 !text-Highlighter p-3 rounded-lg w-[202px]"
          >
            متوجه شدم
            {loading && <LoadingOutlined />}
          </button>
        </div>
      }
    >
      <InvoiceIdPage
        onClose={setOpen}
        showServayButton={true}
        transactionID="1234567"
        customerKey="12345"
      />
    </Modal>
  );
};

export default InvoiceModalDetail;
