import { useMutation, useQueryClient } from "@tanstack/react-query";
import { hireJobApi } from "../apis/button-hirejob-api";

export const useHireJob = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: hireJobApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hire-job"] }).then(() => {
        if (onSuccess) onSuccess();
      });
    },
    onError: onError,
  });
};
