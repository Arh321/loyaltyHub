"use client";
import PagesContainer from "@/components/pages-container/pages-container";
import "../../components/login-components/get-phone-styles.css";
import useLoginHandlers from "@/hooks/useLogin";
import {
  MemoizedLoginHeaderLAzy,
  MemoizedLoginStepsContainerLAzy,
} from "./login-components-index";

const LoginPageContainer = () => {
  const {
    activeStep,
    handleSendOtp,
    handleSendOtpByInvoiceId,
    otpError,
    otpLoading,
    setActiveStep,
    phone,
    backUrl,
    setPhone,
  } = useLoginHandlers();

  return (
    <PagesContainer>
      <div dir="rtl" className="w-full h-full font-Medium p-8">
        {/* Header Section */}
        <MemoizedLoginHeaderLAzy
          activeStep={activeStep}
          phone={phone}
          backUrl={backUrl}
        />

        {/* Step Components */}
        <MemoizedLoginStepsContainerLAzy
          activeStep={activeStep}
          handleSendOtp={handleSendOtp}
          handleSendOtpByInvoiceId={handleSendOtpByInvoiceId}
          otpError={otpError}
          otpLoading={otpLoading}
          phone={phone}
          setActiveStep={setActiveStep}
          setPhone={setPhone}
          backUrl={backUrl}
        />
      </div>
    </PagesContainer>
  );
};

export default LoginPageContainer;
