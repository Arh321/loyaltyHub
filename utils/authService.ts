import { IHttpResult } from "@/types/http-result";
import axiosInstance, { controlers } from "./apiConfig";
import { IProfileInfo } from "@/types/profile";

export interface IAuthResult {
  token: string;
  expiresIn: number;
  tokenType: string;
}

const onGetOtpByPhone = async (payLoad: {
  mobile: string;
}): Promise<IHttpResult<boolean>> => {
  try {
    const response = await axiosInstance.post<IHttpResult<boolean>>(
      `${controlers.Auth}/SendOtp`,
      payLoad
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error(
      "Failed to send OTP. Please check the mobile number and try again."
    );
  }
};

const onGetOtpByInvoiceId = async (payLoad: {
  invoiceId: string;
}): Promise<IHttpResult<string>> => {
  try {
    const response = await axiosInstance.post<IHttpResult<string>>(
      `${controlers.Auth}/SendOtpByInvoice`,
      payLoad
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error(
      "Failed to send OTP. Please check the mobile number and try again."
    );
  }
};

const onLoginWithOtp = async (payLoad: {
  mobile: string;
  otp: string;
}): Promise<IHttpResult<IAuthResult>> => {
  const response = await axiosInstance.post<IHttpResult<IAuthResult>>(
    `${controlers.Auth}/LoginWithOtp`,
    payLoad
  );
  return response.data;
};

const onLoginWithOtpByInvoiceID = async (payLoad: {
  invoiceId: string;
  otp: string;
}): Promise<IHttpResult<IAuthResult>> => {
  const response = await axiosInstance.post<IHttpResult<IAuthResult>>(
    `${controlers.Auth}/LoginWithOtpByInvoice`,
    payLoad
  );
  return response.data;
};

export {
  onGetOtpByPhone,
  onLoginWithOtp,
  onGetOtpByInvoiceId,
  onLoginWithOtpByInvoiceID,
};
