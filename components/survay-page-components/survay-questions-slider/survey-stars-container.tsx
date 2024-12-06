"use client";
import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import clsx from "clsx";

const CUSTOM_ITEM_LABELS = ["بـــد", "متوسط", "خوب", "خیلی خوب", "عالی"];

interface CustomRateProps {
  score: number;
  index: number;
  getValue: (value: number) => void;
  reset: boolean;
}

const CustomRate: React.FC<CustomRateProps> = ({ score, getValue, reset }) => {
  const [currentValue, setCurrentValue] = useState(score);

  const handleChange = (value) => {
    setCurrentValue(value);
  };

  useEffect(() => {
    if (reset) {
      setCurrentValue(score);
    }
  }, [reset]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Rate
        value={currentValue}
        onChange={(value) => {
          handleChange(value);
          getValue(value);
        }}
        character={({ index }) =>
          currentValue >= index + 1 ||
          (currentValue > index && currentValue < index + 1) ? (
            <StarFilled className="hover:text-yellow-500 transition-all" />
          ) : (
            <StarOutlined className="hover:text-yellow-500 transition-all" />
          )
        }
        className={clsx("w-full !text-[40px] !flex justify-center gap-2")}
      />
      {currentValue ? (
        <span className="w-full text-center text-Secondary2 font-Medium">
          {CUSTOM_ITEM_LABELS[currentValue - 1]}
        </span>
      ) : null}
    </div>
  );
};

export default CustomRate;
