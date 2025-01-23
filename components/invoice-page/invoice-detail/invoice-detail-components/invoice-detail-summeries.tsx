import { IProfileInfo, IValidateUser } from "@/types/profile";

import moment from "jalali-moment";
import logo from "@/public/images/hosseiniLogo.webp";
import Image from "next/image";

const InvoiceDetailSummary: React.FC<{
  transactionID: number;
  saleDate: string;
  departmentName: string;
  info: IProfileInfo;
}> = ({ transactionID, saleDate, departmentName, info }) => (
  <div className="bg-Highlighter">
    <div className="border font-Medium bg-Secondary2 px-2 py-1 text-base text-Highlighter text-highlighter text-center">
      مشخصات فاکتور
    </div>

    <div className="px-2">
      <span className="flex border-b justify-between p-2 bg-highlighter">
        <span className="text-sm">#{transactionID}</span>
        <span className="text-sm">
          {moment(saleDate).locale("fa").format("YYYY/MM/DD - HH:mm")}
        </span>
      </span>
    </div>
    <div className="font-Regular grid grid-cols-4 gap-1 items-center px-2 py-1">
      <span className="col-span-1 font-Regular bg-highlighter">فروشنده</span>
      <div className="col-span-3 flex gap-2 bg-highlighter items-center">
        <div className="flex items-center gap-2 pl-2 border-l-2 border-Secondary">
          <Image
            className="w-[50px] !object-cover"
            src={logo}
            alt=""
            width={50}
          />
          <span>آجیل حسینی</span>
        </div>
        <span>{departmentName}</span>
      </div>
    </div>
    <div className="grid grid-cols-4 text-primary gap-1 px-2 py-1 ">
      <span className="col-span-1 font-Regular bg-highlighter flex items-center">
        خریدار
      </span>
      <div className="col-span-3 text-sm flex items-center  justify-between p-2 bg-highlighter">
        <span className="flex items-center gap-1 font-Medium text-Primary">
          {info.mandatory.firstName} {info.mandatory.lastName}
        </span>
        <span className="font-Regular">{info.immutable.phone}</span>
      </div>
    </div>
  </div>
);

export default InvoiceDetailSummary;
