import { ProfileSliceType } from "@/redux/profile/profileSlice";
import { RootState } from "@/redux/store";
import { IClubStatusNew } from "@/types/club-status";
import { getLevelList } from "@/utils/levelsService";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
export type LevelState = "Done" | "Current" | "Next";
const useLevels = () => {
  const { info, loadingProfile } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );

  const [levels, setLevels] = useState<IClubStatusNew[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchClubLevels = useCallback(async () => {
    if (!info) return;
    setLoading(true);
    setError(false);

    try {
      const response = await getLevelList({ rankingId: "1" });
      setLevels(response.result || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [info]);

  useEffect(() => {
    if (!loadingProfile) {
      fetchClubLevels();
    }
  }, [loadingProfile, fetchClubLevels]);

  /**
   * Determines the state of each level based on user points.
   * @param {IClubStatusNew[]} levels - The list of levels.
   * @param {number} userPoints - The user's points.
   * @returns {Record<number, LevelState>} - A map of level IDs to their states.
   */
  const getLevelStates = useMemo(() => {
    return (levels: IClubStatusNew[]): Record<number, LevelState> => {
      const points = info?.immutable?.rankingPoints?.points ?? 0; // Ensure points is a valid number
      let stateSet = false; // Tracks if we've already assigned "Current"

      return levels.reduce((acc, level) => {
        if (points >= level.requiredPoints) {
          acc[level.id] = "Done"; // If points exceed level, it's "Done"
        } else if (!stateSet) {
          acc[level.id] = "Current"; // First level where points are below, set "Current"
          stateSet = true; // Prevent multiple "Current" levels
        } else {
          acc[level.id] = "Next"; // Remaining levels are "Next"
        }
        return acc;
      }, {} as Record<number, LevelState>);
    };
  }, [levels, info?.immutable?.rankingPoints?.points]);

  const getRemainingPointsAndPercent = (level: IClubStatusNew) => {
    const points = info?.immutable?.rankingPoints
      ? info?.immutable?.rankingPoints.points
      : 0; // Default to 0 if null/undefined
    const requiredPoints = level?.requiredPoints ?? 0; // Default to 0 if level is missing

    const remainingPoints = Math.max(requiredPoints - points, 0); // Ensure non-negative
    const remainingPercent =
      requiredPoints > 0 ? remainingPoints / requiredPoints : 0; // Avoid division by zero

    return [(1 - remainingPercent) * 100, remainingPoints];
  };
  return {
    loading,
    error,
    levels,
    info,
    getLevelStates,
    getRemainingPointsAndPercent,
  };
};

export default useLevels;
