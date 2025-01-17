import { useQuery } from "@tanstack/react-query";
import { listjobdetailApi } from "../apis/listJob-detail-api";

export const uselistjobdetail = (maChiTietLoai: number) => {
  return useQuery({
    queryKey: ["list-job-detail", maChiTietLoai],
    queryFn: () => listjobdetailApi(maChiTietLoai),
  });
};
