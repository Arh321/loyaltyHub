import { IHttpResult } from "@/types/http-result";
import { IProfileInfo, IUpdateProfilePayload } from "@/types/profile";
import axiosInstance, { controlers } from "./apiConfig";
import { AxiosError } from "axios";

const getProfile = async (): Promise<IHttpResult<IProfileInfo>> => {
  try {
    const response = await axiosInstance.get<IHttpResult<IProfileInfo>>(
      `${controlers.EndUser}/GetProfile`,
      { headers: { auth: true } }
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error(
      "Failed to send OTP. Please check the mobile number and try again."
    );
  }
};
const updateProfile = async (
  payload: IUpdateProfilePayload
): Promise<IHttpResult<IProfileInfo>> => {
  try {
    const response = await axiosInstance.post<IHttpResult<IProfileInfo>>(
      `${controlers.EndUser}/UpdateProfile`,
      payload,
      { headers: { auth: true } }
    );
    return response.data; // ✅ Return the successful response data
  } catch (error) {
    console.error("Error updating profile:", error);

    // ✅ Return a structured error response
    return {
      error: error.response.error,
      resultMessage: "",
      status: false,
      statusMessage: "",
      errors: error.response?.data.errors || "خطا در بروزرسانی پروفایل",
      result: null,
      statusCode: error.response?.status || 500,
    };
  }
};

export { getProfile, updateProfile };
