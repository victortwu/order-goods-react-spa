import { useQuery } from "@tanstack/react-query";
import { getGoods } from "../data-fetching/getGoods";

export const useGetGoods = () => {
  return useQuery({ queryKey: ["goods"], queryFn: getGoods });
};
