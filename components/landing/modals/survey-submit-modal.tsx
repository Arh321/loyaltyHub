"use client";
import { Modal } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import starGroupImage from "@/publicimages/Group 366323.webp";
import Image from "next/image";
import TextArea from "antd/es/input/TextArea";
import style from "@/styles/ant-custom-styles.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { useNotify } from "@/components/notife/notife";
import { IConfirmSurveyPoints } from "@/types/survet-types";
import { applyCompletedSurveyInvoice } from "@/utils/surveyService";

interface SurveySubmitModalProps {
  paramsData: {
    average: string;
    survey: string;
    invoiceId: string;
    surveyId: string;
  };
}

const SurveySubmitModal: React.FC<SurveySubmitModalProps> = ({
  paramsData,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useRouter();
  const [opinion, setOpinion] = useState("");
  // Memoized values for average and survey
  const { average, survey, invoiceId, surveyId } = paramsData;
  const { notify } = useNotify();

  const showModal = () => {
    setOpen(true);
  };

  const onApplyPoints = async () => {
    setLoading(true);
    const payload: IConfirmSurveyPoints = {
      additionalOpinion: opinion,
      invoiceId: invoiceId,
      surveyId: +surveyId,
    };
    try {
      const response = await applyCompletedSurveyInvoice(payload);
      if (response.status) {
        notify("success", response.statusMessage);
        setOpen(false);
        navigate.push("/");
      } else {
        notify("error", response.statusMessage || "خطا در ثبت پاسخ");
      }
    } catch (error) {
      notify("error", "خطا در ثبت پاسخ");
    } finally {
    }
    setLoading(false);
  };

  const handleOk = () => {
    onApplyPoints();
  };

  const handleCancel = () => {
    onApplyPoints();
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
      }}
      classNames={{
        wrapper: style["survey-modal-wrapper"],

        header: "w-full text-center font-Medium !bg-transparent",
        content: style["modal-close-button"] + " !px-[23px] !bg-BG ",
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
      <div className="py-[18px] w-full flex flex-col gap-[18px]">
        <p className="w-full text-center text-Primary font-Regular text-lg">
          نظر شما مستقیما باعث بهبود عملکرد فروشگاه میشود
        </p>
        <div className="w-full flex items-center justify-center">
          <Image src={starGroupImage} alt="" className="w-[176px]" />
        </div>
        <p className="w-full text-center text-Secondary font-Regular text-lg px-[11px]">
          شما همچنین میتوانید انتقادات یا پیشنهادات خود را در کادر زیر بنویسید.
        </p>
        <TextArea
          rows={4}
          autoFocus={true}
          autoSize={true}
          onChange={(e) => setOpinion(e.target.value)}
          disabled={loading}
          placeholder="دیدگاه خود را اینجا بنویسید..."
          maxLength={200}
          className="!h-[100px] disabled:!opacity-70 !font-Medium placeholder:text-Secondary text-Primary placeholder:font-Regular !shadow-none !border-Highlighter focus:!border-Secondary2"
        />
      </div>
    </Modal>
  );
};

export default SurveySubmitModal;
