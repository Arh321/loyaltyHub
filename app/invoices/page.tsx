import InvoicesListContainer from "@/components/invoice-page/invoices-list/invoices-list-container";
import PagesContainer from "@/components/pages-container/pages-container";

export default function InvoicesPAge() {
  return (
    <PagesContainer>
      <div className="w-full z-10  sticky top-0">
        <div className="w-full flex items-center justify-center border-gradient-secondary border-b text-Secondary2 font-Medium text-xl py-4  overflow-hidden">
          فاکتورهای من
        </div>
      </div>
      <div className="w-full grow overflow-y-auto flex flex-col  gap-4 pt-4 sm:px-6 lsm:px-8 ">
        <InvoicesListContainer />
      </div>
    </PagesContainer>
  );
}
