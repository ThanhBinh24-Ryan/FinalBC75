import api from "./base";

export const dropdownApi = async (maLoaiCongViec: number) => {
  try {
    const response = await api.get(
      `/cong-viec/lay-chi-tiet-loai-cong-viec/${maLoaiCongViec}`
    );
    return response.data.content;
  } catch (error: any) {
    throw error.response;
  }
};
