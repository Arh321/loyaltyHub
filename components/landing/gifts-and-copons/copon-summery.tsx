"use client";

import { Skeleton } from "antd";
import React from "react";

interface CoponsAndGiftsSummeryComponentItemProps {
  icon: React.JSX.Element;
  title: string;
  value: string;
  type: "gift" | "copon";
  loading: boolean;
}

const CoponsAndGiftsSummeryComponentItem: React.FC<
  CoponsAndGiftsSummeryComponentItemProps
> = ({ icon, title, type, value, loading }) => {
  const returnCorrentVAlueView = () => {
    switch (type) {
      case "gift":
        return (
          <span className="flex items-center gap-1 font-Regular">
            <span className="text-lg">{value}</span>
            <span className="text-sm">تومان</span>
          </span>
        );

      case "copon":
        return (
          <span className="flex items-center gap-1 font-Regular">
            <span className="text-lg">{value}</span>
            <span className="text-sm">عدد</span>
          </span>
        );
      default:
        return "";
    }
  };

  if (loading)
    return (
      <div className="col-span-1 w-full aspect-square">
        <Skeleton.Node
          className="!flex !w-full !h-full aspect-square rounded-[10px]"
          active
        />
      </div>
    );

  return (
    <div className="col-span-1  animate-fadeIn w-full aspect-[6/5] bg-Highlighter rounded-[10px] overflow-hidden">
      <div
        style={{
          backgroundImage: "url(/images/Lines.png)",
        }}
        className="w-full h-full py-8 flex flex-col items-center justify-center gap-[8px]"
      >
        <span className="drop-shadow-xl">{icon}</span>
        <p>{loading && <Skeleton.Node active className="w-12 h-3" />}</p>
        {!loading && value ? (
          <p className="w-full flex flex-col gap-[7px] justify-center items-center">
            <span className="font-Bold">{title}</span>
            {returnCorrentVAlueView()}
          </p>
        ) : (
          <p className="w-full flex flex-col gap-[10px] justify-center items-center text-Alert font-Regular">
            خطا در دریافت اطلاعات
          </p>
        )}
      </div>
    </div>
  );
};

export default CoponsAndGiftsSummeryComponentItem;
