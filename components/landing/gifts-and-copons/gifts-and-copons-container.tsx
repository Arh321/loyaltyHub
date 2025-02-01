"use client";
import { CoponIcons, GiftIcon } from "@/components/sharedIcons/sharedIcons";
import { ProfileSliceType } from "@/redux/profile/profileSlice";
import { RootState } from "@/redux/store";
import { IGiftCardLabels } from "@/types/coupon-and-gift";
import { GetGiftCardLabels } from "@/utils/giftAndCouponsService";
import { Skeleton } from "antd";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
const CoponsAndGiftsSummeryComponentItem = React.lazy(
  () => import("./copon-summery")
);

const GiftsAndCoponsContainerComponent = () => {
  const [lables, setLables] = useState<IGiftCardLabels>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { info, loadingProfile } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );
  const onGetGiftCardLabels = useCallback(async () => {
    setLoading(true);
    try {
      const response = await GetGiftCardLabels({
        customerId: info.id,
      });
      if (response.status) {
        setLables(() => response.result);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (info) {
      onGetGiftCardLabels();
    }
  }, [loadingProfile, info]);

  if (loading || loadingProfile)
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

  if (error) return null;

  if (lables)
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
            value={lables.couponsCount.toString()}
            type={"copon"}
            loading={loading}
          />
          <CoponsAndGiftsSummeryComponentItem
            title={"کارت هدیه"}
            icon={<GiftIcon width="70" height="32" color="var(--Secondary2)" />}
            value={lables.giftCardCount.toString()}
            type={"copon"}
            loading={loading}
          />
        </Suspense>
      </div>
    );
};

export default GiftsAndCoponsContainerComponent;
