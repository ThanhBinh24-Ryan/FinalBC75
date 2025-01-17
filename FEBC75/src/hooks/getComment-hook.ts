import { useQuery } from "@tanstack/react-query";
import { getCommentApi } from "../apis/get-comment-api";

export const useGetComment = (maCongViec: number) => {
  return useQuery({
    queryKey: ["get-comment", maCongViec],
    queryFn: () => getCommentApi(maCongViec),
  });
};
