"use client";
import { LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";
import React, { useEffect } from "react";

interface SendOtpByInvoiceProps {
  handleSendOtpByInvoiceId: () => void;
  loading: boolean;
  getOtpError: boolean;
}

const SendOtpByInvoice: React.FC<SendOtpByInvoiceProps> = ({
  handleSendOtpByInvoiceId,
  loading,
  getOtpError,
}) => {
  useEffect(() => {
    handleSendOtpByInvoiceId();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 items-center mt-4">
      <span className="w-full text-center whitespace-nowrap text-Secondary2 font-Medium">
        در حال ارسال کد تایید به سر شماره فاکتور
      </span>
      {loading && (
        <div className="relative">
          <span className="loader-otp !text-Secondary2"></span>
        </div>
      )}
      {getOtpError && (
        <button
          onClick={handleSendOtpByInvoiceId}
          className={clsx(
            "font-Medium bg-Secondary2 animate-fadeIn hover:bg-cta-hover disabled:opacity-70 text-Highlighter py-3 w-2/3 text-lg rounded-lg fixed bottom-8 right-0 left-0 mx-auto max-w-[250px]"
          )}
        >
          دریافت مجدد کد تایید
          {loading && <LoadingOutlined />}
        </button>
      )}
    </div>
  );
};
export default SendOtpByInvoice;
