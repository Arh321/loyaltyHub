import { IHttpResult } from "@/types/http-result";
import axiosInstance, { controlers } from "./apiConfig";
import {
  IApplySurveyPoint,
  IConfirmSurveyPoints,
  ISurveyInfo,
} from "@/types/survet-types";

const getSurveyInfoByInvoiceId = async (payload: {
  invoiceId: string;
}): Promise<IHttpResult<ISurveyInfo>> => {
  try {
    const response = await axiosInstance.get<IHttpResult<ISurveyInfo>>(
      `${controlers.Survey}/GetDefaultInvoiceSurvey/${payload.invoiceId}`,
      { headers: { auth: true } }
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

const applyAnswerToSurveyInvoice = async (
  payload: IApplySurveyPoint
): Promise<IHttpResult<boolean>> => {
  try {
    const response = await axiosInstance.post<IHttpResult<boolean>>(
      `${controlers.Survey}/ApplyAnswerToSurveyInvoice/`,
      payload,
      { headers: { auth: true } }
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

const applyCompletedSurveyInvoice = async (
  payload: IConfirmSurveyPoints
): Promise<IHttpResult<boolean>> => {
  try {
    const response = await axiosInstance.post<IHttpResult<boolean>>(
      `${controlers.Survey}/ApplyCompletedSurveyInvoice`,
      payload,
      { headers: { auth: true } }
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

export {
  getSurveyInfoByInvoiceId,
  applyAnswerToSurveyInvoice,
  applyCompletedSurveyInvoice,
};
