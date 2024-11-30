"use client";
import { GiftIcon } from "@/components/sharedIcons/sharedIcons";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";

const GiftsSummeryComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <div className="col-span-1 w-full aspect-square">
      <GiftIcon width="2rem" height="2rem" color="var(--Secondary2)" />
      <p>{loading && <Skeleton.Node active className="w-12 h-3" />}</p>
    </div>
  );
};

export default GiftsSummeryComponent;
