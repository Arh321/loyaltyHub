import useInterval from "@/hooks/useTimer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "antd";
import clsx from "clsx";
import { useState } from "react";

const GetOtpCodeComponent: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(120);
  const [active, setActive] = useState(true);

  // Update the timer every second if active
  useInterval(() => setSeconds((prev) => Math.max(prev - 1, 0)), 1000, active);

  const handleOtpChange = (value: string) => {
    console.log("OTP Changed:", value);
    setOtp(value);
  };

  const handleResendClick = () => {
    if (seconds === 0) {
      console.log("Resend OTP triggered");
      setSeconds(120); // Reset timer
      setActive(true); // Reactivate the timer
    }
  };

  const formatTime = (time: number) => {
    const minutes = `0${Math.floor(time / 60)}`.slice(-2);
    const seconds = `0${time % 60}`.slice(-2);
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="w-full h-max flex flex-col items-center gap-2 pt-4">
      <Input.OTP
        length={4}
        value={otp}
        onChange={(value) => handleOtpChange(value)}
        className="mt-4 !font-Medium"
        size="large"
        autoFocus
        dir="ltr"
        inputMode="numeric"
      />

      <div className="w-full flex items-center justify-between">
        <p className="flex items-center gap-4 mt-4">
          <span
            role="button"
            className={clsx(
              seconds === 0
                ? "text-cta"
                : "text-cta-hover cursor-not-allowed opacity-70",
              "flex items-center gap-2"
            )}
            onClick={handleResendClick}
          >
            ارسال مجدد
          </span>
          <span
            dir="ltr"
            className={clsx(seconds === 0 && "text-alert", "w-10")}
          >
            {formatTime(seconds)}
          </span>
        </p>
        <p>
          <span
            className="regular-18 text-cta flex items-center gap-2 cursor-pointer"
            onClick={() => console.log("Edit phone number")}
          >
            <span>ویرایش شماره</span>
            <Icon
              icon="lets-icons:edit-light"
              width="1.3rem"
              className="text-cta"
            />
          </span>
        </p>
      </div>
    </div>
  );
};

export default GetOtpCodeComponent;
