import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProduct,
  UpdateProductPayload,
} from "../data-fetching/updateProduct";
import { QUERY_KEYS } from "../../constants/types/queryKeys";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProductPayload) => updateProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GOODS] });
    },
  });
};
