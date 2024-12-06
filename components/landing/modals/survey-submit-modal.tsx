"use client";
import { Modal } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import starGroupImage from "@/publicimages/Group 366323.png";
import Image from "next/image";
import TextArea from "antd/es/input/TextArea";
import style from "@/styles/ant-custom-styles.module.css";
import { LoadingOutlined } from "@ant-design/icons";

const SurveySubmitModal = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
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
        width: "95%",
        maxWidth: "450px",
      }}
      classNames={{
        header: "w-full text-center font-Medium !bg-transparent",
        content: style["modal-close-button"] + " !px-[23px] !bg-BG",
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
          disabled={loading}
          placeholder="دیدگاه خود را اینجا بنویسید..."
          maxLength={6}
          className="!h-[100px] disabled:!opacity-70 !font-Medium placeholder:text-Secondary text-Primary placeholder:font-Regular !shadow-none !border-Highlighter focus:!border-Secondary2"
        />
      </div>
    </Modal>
  );
};

export default SurveySubmitModal;
