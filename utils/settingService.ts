import { IHttpResult } from "@/types/http-result";
import axiosInstance, { controlers } from "./apiConfig";
import { ICompanySettings } from "@/types/company-setting";

const getAppSettings = async (): Promise<IHttpResult<ICompanySettings>> => {
  try {
    const response = await axiosInstance.get<IHttpResult<ICompanySettings>>(
      `${controlers.Setting}/GetSettings`
    );
    return response.data; // Return only the data part of the response
  } catch (error) {
    return {
      error: error.response.error,
      resultMessage: "",
      status: false,
      statusMessage: "",
      errors: error.response?.data.errors,
      result: null,
      statusCode: error.response?.status || 500,
    };
  }
};

export { getAppSettings };
