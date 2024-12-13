"use client";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import clsx from "clsx";
import { IGifts } from "@/types/coupon-and-gift";
import style from "../invoice-page/invoices-list/invoice-list-style.module.css";

import React, { memo, useEffect, useState } from "react";
import { Skeleton } from "antd";
const gifts: IGifts[] = [
  {
    giftBalanceID: 1,
    startDate: "1403/07/18",
    expDate: "1404/07/17",
    gcBalance: 292365,
    gcNum: "Reg724599725751",
    groupName: "ProfileCompelete",
    customerID: 1031001,
    companyID: 40,
    minBuyPrice: 903829,
    giftTotalPrice: 382649,
    giftType: "دلتنگتونیم",
    giftOccasion: "عید نوروز",
  },
  {
    giftBalanceID: 2,
    startDate: "1403/07/18",
    expDate: "1404/07/17",
    gcBalance: 289127,
    gcNum: "Reg724599725752",
    groupName: "ProfileCompelete",
    customerID: 1031002,
    companyID: 40,
    minBuyPrice: 923624,
    giftTotalPrice: 385754,
    giftType: "هدیه تولد",
    giftOccasion: "هدیه تولد",
  },
  {
    giftBalanceID: 3,
    startDate: "1403/07/18",
    expDate: "1404/07/17",
    gcBalance: 199099,
    gcNum: "Reg724599725753",
    groupName: "ProfileCompelete",
    customerID: 1031003,
    companyID: 40,
    minBuyPrice: 845769,
    giftTotalPrice: 540555,
    giftType: "دلتنگتونیم",
    giftOccasion: "جشن 50 سالگی حسینی",
  },
  {
    giftBalanceID: 4,
    startDate: "1403/07/18",
    expDate: "1402/07/17",
    gcBalance: 425274,
    gcNum: "Reg724599725754",
    groupName: "ProfileCompelete",
    customerID: 1031004,
    companyID: 40,
    minBuyPrice: 833524,
    giftTotalPrice: 681488,
    giftType: "هدیه تولد",
    giftOccasion: "عید نوروز",
  },
  {
    giftBalanceID: 5,
    startDate: "1403/07/18",
    expDate: "1404/07/17",
    gcBalance: 196007,
    gcNum: "Reg724599725755",
    groupName: "ProfileCompelete",
    customerID: 1031005,
    companyID: 40,
    minBuyPrice: 848805,
    giftTotalPrice: 300379,
    giftType: "دلتنگتونیم",
    giftOccasion: "یار همیشگی",
  },
  {
    giftBalanceID: 6,
    startDate: "1403/07/18",
    expDate: "1404/07/17",
    gcBalance: 293876,
    gcNum: "Reg724599725756",
    groupName: "ProfileCompelete",
    customerID: 1031006,
    companyID: 40,
    minBuyPrice: 825755,
    giftTotalPrice: 671969,
    giftType: "دلتنگتونیم",
    giftOccasion: "دلتنگتونیم",
  },
  {
    giftBalanceID: 7,
    startDate: "1403/07/18",
    expDate: "1404/07/17",
    gcBalance: 415423,
    gcNum: "Reg724599725757",
    groupName: "ProfileCompelete",
    customerID: 1031007,
    companyID: 40,
    minBuyPrice: 894043,
    giftTotalPrice: 624240,
    giftType: "دلتنگتونیم",
    giftOccasion: "یار همیشگی",
  },
  {
    giftBalanceID: 8,
    startDate: "1403/07/18",
    expDate: "1404/07/17",
    gcBalance: 269389,
    gcNum: "Reg724599725758",
    groupName: "ProfileCompelete",
    customerID: 1031008,
    companyID: 40,
    minBuyPrice: 934314,
    giftTotalPrice: 433572,
    giftType: "دلتنگتونیم",
    giftOccasion: "جشن 50 سالگی حسینی",
  },
  {
    giftBalanceID: 9,
    startDate: "1403/07/18",
    expDate: "1404/07/17",
    gcBalance: 208095,
    gcNum: "Reg724599725759",
    groupName: "ProfileCompelete",
    customerID: 1031009,
    companyID: 40,
    minBuyPrice: 815676,
    giftTotalPrice: 554811,
    giftType: "دلتنگتونیم",
    giftOccasion: "جشن 50 سالگی حسینی",
  },
  {
    giftBalanceID: 10,
    startDate: "1403/07/18",
    expDate: "1404/07/17",
    gcBalance: 384833,
    gcNum: "Reg7245997257510",
    groupName: "ProfileCompelete",
    customerID: 1031010,
    companyID: 40,
    minBuyPrice: 906511,
    giftTotalPrice: 683351,
    giftType: "هدیه تولد",
    giftOccasion: "هدیه تولد",
  },
];

const GiftListItemComponent = React.lazy(() => import("./giftListItem"));

const GiftsContainerList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IGifts[]>();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData(() => gifts);
    }, 1000);
  }, []);

  if (loading || !data)
    return (
      <div className="w-full flex flex-col gap-[12px]">
        {Array.from({ length: 8 }).map(() => {
          return (
            <Skeleton.Node
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
