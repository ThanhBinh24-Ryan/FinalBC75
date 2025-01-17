import { useQuery } from "@tanstack/react-query";
import { listjobSearchApi } from "../apis/listJob-search-api";

export const uselistjobsearch = (TenCongViec: any) => {
  return useQuery({
    queryKey: ["list-job-search", TenCongViec],
    queryFn: () => listjobSearchApi(TenCongViec),
  });
};
