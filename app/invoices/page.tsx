import InvoicesListContainer from "@/components/invoice-page/invoices-list/invoices-list-container";

export default function InvoicesPAge() {
  return (
    <div className="w-full grow  no-scrollbar overflow-y-auto bg-BG rounded-t-[20px]  -mt-[10px]">
      <div className=" w-full min-h-[calc(100vh-80px)] relative  flex flex-col  pb-[100px]">
        <div className="w-full z-10 sm:px-6 lsm:px-8 sticky top-0">
          <div className="w-full flex items-center justify-center  border-gradient-seconday border-b text-Secondary2 font-Medium text-xl py-4 rounded-b-[55px] overflow-hidden">
            فاکتورهای من
          </div>
        </div>
        <div className="w-full grow overflow-y-auto flex flex-col  gap-4 pt-4 sm:px-6 lsm:px-8 ">
          <InvoicesListContainer />
        </div>
      </div>
    </div>
  );
}
