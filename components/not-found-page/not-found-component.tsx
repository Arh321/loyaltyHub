import Image, { StaticImageData } from "next/image";
import React from "react";

interface NotFoundComponentProps {
  topic?: string;
  title: string;
  image?: string | StaticImageData;
}

const NotFoundComponent: React.FC<NotFoundComponentProps> = ({
  title,
  image,
  topic,
}) => {
  return (
    <div className="w-full h-[90%] flex flex-col items-center justify-center gap-4">
      <Image src={image ? image : "/images/Group.png"} alt="" className="" />
      <p className="w-full flex flex-col items-center justify-center gap-[10px]">
        <span className="bold-16">{topic ? topic : "متاسفیم!"} </span>
        <span className="w-1/2 flex flex-col gap-2 text-tertiary regular-14 text-center">
          {title}
        </span>
      </p>
    </div>
  );
};

export default NotFoundComponent;
