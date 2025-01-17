import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../apis/search-api";

export const useSearch = (tenCongViec: string) => {
  return useQuery({
    queryKey: ["search", tenCongViec],
    queryFn: () => searchApi(tenCongViec),
  });
};
