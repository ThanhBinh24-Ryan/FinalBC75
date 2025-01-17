import api from "./base";

export const hireJobApi = async (payload: {
  maCongViec: any;
  maNguoiThue: number | undefined;
  ngayThue: string;
  hoanThanh: boolean;
}) => {
  try {
    const response = await api.post("/thue-cong-viec", payload);
    return response.data.content;
  } catch (error: any) {
    throw error.response.data.content;
  }
};
