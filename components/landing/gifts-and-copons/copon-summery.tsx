"use client";
import { CoponIcons } from "@/components/sharedIcons/sharedIcons";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";

const CoponsSummeryComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <div className="col-span-1 w-full aspect-square bg-Highlighter rounded-[10px]">
      <span>
        <CoponIcons width="72" height="38" />
      </span>
      <p>{loading && <Skeleton.Node active className="w-12 h-3" />}</p>
    </div>
  );
};

export default CoponsSummeryComponent;
