import { useQuery } from "@tanstack/react-query";
import { dropdownApi } from "../apis/dropdown-api";

export const useDropdown = (maLoaiCongViec: number) => {
  return useQuery({
    queryKey: ["dropdown", maLoaiCongViec],
    queryFn: () => dropdownApi(maLoaiCongViec),
  });
};
