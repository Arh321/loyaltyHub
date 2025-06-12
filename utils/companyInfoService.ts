import { ICompanyInfo } from "@/types/company-info-type";
import axiosInstance, { controlers } from "./apiConfig";
import { IHttpResult } from "@/types/http-result";

export const getCompanyInfo = async (): Promise<IHttpResult<ICompanyInfo>> => {
  const response = await axiosInstance.get(
    `${controlers.Setting}/GetThemeSettings`
  );

  return response.data;
};
