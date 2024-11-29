"use client";

import dynamic from "next/dynamic";

// Lazy-load BannerSlidersComponent
const BannerSlidersComponent = dynamic(() => import("./banners-slider"), {
  ssr: false, // Disable SSR for this client-side component
  loading: () => <div>Loading banners...</div>, // Fallback while loading
});

export default BannerSlidersComponent;
