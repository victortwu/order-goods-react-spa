import { useQuery } from "@tanstack/react-query";
import { getGoods } from "../data-fetching/getGoods";
import { QUERY_KEYS } from "../../constants/types/queryKeys";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useGetGoods = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GOODS],
    queryFn: getGoods,
    staleTime: FIVE_MINUTES,
  });
};
