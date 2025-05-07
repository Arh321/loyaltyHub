"use client";
import MemoizedErrorComponent from "@/components/shared-components/error-component";
import { CoponIcons, GiftIcon } from "@/components/sharedIcons/sharedIcons";
import useGiftCardLabels from "@/hooks/useGetGiftCardLabels";
import { Skeleton } from "antd";
import React, { Suspense } from "react";

const CoponsAndGiftsSummeryComponentItem = React.lazy(
  () => import("./copon-summery")
);

const GiftsAndCoponsContainerComponent = () => {
  const { isError, isFetching, labels, refetch } = useGiftCardLabels();

  if (isFetching)
    return (
      <div className="w-full grid grid-cols-2 gap-[20px]">
        {Array.from({ length: 2 }).map((_, index) => {
          return (
            <div key={index} className="col-span-1 w-full aspect-square">
              <Skeleton.Node
                className="!flex !w-full !h-full aspect-square rounded-[10px]"
                active
              />
            </div>
          );
        })}
      </div>
    );

  if (isError)
    return (
      <MemoizedErrorComponent
        refetch={() => refetch()}
        containerClass="w-full aspect-[3/1]"
      />
    );

  if (labels)
    return (
      <Suspense
        fallback={
          <Skeleton.Node
            className="!flex !w-full !h-full aspect-square rounded-[10px]"
            active
          />
        }
      >
        <div dir="rtl" className="w-full grid grid-cols-2 gap-[20px]">
          <CoponsAndGiftsSummeryComponentItem
            title={"کوپـن خـریـد"}
            icon={<CoponIcons width="70" height="32" color="" />}
            value={labels.couponsCount.toString()}
            type={"copon"}
            loading={isFetching}
          />
          <CoponsAndGiftsSummeryComponentItem
            title={"کارت هدیه"}
            icon={<GiftIcon width="70" height="32" color="var(--cta)" />}
            value={labels.giftCardCount.toString()}
            type={"gift"}
            loading={isFetching}
          />
        </div>
      </Suspense>
    );
};

export default GiftsAndCoponsContainerComponent;
