import api from "./base";

export const listjobApi = async () => {
  try {
    const response = await api.get("/cong-viec/lay-menu-loai-cong-viec");
    return response.data.content;
  } catch (error: any) {
    throw error.response;
  }
};

export const listjobtypejobdetailApi = async (MaLoaiCongViec: number) => {
  try {
    const response = await api.get(
      `/cong-viec/lay-chi-tiet-loai-cong-viec/${MaLoaiCongViec}`
    );
    return response.data.content;
  } catch (error: any) {
    throw error.response;
  }
};
