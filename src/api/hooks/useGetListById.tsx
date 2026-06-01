import { useQuery } from "@tanstack/react-query";
import { getListById } from "../data-fetching/getListById";

export const useGetListById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["list", id],
    queryFn: () => getListById(id!),
    enabled: !!id,
  });
};
