"use client";
import { CoponIcons, GiftIcon } from "@/components/sharedIcons/sharedIcons";
import { Skeleton } from "antd";
import React, { Suspense, useEffect, useState } from "react";
const CoponsAndGiftsSummeryComponentItem = React.lazy(
  () => import("./copon-summery")
);

const GiftsAndCoponsContainerComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <div dir="rtl" className="w-full grid grid-cols-2 gap-[20px]">
      <Suspense
        fallback={
          <Skeleton.Node
            className="!flex !w-full !h-full aspect-square rounded-[10px]"
            active
          />
        }
      >
        <CoponsAndGiftsSummeryComponentItem
          title={"کوپـن خـریـد"}
          icon={<CoponIcons width="70" height="32" color="" />}
          value={"5"}
          type={"copon"}
          loading={loading}
        />
        <CoponsAndGiftsSummeryComponentItem
          title={"کارت هدیه"}
          icon={<GiftIcon width="70" height="32" color="var(--Secondary2)" />}
          value={"150000"}
          type={"gift"}
          loading={loading}
        />
      </Suspense>
    </div>
  );
};

export default GiftsAndCoponsContainerComponent;
