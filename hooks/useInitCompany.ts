import { useNotify } from "@/components/notife/notife";
import { setCompanyInfo } from "@/redux/companySlice/companySlice";
import { CompanyColors, ICompanyInfo } from "@/types/company-info-type";
import { getCompanyInfo } from "@/utils/companyInfoService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyInfo = () => {
  return useMutation<ICompanyInfo[], AxiosError, void, unknown>({
    mutationKey: ["CompanyInfo"],
    mutationFn: () => getCompanyInfo(),
  });
};

const useInitCompany = () => {
  const { mutate: getCoInfo, isPending, data, isError } = useGetCompanyInfo();
  const dispatch = useDispatch();
  const { notify } = useNotify();
  const handleSetTheme = useCallback(
    (theme: CompanyColors) => {
      const root = document.documentElement;
      Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
    },
    [data]
  );

  const handleGetCompanyInfo = useCallback(() => {
    getCoInfo(undefined, {
      onSuccess(data) {
        dispatch(setCompanyInfo(data[0]));
        handleSetTheme(data[0].colors);
        localStorage.setItem("logo", data[0].logoUrl);
      },
      onError(error) {
        notify("error", `خطا در دریافت اطلاعات مجموعه ${error.message}`);
      },
    });
  }, [data]);

  useEffect(() => {
    handleGetCompanyInfo();
  }, []);

  return {
    handleGetCompanyInfo,
    loadingCompanyInfo: isPending,
    errorCompanyInfo: isError,
  };
};

export default useInitCompany;
