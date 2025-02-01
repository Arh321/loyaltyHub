import Cookies from "universal-cookie";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { AppDispatch, RootState } from "@/redux/store";
import {
  onCheckHasToken,
  onLoadingProfile,
  onSetProfile,
  ProfileSliceType,
} from "@/redux/profile/profileSlice";
import { getInvoiceById, validateInvoiceById } from "@/utils/invoiceService";
import { useNotify } from "@/components/notife/notife";
import { IInvoiceDetail, IInvoiceId } from "@/types/invoice";
import { getProfile } from "@/utils/userServise";

const useAuth = () => {
  const [loadingInvoice, setLoadingInvoice] = useState(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [invoiceDetail, setInvoiceDetail] = useState<
    IInvoiceDetail | undefined
  >();
  const [showInvoice, setShowInvoice] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const { notify } = useNotify();

  const invoiceId = searchParams.get("invoiceId");
  const avg = searchParams.get("average");

  const cookies = new Cookies();

  const { hasToken } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );

  /**
   * Loads the invoice details based on the invoice ID from the URL.
   */
  const onLoadSearchedInvoice = useCallback(async () => {
    if (!invoiceId) return;

    setLoadingInvoice(true);

    try {
      const valid = await validateInvoiceById({ invoiceId });

      if (!valid.status) {
        notify("error", valid.statusMessage || "اطلاعات فاکتور مطابقت ندارد");
        setShowInvoice(false);
        return;
      }
      getUserProfile();
      const response = await getInvoiceById({ invoiceId });

      if (response.status) {
        notify("success", response.statusMessage);
        setInvoiceDetail(() => response.result);
      } else {
        notify("error", response.statusMessage || "خطا در دریافت فاکتور");
        setShowInvoice(false);
      }
    } catch (error) {
      notify("error", "خطا در دریافت فاکتور");

      setShowInvoice(false);
    } finally {
      setLoadingInvoice(false);
    }
  }, [invoiceId, notify]);

  const getUserProfile = useCallback(async () => {
    try {
      dispatch(onLoadingProfile(true));
      setProfileLoading(true);
      const response = await getProfile();
      if (response.status) {
        dispatch(onSetProfile(response.result));
        dispatch(onLoadingProfile(false));
      } else {
        notify("error", response.statusMessage || "خطا در دریافت اطلاات کاربر");
        cookies.remove("token");
        setProfileLoading(false);
        router.push("/login");
      }
    } catch (error) {
      notify("error", "خطا در دریافت اطلاات کاربر");
      cookies.remove("token");
      router.push("/login");
      setProfileLoading(false);
    } finally {
      setProfileLoading(false);
      dispatch(onLoadingProfile(false));
    }
  }, []);

  /**
   * Handles the token and invoice validation on component mount or path changes.
   */
  useEffect(() => {
    if (path === "/" && hasToken && invoiceId && !avg) {
      onLoadSearchedInvoice();
    } else if (!hasToken) {
      dispatch(onCheckHasToken());
    }
  }, [path, hasToken, invoiceId, onLoadSearchedInvoice, dispatch]);

  useEffect(() => {
    if (!path.includes("login")) {
      getUserProfile();
    }
  }, [path]);

  return {
    loadingInvoice,
    invoiceDetail,
    showInvoice,
    invoiceId,
    setShowInvoice,
    cookies,
  };
};

export default useAuth;
