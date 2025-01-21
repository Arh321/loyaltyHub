"use client";
import { IInvoice } from "@/types/invoice";
import { CloseOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Drawer } from "antd";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";

interface SortInvoiceListItemsProps {
  setData: Dispatch<SetStateAction<IInvoice[]>>;
  data: IInvoice[];
  initialData: IInvoice[];
}

const SortInvoiceListItems: React.FC<SortInvoiceListItemsProps> = ({
  setData,
  data,
  initialData,
}) => {
  const [sortType, setSortType] = useState<1 | 2 | 3 | 4 | undefined>(
    undefined
  );
  const [collapsed, setCollapsed] = useState(false);

  const sortingOptions: {
    label: string;
    key: string;
    order: "asc" | "desc";
    id: 1 | 2 | 3 | 4;
  }[] = [
    { label: "کمترین مبلغ", key: "payAmount", order: "asc", id: 1 },
    { label: "بالاترین مبلغ", key: "payAmount", order: "desc", id: 2 },
    { label: "اولین فاکتور", key: "purchaseDate", order: "asc", id: 3 },
    { label: "آخرین فاکتور", key: "purchaseDate", order: "desc", id: 4 },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const sortData = (
    key: "payAmount" | "purchaseDate",
    order: "asc" | "desc"
  ) => {
    const sortedData = [...data].sort((a, b) => {
      const valA = key === "purchaseDate" ? new Date(a[key]) : a[key];
      const valB = key === "purchaseDate" ? new Date(b[key]) : b[key];
      return order === "asc" ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
    });
    setData(sortedData);
  };

  return (
    <div>
      <button
        onClick={toggleCollapsed}
        className="absolute left-7 top-0 bottom-0 my-auto"
      >
        <Icon
          icon="lets-icons:sort-down-light"
          width="32"
          height="32"
          style={{ color: "#9a4c4c" }}
        />
      </button>
      <Drawer
        title={false}
        placement={"bottom"}
        closable={false}
        onClose={toggleCollapsed}
        open={collapsed}
        className="p-0"
        classNames={{
          body: "!p-0 ",

          wrapper:
            "!w-full !max-w-[470px] rounded-t-[20px] overflow-hidden relative !mx-auto",
        }}
      >
        <button className="absolute top-4 left-4">
          <CloseOutlined
            className="!text-Alert text-xl"
            role="button"
            onClick={toggleCollapsed}
          />
        </button>
        <div className="flex flex-col gap-2 h-full justify-center font-Medium p-4">
          {sortingOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                sortData(
                  option.key as "payAmount" | "purchaseDate",
                  option.order
                );
                setSortType(option.id);
                toggleCollapsed();
              }}
              className={clsx(
                "px-4 py-2 rounded transition-all text-lg",
                sortType === option.id
                  ? "bg-Secondary2 text-Highlighter"
                  : "text-Secondary bg-transparent"
              )}
            >
              {option.label}
            </button>
          ))}
          <hr className="border border-gradient-secondary" />
          <button
            onClick={() => {
              setData(initialData);
              setSortType(undefined);
              toggleCollapsed();
            }}
            className={clsx(
              "px-4 py-2 rounded transition-all text-lg",
              sortType === undefined
                ? "bg-Secondary2 text-Highlighter"
                : "text-Secondary bg-transparent"
            )}
          >
            حذف فیلتر
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default SortInvoiceListItems;
