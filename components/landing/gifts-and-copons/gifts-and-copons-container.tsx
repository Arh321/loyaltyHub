"use client";
import MemoizedErrorComponent from "@/components/shared-components/error-component";
import { CouponIcon, GiftIcon } from "@/components/sharedIcons/icons-index";
import useGiftCardLabels from "@/hooks/useGetGiftCardLabels";
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
              <div className="!flex !w-full !h-full aspect-square rounded-[10px] animate-skeleton" />
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
          <div className="!flex !w-full !h-full aspect-square rounded-[10px] animate-skeleton" />
        }
      >
        <div dir="rtl" className="w-full grid grid-cols-2 gap-[20px]">
          <CoponsAndGiftsSummeryComponentItem
            title={"کوپـن خـریـد"}
            icon={
              <CouponIcon
                width="70"
                height="32"
                color="var(--cta)"
                className="text-cta"
              />
            }
            value={labels.couponsCount.toString()}
            type={"copon"}
            loading={isFetching}
          />
          <CoponsAndGiftsSummeryComponentItem
            title={"کارت هدیه"}
            icon={
              <GiftIcon
                width="70"
                height="32"
                color="var(--cta)"
                className="text-cta"
              />
            }
            value={labels.giftCardCount.toString()}
            type={"gift"}
            loading={isFetching}
          />
        </div>
      </Suspense>
    );
};

export default GiftsAndCoponsContainerComponent;
