import api from "./base";

export const jobdetailApi = async (maChiTietLoai:any) => {
    try {
      const response = await api.get(`/cong-viec/lay-cong-viec-chi-tiet/${maChiTietLoai}`);
      return response.data.content;
    } catch (error: any) {
      throw error.response;
    }
  };