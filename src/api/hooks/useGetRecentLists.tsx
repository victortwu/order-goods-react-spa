import { useQuery } from "@tanstack/react-query";
import { getRecentLists } from "../data-fetching/getRecentLists";

export const useGetRecentLists = (limit = 10) => {
  return useQuery({
    queryKey: ["recentLists", limit],
    queryFn: () => getRecentLists(limit),
  });
};
