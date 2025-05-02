import { Alert } from "antd";
import MemoizedCompanyLogoComponent from "../shared-components/company-logo-component";
import { memo } from "react";

interface LoginHeaderProps {
  activeStep: number;
  backUrl?: string;
  phone?: string;
}

const LoginHeader = ({ activeStep, backUrl, phone }: LoginHeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <MemoizedCompanyLogoComponent />
      <div className="w-full flex flex-col items-center text-Secondary2 justify-center gap-4 font-Medium">
        <span className="bold-16">خوش آمدید به باشگاه مشتریان حسینی</span>

        {backUrl && (
          <Alert
            message="برای مشاهده فاکتور می‌بایست احراز شوید"
            type="warning"
            showIcon
            className="!w-full !font-Medium !text-center"
          />
        )}

        {activeStep === 0 && !backUrl && (
          <span className="w-1/2 flex flex-col gap-2 text-tertiary regular-14 text-center">
            برای ادامه شماره خود را وارد نمایید
          </span>
        )}

        {activeStep === 1 && (
          <span
            dir="rtl"
            className="regular-16 w-full flex flex-col justify-center items-center gap-1 mt-2"
          >
            <span>لطفا کد تایید 5 رقمی ارسال شده به شماره همراه</span>
            <span dir="ltr" className="text-cta-focus text-xl">
              {phone}
            </span>
            <span> را وارد نمایید.</span>
          </span>
        )}
      </div>
    </div>
  );
};

const MemoizedLoginHeader = memo(LoginHeader);

export default MemoizedLoginHeader;
