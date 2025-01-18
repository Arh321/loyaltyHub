"use client";
import React, { useEffect } from "react";
import "./get-phone-styles.css";
interface SendOtpByInvoiceProps {
  handleSendOtpByInvoiceId: () => Promise<void>;
  loading: boolean;
}

const SendOtpByInvoice: React.FC<SendOtpByInvoiceProps> = ({
  handleSendOtpByInvoiceId,
  loading,
}) => {
  useEffect(() => {
    handleSendOtpByInvoiceId();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 items-center mt-12">
      <span className="w-full text-center whitespace-nowrap text-Secondary2 font-Medium">
        در حال ارسال کد تایید به سر شماره فاکتور
      </span>
      <div className="relative">
        <span className="loader-otp !text-Secondary2"></span>
      </div>
    </div>
  );
};
export default SendOtpByInvoice;
