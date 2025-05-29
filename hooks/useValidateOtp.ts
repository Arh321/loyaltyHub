import { useNotify } from "@/components/notife/notife";
import { onSetToken } from "@/redux/profile/profileSlice";
import { IHttpResult } from "@/types/http-result";
import {
  IAuthResult,
  onLoginWithOtp,
  onLoginWithOtpByInvoiceID,
} from "@/utils/authService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useValidateOtp = (
  isWithInvoiceId: boolean,
  phone: string,
  invoiceId?: string
) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { notify } = useNotify();

  useEffect(() => {
    navigate.prefetch("/");
  }, []);

  const validateOtpMutation = useMutation<
    IHttpResult<IAuthResult>,
    AxiosError<IHttpResult<unknown>>,
    { otp: string },
    unknown
  >({
    mutationFn: async (data: { otp: string }) => {
      const response = isWithInvoiceId
        ? await onLoginWithOtpByInvoiceID({
            invoiceId: invoiceId,
            otp: data.otp,
          })
        : await onLoginWithOtp({ mobile: phone, otp: data.otp });
      return response;
    },
    onSuccess: (response) => {
      if (response.status) {
        notify("success", response.resultMessage ?? "موفق خوش آمدید");

        dispatch(
          onSetToken({
            expireMinute: response.result.expiresIn,
            token: response.result.token,
          })
        );

        if (isWithInvoiceId) {
          navigate.push(`/?invoiceId=${invoiceId}`);
        } else {
          navigate.push("/");
        }
      } else {
        notify("error", response.statusMessage || "کد تایید نادرست است");
      }
    },
    onError: (error) => {
      notify(
        "error",
        error.response.data.resultMessage ??
          "در ارسال کد تایید خطایی رخ داده است"
      );
    },
  });

  const handleValidateOtp = async (otp: string) => {
    validateOtpMutation.mutate({ otp });
  };

  useEffect(() => {
    navigate.prefetch("/");
  }, []);

  return {
    handleValidateOtp,
    isLoading: validateOtpMutation.isPending,
  };
};

export default useValidateOtp;
