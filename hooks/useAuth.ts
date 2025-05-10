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
import { useMutation } from "@tanstack/react-query";
import { IHttpResult } from "@/types/http-result";
import { AxiosError } from "axios";
import { IProfileInfo } from "@/types/profile";

const useValidateInvoiceById = () =>
  useMutation<
    IHttpResult<IInvoiceId>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosError<IHttpResult<any>>,
    { invoiceId: string }
  >({
    mutationKey: ["validateInvoiceById"],
    mutationFn: validateInvoiceById,
  });

const useGetProfile = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useMutation<IHttpResult<IProfileInfo>, AxiosError<IHttpResult<any>>, void>({
    mutationKey: ["GetProfile"],
    mutationFn: getProfile,
  });

const useInvoiceById = () =>
  useMutation<
    IHttpResult<IInvoiceDetail>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosError<IHttpResult<any>>,
    { invoiceId: string }
  >({
    mutationKey: ["GetInvoiceById"],
    mutationFn: getInvoiceById,
  });

const useAuth = () => {
  const [invoiceDetail, setInvoiceDetail] = useState<
    IInvoiceDetail | undefined
  >();
  const [showInvoice, setShowInvoice] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const cookies = new Cookies();
  const { notify } = useNotify();

  const invoiceId = searchParams.get("invoiceId") ?? "";
  const avg = searchParams.get("average");

  const { hasToken } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );

  const { mutate: validate, isPending: loadingValidateInvoice } =
    useValidateInvoiceById();
  const { mutate: getProf, isPending: profileLoading } = useGetProfile();
  const { mutate: getInvoice, isPending: loadingInvoice } = useInvoiceById();

  const loadInvoiceFlow = useCallback(() => {
    if (!invoiceId) return;

    validate(
      { invoiceId },
      {
        onSuccess: (res) => {
          if (!res.status) {
            notify("error", res.statusMessage || "اطلاعات فاکتور مطابقت ندارد");
            setShowInvoice(false);
            return;
          }

          dispatch(onLoadingProfile(true));

          // دریافت پروفایل
          getProf(undefined, {
            onSuccess: (res) => {
              if (!res.status) {
                handleProfileError(res.statusMessage);
                return;
              }

              dispatch(onSetProfile(res.result));
              dispatch(onLoadingProfile(false));

              // دریافت فاکتور
              getInvoice(
                { invoiceId },
                {
                  onSuccess: (res) => {
                    if (res.status) {
                      setInvoiceDetail(res.result);
                      setShowInvoice(true);
                      notify(
                        "success",
                        res.statusMessage || "فاکتور با موفقیت دریافت شد"
                      );
                    } else {
                      setShowInvoice(false);
                      notify(
                        "error",
                        res.statusMessage || "خطا در دریافت فاکتور"
                      );
                    }
                  },
                  onError: (err) => {
                    setShowInvoice(false);
                    notify(
                      "error",
                      err.response?.data?.resultMessage || "خطای فاکتور"
                    );
                  },
                }
              );
            },
            onError: (err) => {
              handleProfileError(err.response?.data?.resultMessage);
            },
          });
        },
        onError: (err) => {
          notify(
            "error",
            err.response?.data?.resultMessage || "خطا در بررسی فاکتور"
          );
          setShowInvoice(false);
        },
      }
    );
  }, [invoiceId, validate, getProf, getInvoice]);

  const handleProfileError = (message?: string) => {
    notify("error", message || "خطا در دریافت اطلاعات کاربر");
    cookies.remove("token");
    router.push("/login");
  };

  const loadProfileOnly = useCallback(() => {
    dispatch(onLoadingProfile(true));
    getProf(undefined, {
      onSuccess: (res) => {
        if (res.status) {
          dispatch(onSetProfile(res.result));
        } else {
          handleProfileError(res.statusMessage);
        }
        dispatch(onLoadingProfile(false));
      },
      onError: (err) => {
        handleProfileError(err.response?.data?.resultMessage);
        dispatch(onLoadingProfile(false));
      },
    });
  }, [getProf]);

  useEffect(() => {
    if (path === "/" && hasToken && invoiceId && !avg) {
      loadInvoiceFlow();
    } else if (!hasToken) {
      dispatch(onCheckHasToken());
    }
  }, [path, hasToken, invoiceId, avg, loadInvoiceFlow]);

  useEffect(() => {
    if (!path.includes("login")) {
      loadProfileOnly();
    }
  }, [path, loadProfileOnly]);

  return {
    loadingInvoice,
    loadingValidateInvoice,
    profileLoading,
    invoiceDetail,
    showInvoice,
    invoiceId,
    setShowInvoice,
    cookies,
  };
};

export default useAuth;
