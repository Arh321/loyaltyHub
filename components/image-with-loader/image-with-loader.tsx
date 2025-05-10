import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "antd";
import clsx from "clsx";

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
  width = "100%",
  height = "auto",
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
        <Skeleton.Image
          active
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
          }}
        />
      )}

      {isVisible && !hasError && (
        <img
          src={src}
          alt={alt}
          loading={loadingPriority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
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
        <img
          src={fallback}
          alt="fallback"
          className="w-full h-full object-cover"
          style={{ position: "absolute", inset: 0 }}
        />
      )}
    </div>
  );
};

export default AntdLazyImage;
