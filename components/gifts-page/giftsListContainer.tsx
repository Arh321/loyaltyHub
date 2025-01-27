"use client";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import clsx from "clsx";
import { IGifts } from "@/types/coupon-and-gift";
import style from "../invoice-page/invoices-list/invoice-list-style.module.css";

import React, { memo, useCallback, useEffect, useState } from "react";
import { Skeleton } from "antd";
import { getUserGiftCards } from "@/utils/giftAndCouponsService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProfileSliceType } from "@/redux/profile/profileSlice";

const GiftListItemComponent = React.lazy(() => import("./giftListItem"));

const GiftsContainerList = () => {
  const { info } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IGifts[]>();

  const [error, setError] = useState<boolean>(false);

  const getBAnners = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserGiftCards({
        customerId: 2280,
      });
      if (response.status) {
        setData(() => response.result);
      } else {
        setLoading(false);

        setError(true);
      }
    } catch (error) {
      setLoading(false);

      setError(true);
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    getBAnners();
  }, []);

  if (loading || !data)
    return (
      <div className="w-full flex flex-col gap-[12px]">
        {Array.from({ length: 8 }).map((_, index) => {
          return (
            <Skeleton.Node
              key={index}
              className="!flex !w-full !h-full aspect-[22/10] rounded-[10px]"
              active
            />
          );
        })}
      </div>
    );

  if (data)
    return (
      <div className="w-full flex flex-col gap-[12px]">
        <TransitionGroup component="ul" className="space-y-2">
          {data.map((item, index) => {
            return (
              <CSSTransition
                key={index}
                timeout={500}
                classNames={clsx(style["fade"])}
              >
                <GiftListItemComponent key={index} gift={item} index={index} />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    );
};

export default memo(GiftsContainerList);
