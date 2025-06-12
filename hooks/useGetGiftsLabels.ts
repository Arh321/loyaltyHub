import { RootState } from "@/redux/store";

import { getUserGiftCards } from "@/utils/giftAndCouponsService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const useUserGiftCards = () => {
  const { info } = useSelector((state: RootState) => state.profileSlice);
  return useQuery({
    queryKey: ["user-gift-cards", info.id],
    queryFn: () => getUserGiftCards({ customerId: info.id }),
    enabled: !!info,
    staleTime: 1000 * 60 * 5, // 5 دقیقه cache نگه داره
    retry: 1, // فقط یک بار تلاش مجدد
  });
};

export default useUserGiftCards;
