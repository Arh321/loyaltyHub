"use client";
import AppLoading from "@/app/loading";
import { usePathname } from "next/navigation";

import { useEffect, useState, useTransition } from "react";

export default function LoadingIndicator() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname(); // Reactively tracks the current route.

  useEffect(() => {
    // Trigger loading indicator on route change
    startTransition(() => {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false); // Clear the loading state after a short delay
      }, 500);

      return () => clearTimeout(timer); // Cleanup timer
    });
  }, [pathname, startTransition]);

  if (!isLoading) return null;

  return <AppLoading />;
}
