import { FactorDetail, IInvoiceDetail } from "@/types/invoice";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";

const InvoiceDetailItemsTable: React.FC<{
  items: IInvoiceDetail["factorDetail"];
}> = ({ items }) => (
  <div className="w-full border-collapse font-Regular flex flex-col">
    <div className="border font-Medium bg-Secondary2 px-2 py-1 text-base text-Highlighter text-highlighter text-center">
      مشخصات فاکتور
    </div>
    <div className="font-bold w-full flex ">
      <div className="font-bold bg-Highlighter w-full p-1 flex border-b border-Secondary2">
        <div className="w-2/5 px-2 py-1 h-full border-l border-highlighter">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[10px]">نام کالا</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[10px]">بارکد کالا</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 h-full border-l border-highlighter">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[10px]">تعداد</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[10px]">%تخفیف</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 h-full border-l border-highlighter">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[10px]">قیمت</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[10px]">پس از تخفیف</span>
          </p>
        </div>
        <div className="w-1/5 px-2 py-1 h-full">
          <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
            <span className="text-[10px]">مبلغ نهایی</span>
            <span className="border-b border-tertiary px-2 w-full"></span>
            <span className="text-[10px]">مبلغ تخفیف</span>
          </p>
        </div>
      </div>
    </div>
    <div className="w-full ">
      {items.map((item, index) => (
        <RowOfFactorDetail key={index} item={item} />
      ))}
    </div>
  </div>
);

const RowOfFactorDetail = ({ item }: { item: FactorDetail }) => {
  return (
    <div className="font-bold bg-Highlighter w-full p-1 flex border-b border-Secondary2">
      <div className="w-2/5 px-2 py-1 h-full border-l border-highlighter">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[10px]">{item.k_name}</span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[10px]">
            {item.kbArcode ? item.kbArcode : "---"}
          </span>
        </p>
      </div>
      <div className="w-1/5 px-2 py-1 h-full border-l border-highlighter">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[10px]">{item.k_Amount}</span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[10px]">{item.reduction}</span>
        </p>
      </div>
      <div className="w-1/5 px-2 py-1 h-full border-l border-highlighter">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[10px]">
            {numberToPersianPrice(item.k_Price)}
          </span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[10px]">
            {numberToPersianPrice(item.afterReduction)}
          </span>
        </p>
      </div>
      <div className="w-1/5 px-2 py-1 h-full">
        <p className="flex flex-col gap-2 h-full justify-center items-center w-full !mb-0">
          <span className="text-[10px]">
            {numberToPersianPrice(item.finallyPrice)}
          </span>
          <span className="border-b border-tertiary px-2 w-full"></span>
          <span className="text-[10px]"> {item.finallyReduction}</span>
        </p>
      </div>
    </div>
  );
};

export default InvoiceDetailItemsTable;
