import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createList } from "../data-fetching/createList";
import { QUERY_KEYS } from "../../constants/types/queryKeys";

export const useCreateList = () => {
  const { invalidateQueries } = useQueryClient();
  return useMutation({
    mutationFn: createList,
    onSuccess: () => invalidateQueries({ queryKey: [QUERY_KEYS.LISTS] }),
  });
};
