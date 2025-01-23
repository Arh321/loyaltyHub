"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./ImageWithLoader.module.css"; // CSS for transitions
import logo from "../../public/images/hosseiniLogo.webp";
import clsx from "clsx";
import { Skeleton } from "antd";
const ImageWithLoader = ({
  src,
  alt,
  width,
  height,
  imageClass,
  placeholder = logo, // Path to your placeholder image in public folder
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  imageClass: string;
  placeholder?: StaticImageData;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={clsx(styles.imageWrapper, imageClass)}>
      {/* Placeholder image */}
      {!isLoaded && <Skeleton.Node active className="!w-full !h-full" />}

      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={handleImageLoad}
        className={`${styles.image} ${isLoaded ? styles.visible : ""}`} // Show actual image once loaded
        loading="lazy" // Enable lazy loading
      />
    </div>
  );
};

export default ImageWithLoader;
