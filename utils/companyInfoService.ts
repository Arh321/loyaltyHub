import { ICompanyInfo } from "@/types/company-info-type";
import axios from "axios";

const companyInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_EXAMPLE_URL, // Use environment variables for flexibility
  timeout: 50000, // Set a timeout to handle long requests
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCompanyInfo = async (): Promise<ICompanyInfo[]> => {
  const response = await companyInstance.get("/api/companyInfo/info");

  return response.data;
};
