import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "antd";
import clsx from "clsx";
import Image from "next/image";

type AntdLazyImageProps = {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  loadingPriority?: boolean;
  width?: number | string;
  height?: number | string;
  fallback?: string;
  onLoad?: () => void;
};

const AntdLazyImage: React.FC<AntdLazyImageProps> = ({
  src,
  alt = "",
  className = "",
  style = {},
  loadingPriority = false,
  width = "100",
  height = "100",
  fallback = "/placeholder.webp",
  onLoad,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(loadingPriority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (loadingPriority || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [loadingPriority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div
      ref={containerRef}
      style={{ width, height, position: "relative", ...style }}
      className={clsx("overflow-hidden", className)}
    >
      {!isLoaded && !hasError && (
        <div
          className="!flex !w-full !h-full  rounded-[10px] animate-skeleton"
          style={{ position: "absolute", inset: 0 }}
        />
      )}

      {isVisible && !hasError && (
        <Image
          src={src}
          alt={alt}
          loading={loadingPriority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          width={Number(width)}
          height={Number(height)}
          onError={handleError}
          className={clsx(
            "w-full h-full object-cover transition-opacity duration-500",
            {
              "opacity-0": !isLoaded,
              "opacity-100": isLoaded,
            }
          )}
          // style={{ display: isLoaded ? "block" : "none" }}
        />
      )}

      {hasError && (
        <Image
          src={fallback}
          width={100}
          height={100}
          alt="fallback"
          className="w-full h-full object-containe bg-Highlighter-hover rounded-[6px]"
          style={{ position: "absolute", inset: 0 }}
        />
      )}
    </div>
  );
};

export default AntdLazyImage;
