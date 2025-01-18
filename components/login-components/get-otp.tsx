import useInterval from "@/hooks/useTimer";
import { onLoginWithOtp, onLoginWithOtpByInvoiceID } from "@/utils/authService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "antd";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { useNotify } from "../notife/notife";
import { LoadingOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
interface GetOtpCodeComponentProps {
  onGetOtpCode: (phone: string) => void;
  setActiveStep: Dispatch<SetStateAction<number>>;
  phone: string;
  loadingResend: boolean;
  isWithInvoiceId: boolean;
  handleSendOtpByInvoiceId: () => Promise<void>;
  invoiceId: string;
}

const GetOtpCodeComponent: React.FC<GetOtpCodeComponentProps> = ({
  onGetOtpCode,
  phone,
  setActiveStep,
  loadingResend,
  isWithInvoiceId,
  handleSendOtpByInvoiceId,
  invoiceId,
}) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(120);
  const [active, setActive] = useState(true);
  const { notify } = useNotify();
  const navigate = useRouter();
  // Update the timer every second if active
  useInterval(() => setSeconds((prev) => Math.max(prev - 1, 0)), 1000, active);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (value.length === 4) {
      handleValidateOtp(value); // Automatically validate when OTP is 4 digits
    }
  };

  const handleResendClick = () => {
    if (seconds === 0) {
      setOtp("");
      onGetOtpCode(phone);
      setSeconds(120); // Reset timer
      setActive(true); // Reactivate the timer
    }
  };

  const formatTime = (time: number) => {
    const minutes = `0${Math.floor(time / 60)}`.slice(-2);
    const seconds = `0${time % 60}`.slice(-2);
    return `${minutes}:${seconds}`;
  };

  const handleValidateOtp = async (otp: string) => {
    setLoading(true);
    try {
      const response = isWithInvoiceId
        ? await onLoginWithOtpByInvoiceID({ invoiceId: invoiceId, otp })
        : await onLoginWithOtp({ mobile: phone, otp });
      if (response.status) {
        notify("success", response.statusMessage);
        Cookies.set("token", "access", {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        if (isWithInvoiceId) {
          navigate.push(`/?invoiceId=${invoiceId}`); // Include backUrl as a query parameter
        } else {
          navigate.push("/"); // Default navigation
        } // Proceed to the next step
      } else {
        notify("error", response.statusMessage || "کد تایید نادرست است");
      }
    } catch (error) {
      notify("error", "در ارسال کد تایید خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-max flex flex-col items-center gap-4 pt-4">
      {/* OTP Input */}
      <Input.OTP
        length={4}
        value={otp}
        onChange={(value) => handleOtpChange(value)}
        className="mt-4 !font-Medium"
        size="large"
        autoFocus
        dir="ltr"
        inputMode="numeric"
        disabled={loading || loadingResend}
      />

      {/* Resend Timer and Actions */}
      <div className="w-full flex items-center justify-between">
        <p className="flex items-center gap-4 mt-4">
          <button
            role="button"
            className={clsx(
              seconds === 0
                ? "text-cta"
                : "text-cta-hover cursor-not-allowed opacity-70",
              "flex items-center gap-2"
            )}
            disabled={loadingResend || seconds > 0}
            onClick={() =>
              isWithInvoiceId ? handleSendOtpByInvoiceId() : handleResendClick()
            }
          >
            ارسال مجدد
            {loadingResend && <LoadingOutlined />}
          </button>
          <span
            dir="ltr"
            className={clsx(
              seconds === 0 && "!text-Alert",
              "w-10 text-Secondary2"
            )}
          >
            {formatTime(seconds)}
          </span>
        </p>
        {!isWithInvoiceId && (
          <p>
            <span
              className="regular-18 text-cta flex items-center gap-2 cursor-pointer"
              onClick={() => setActiveStep(0)}
            >
              <span>ویرایش شماره</span>
              <Icon
                icon="lets-icons:edit-light"
                width="1.3rem"
                className="text-cta"
              />
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default GetOtpCodeComponent;
