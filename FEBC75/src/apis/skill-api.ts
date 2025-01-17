import { Skill } from "../types/Skill.type";
import api from "./base";

export const getSkillApi = async (): Promise<Skill[]> => {
  try {
    const response = await api.get("/skill");
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};
