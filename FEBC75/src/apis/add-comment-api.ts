import api from "./base";

export const addCommentApi = async (payload: {
  maNguoiBinhLuan: number;
  noiDung: string;
  ngayBinhLuan: string;
  saoBinhLuan: number;
  maCongViec: any;
}) => {
  try {
    const response = await api.post("/binh-luan", payload);
    return response.data.content;
  } catch (error: any) {
    throw error.response.data.content;
  }
};
