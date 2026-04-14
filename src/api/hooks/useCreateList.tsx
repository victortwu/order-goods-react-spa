import { useMutation } from "@tanstack/react-query";
import { createList } from "../data-fetching/createList";

export const useCreateList = () => {
  return useMutation({
    mutationFn: createList,
  });
};
