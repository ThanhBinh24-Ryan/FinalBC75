import api from "./base";

export const searchApi = async (tenCongViec:string) => {
    try {
      const response = await api.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${tenCongViec}`);
      return response.data.content;
    } catch (error: any) {
      throw error.response;
    }
  };