import api from "./base";


  
export const listjobSearchApi = async (TenCongViec:any) => {
    try {
      const response = await api.get(`cong-viec/lay-danh-sach-cong-viec-theo-ten/${TenCongViec}`);
      return response.data.content;
    } catch (error: any) {
      throw error.response;
    }
  };