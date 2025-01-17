import { useQuery } from "@tanstack/react-query";
import { jobdetailApi } from "../apis/jobdetail-api";

export const usejobdetail = (maChiTietLoai: number) => {
  return useQuery({
    queryKey: ["job-detail", maChiTietLoai],
    queryFn: () => jobdetailApi(maChiTietLoai),
  });
};
