import { IHttpResult } from "@/types/http-result";
import axiosInstance, { controlers } from "./apiConfig";
import { IInvoiceDetail, IInvoiceId, IInvoiceResult } from "@/types/invoice";

const getAllInvoices = async (payLoad: {
  page?: number;
  size?: number;
}): Promise<IHttpResult<IInvoiceResult>> => {
  try {
    const response = await axiosInstance.get<IHttpResult<IInvoiceResult>>(
      `${controlers.Invoice}/GetAllInvoices?page=${payLoad.page}&size=${payLoad.size}`,
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

const getInvoiceById = async (payLoad: {
  invoiceId: string;
}): Promise<IHttpResult<IInvoiceDetail>> => {
  try {
    const response = await axiosInstance.get<IHttpResult<IInvoiceDetail>>(
      `${controlers.Invoice}/GetInvoiceById/${payLoad.invoiceId}`,
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

const validateInvoiceById = async (payLoad: {
  invoiceId: string;
}): Promise<IHttpResult<IInvoiceId>> => {
  try {
    const response = await axiosInstance.get<IHttpResult<IInvoiceId>>(
      `${controlers.Auth}/ValidateInvoice?invoiceId=${payLoad.invoiceId}`,
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

export { getInvoiceById, validateInvoiceById, getAllInvoices };
