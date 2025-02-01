import { useNotify } from "@/components/notife/notife";
import { ICompanySettings } from "@/types/company-setting";
import { getAppSettings } from "@/utils/settingService";
import { useCallback, useEffect, useState } from "react";

const useAppInitializer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [appSettings, setAppSettings] = useState<ICompanySettings>();

  const { notify } = useNotify();

  const onGetAppSettings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAppSettings();
      if (response.status) {
        setAppSettings(response.result);
      } else {
        if (response.errors) {
          Object.values(response.errors).forEach((message) =>
            notify("error", message)
          );
        } else {
          notify(
            "error",
            response.statusMessage || "در دریافت اطلاعات خطایی رخ داده است"
          );
        }
      }
    } catch {
      notify("error", "ویرایش اطلاعات کاربری با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  }, [appSettings]);
  useEffect(() => {
    onGetAppSettings();
  }, []);
  return {
    loading,
    error,
    appSettings,
  };
};

export default useAppInitializer;
