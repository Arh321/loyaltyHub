"use client";

import { Skeleton } from "antd";
import dynamic from "next/dynamic";

// Lazy-load BannerSlidersComponent
const LevelSlidersComponent = dynamic(() => import("./level-slider"), {
  ssr: false, // Disable SSR for this client-side component
  loading: () => (
    <div>
      <Skeleton.Node
        className="!flex !w-full !h-full aspect-square rounded-[10px]"
        active
      />
    </div>
  ), // Fallback while loading
});

export default LevelSlidersComponent;
