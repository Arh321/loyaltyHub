"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

import logo from "../../public/images/hosseiniLogo.webp";
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import InvoiceModalDetail from "../invoice-page/invoice-detail/invoice-detai-modal";
import useAppInitializer from "@/hooks/useAppInitializer";

const Sidebar = React.lazy(() => import("./side-bar"));
const CancelSurveyModal = React.lazy(() => import("./cancel-survey-modal"));

const Header = () => {
  const {} = useAppInitializer();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showServayButton, setShoSurveyButton] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
    invoiceDetail,
    loadingInvoice,
    showInvoice,
    invoiceId,
    setShowInvoice,
  } = useAuth();

  const isSurveyPage = pathname.includes("survey");
  const isLoginPage = pathname.includes("login");
  useEffect(() => {
    setShowInvoice(false);
    if (invoiceDetail) {
      setShowInvoice(true);
    }
  }, [pathname, invoiceDetail]);

  return (
    <header
      className="w-full bg-center bg-contain bg-repeat"
      style={{ backgroundImage: "url(/images/bg-art.webp)" }}
    >
      <div className="bg-gradient-to-l from-green-600 via-transparent to-green-600">
        {isSurveyPage ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex justify-start px-4 py-4 text-Highlighter"
          >
            <Icon icon="stash:times" width="2.5rem" />
          </button>
        ) : !isLoginPage ? (
          <div className="w-full flex items-center justify-between px-4 py-5 relative">
            <div className="flex items-center gap-8">
              {pathname !== "/" && (
                <button
                  onClick={() => router.back()}
                  className="text-Highlighter"
                >
                  <Icon
                    icon="mingcute:left-fill"
                    width="32"
                    height="32"
                    className="text-Highlighter"
                  />
                </button>
              )}
            </div>
            <Link
              href="/"
              className="absolute inset-0 m-auto w-max h-max -translate-y-2"
            >
              <Image src={logo} alt="لوگو" priority />
            </Link>
            <Sidebar logo={logo} />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center px-4 py-3 relative">
            <div className=" m-auto w-max h-max -translate-y-2">
              <Image src={logo} alt="لوگو" priority />
            </div>
          </div>
        )}
      </div>
      <CancelSurveyModal setOpen={setIsModalOpen} open={isModalOpen} />
      <InvoiceModalDetail
        setOpen={setShowInvoice}
        open={showInvoice}
        loadingInvoice={loadingInvoice}
        invoiceDetail={invoiceDetail}
        transactionID={invoiceId}
      />
    </header>
  );
};

export default memo(Header);
