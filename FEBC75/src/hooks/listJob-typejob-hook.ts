import {
  listjobApi,
  listjobtypejobdetailApi,
} from "../apis/listJob-typejob-api";
import { MenuLoaiCongViec } from "../types/MenuLoaiCongViec.type";
import { useQuery } from "@tanstack/react-query";

export const useListJob = () => {
  return useQuery<MenuLoaiCongViec[], Error>({
    queryKey: ["list-job"],
    queryFn: listjobApi,
  });
};

export const uselistjobtypejobdetail = (MaLoaiCongViec: number) => {
  return useQuery({
    queryKey: ["listjob-typejob-detail", MaLoaiCongViec],
    queryFn: () => listjobtypejobdetailApi(MaLoaiCongViec),
  });
};
