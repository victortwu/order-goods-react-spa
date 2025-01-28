import { useQuery } from "@tanstack/react-query";
import { getGoods } from "../data-fetching/getGoods";
import { QUERY_KEYS } from "../../constants/types/queryKeys";

export const useGetGoods = () => {
  return useQuery({ queryKey: [QUERY_KEYS.GOODS], queryFn: getGoods });
};
