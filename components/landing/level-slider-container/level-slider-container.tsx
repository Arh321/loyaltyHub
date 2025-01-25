"use client";
import Image from "next/image";
import border from "../../../public/images/level-custom-border.webp";
import LevelSlidersComponent from "./level-slider-lazy";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProfileSliceType } from "@/redux/profile/profileSlice";
import { Skeleton } from "antd";
import { Suspense } from "react";

const CurrentLevelSliderContainer = () => {
  const { info, loadingProfile } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );
  return (
    <div className="w-full px-[25px]">
      <Suspense
        fallback={
          <div>
            <Skeleton.Node
              className="!flex !w-full !h-full aspect-square rounded-[10px]"
              active
            />
          </div>
        }
      >
        <div className="w-full aspect-[8/6] relative sm:px-5 sm:pt-3 lsm:px-4 lsm:pt-3 flex flex-col justify-end">
          <div className="w-full h-full absolute top-0 right-0 z-0">
            <Image src={border} className="w-full" alt="border" />
          </div>
          <div className="w-full flex flex-col pt-4 gap-0 items-center justify-center aspect-square rounded-t-full bg-Highlighter z-[1] shadow-lg rounded-b-[999px] overflow-hidden">
            {info && (
              <p className="font-Regular text-sm text-Primary">
                <span>
                  {info.mandatory.firstName} {info.mandatory.lastName}
                </span>
              </p>
            )}
            <div className="w-full aspect-[16/5]">
              <LevelSlidersComponent />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default CurrentLevelSliderContainer;
