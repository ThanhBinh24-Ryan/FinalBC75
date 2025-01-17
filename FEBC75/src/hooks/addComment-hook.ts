import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCommentApi } from "../apis/add-comment-api";

export const useAddComment = (maCongViec: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-comment", maCongViec] });
    },
  });
};
