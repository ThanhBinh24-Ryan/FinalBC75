import { useQuery } from "@tanstack/react-query";
import { getSkillApi } from "../apis/skill-api";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkillApi,
  });
};
