"use client";
import { useEffect } from "react";
import InoiceListItem from "./invoice-list-item";
import AOS from "aos";
import "aos/dist/aos.css";
import { IInvoice } from "@/types/invoice";
import style from "./invoice-list-style.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import clsx from "clsx";
interface InvoicesListContainerProps {
  data: IInvoice[];
}
const InvoicesListContainer: React.FC<InvoicesListContainerProps> = ({
  data,
}) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 300,
      offset: 0,
    });
  }, []);
  return (
    <div className="w-full flex flex-col gap-[12px]">
      <TransitionGroup component="ul" className="space-y-2">
        {data.map((item, index) => {
          return (
            <CSSTransition
              key={item.id}
              timeout={500}
              classNames={clsx(style["fade"])}
            >
              <>
                <InoiceListItem key={index} index={index} invoice={item} />
              </>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default InvoicesListContainer;
