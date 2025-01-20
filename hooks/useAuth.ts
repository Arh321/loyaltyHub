import Cookies from "universal-cookie";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { AppDispatch, RootState } from "@/redux/store";
import {
  onCheckHasToken,
  ProfileSliceType,
} from "@/redux/profile/profileSlice";
import { getInvoiceById, validateInvoiceById } from "@/utils/invoiceService";
import { useNotify } from "@/components/notife/notife";
import { IInvoiceId } from "@/types/invoice";

const useAuth = () => {
  const [loadingInvoice, setLoadingInvoice] = useState(false);
  const [invoiceDetail, setInvoiceDetail] = useState<IInvoiceId | undefined>();
  const [showInvoice, setShowInvoice] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const { notify } = useNotify();

  const invoiceId = searchParams.get("invoiceId");
  const cookies = new Cookies();

  const { customerToken, hasToken } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );

  /**
   * Loads the invoice details based on the invoice ID from the URL.
   */
  const onLoadSearchedInvoice = useCallback(async () => {
    if (!invoiceId) return;

    setLoadingInvoice(true);
    setShowInvoice(true);

    try {
      const valid = await validateInvoiceById({ invoiceId });

      if (!valid.status) {
        notify("error", valid.statusMessage || "اطلاعات فاکتور مطابقت ندارد");
        setShowInvoice(false);
        return;
      }

      const response = await getInvoiceById({ invoiceId });

      if (response.status) {
        notify("success", response.statusMessage);
        setInvoiceDetail(response.result);
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

  /**
   * Handles the token and invoice validation on component mount or path changes.
   */
  useEffect(() => {
    if (path === "/" && hasToken && invoiceId) {
      onLoadSearchedInvoice();
    } else if (!hasToken) {
      dispatch(onCheckHasToken());
    }
  }, [path, hasToken, invoiceId, onLoadSearchedInvoice, dispatch]);

  return {
    loadingInvoice,
    invoiceDetail,
    showInvoice,
    setShowInvoice,
  };
};

export default useAuth;
