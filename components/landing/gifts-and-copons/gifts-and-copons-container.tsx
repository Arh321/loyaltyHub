import { Skeleton } from "antd";
import React, { Suspense } from "react";

const GiftsSummeryComponent = React.lazy(() => import("./gifts-summery"));
const CoponsSummeryComponent = React.lazy(() => import("./copon-summery"));

const GiftsAndCoponsContainerComponent = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-[20px]">
      <Suspense
        fallback={
          <Skeleton
            className="!flex !w-full !h-full aspect-square rounded-[10px]"
            active
          />
        }
      >
        <GiftsSummeryComponent />
        <CoponsSummeryComponent />
      </Suspense>
    </div>
  );
};

export default GiftsAndCoponsContainerComponent;
