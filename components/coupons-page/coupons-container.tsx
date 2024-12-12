"use client";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import clsx from "clsx";
import { Tabs, TabsProps } from "antd";
import { ICoupon } from "@/types/coupon-and-gift";
import { CouponItem } from "./couponItem";
import style from "../invoice-page/invoices-list/invoice-list-style.module.css";
import tabStyle from "../../styles/ant-custom-styles.module.css";
const coupons: {
  usedCoupons: ICoupon[];
  unusedCoupons: ICoupon[];
} = {
  usedCoupons: [
    {
      expDate: "1404/09/21",
      serial: "CReg692333523428",
      reduction: 25,
      minPrice: 0,
      maxPrice: 0,
      firstName: "علیرضا",
      lastName: "حسن زاده مقدم",
      mobile: "09017522794",
      id: 10338401,
      isUsed: false,
    },
    {
      expDate: "1404/10/01",
      serial: "CReg692333523429",
      reduction: 15,
      minPrice: 50000,
      maxPrice: 500000,
      firstName: "مهدی",
      lastName: "رضایی",
      mobile: "09124567890",
      id: 10338402,
      isUsed: true,
    },
    {
      expDate: "1404/08/15",
      serial: "CReg692333523430",
      reduction: 30,
      minPrice: 100000,
      maxPrice: 1000000,
      firstName: "فاطمه",
      lastName: "شریفی",
      mobile: "09384567234",
      id: 10338403,
      isUsed: false,
    },
    {
      expDate: "1404/11/05",
      serial: "CReg692333523431",
      reduction: 10,
      minPrice: 0,
      maxPrice: 200000,
      firstName: "زهرا",
      lastName: "کاظمی",
      mobile: "09214567389",
      id: 10338404,
      isUsed: true,
    },
    {
      expDate: "1404/07/25",
      serial: "CReg692333523432",
      reduction: 50,
      minPrice: 200000,
      maxPrice: 2000000,
      firstName: "محمد",
      lastName: "احمدی",
      mobile: "09131234567",
      id: 10338405,
      isUsed: false,
    },
  ],
  unusedCoupons: [
    {
      expDate: "1404/09/21",
      serial: "CReg692333523428",
      reduction: 25,
      minPrice: 0,
      maxPrice: 0,
      firstName: "علیرضا",
      lastName: "حسن زاده مقدم",
      mobile: "09017522794",
      id: 10338401,
      isUsed: false,
    },
    {
      expDate: "1404/08/15",
      serial: "CReg692333523430",
      reduction: 30,
      minPrice: 100000,
      maxPrice: 1000000,
      firstName: "فاطمه",
      lastName: "شریفی",
      mobile: "09384567234",
      id: 10338403,
      isUsed: false,
    },
    {
      expDate: "1404/11/05",
      serial: "CReg692333523431",
      reduction: 10,
      minPrice: 0,
      maxPrice: 200000,
      firstName: "زهرا",
      lastName: "کاظمی",
      mobile: "09214567389",
      id: 10338404,
      isUsed: true,
    },
    {
      expDate: "1404/07/25",
      serial: "CReg692333523432",
      reduction: 50,
      minPrice: 200000,
      maxPrice: 2000000,
      firstName: "محمد",
      lastName: "احمدی",
      mobile: "09131234567",
      id: 10338405,
      isUsed: false,
    },
  ],
};

const CouponsContainerList = () => {
  const items: TabsProps["items"] = [
    {
      key: "2",
      label: "استفاده شده",
      children: (
        <div className="w-full flex flex-col gap-[12px]">
          <TransitionGroup component="ul" className="space-y-2">
            {coupons.usedCoupons.map((item, index) => {
              return (
                <CSSTransition
                  key={index}
                  timeout={500}
                  classNames={clsx(style["fade"])}
                >
                  <CouponItem
                    key={index}
                    coupon={item}
                    index={index}
                    type={"used"}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      ),

      className: "!w-full",
      style: { width: "!100%" },
    },
    {
      key: "1",
      label: "کوپن های فعال",
      children: (
        <div className="w-full flex flex-col gap-[12px]">
          <TransitionGroup component="ul" className="space-y-2">
            {coupons.unusedCoupons.map((item, index) => {
              return (
                <CSSTransition
                  key={index}
                  timeout={500}
                  classNames={clsx(style["fade"])}
                >
                  <CouponItem
                    key={index}
                    coupon={item}
                    index={index}
                    type={"unused"}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      ),
    },
  ];
  return (
    <Tabs
      defaultActiveKey="1"
      centered
      destroyInactiveTabPane={true}
      items={items}
      rootClassName="!w-full"
      className={clsx(tabStyle["coupons-tabs_container"])}
      indicator={{ size: (origin) => origin - 80, align: "center" }}
    />
  );
};

export default CouponsContainerList;
