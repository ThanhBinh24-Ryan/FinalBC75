import { CongViec } from "../types/CongViec.type";
import api from "./base";

export const getAllJobsApi = async () => {
  try {
    const response = await api.get("/cong-viec");
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getAllJobTypesApi = async () => {
  try {
    const response = await api.get("/loai-cong-viec");
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const addJobApi = async (payload: Omit<CongViec, "id">) => {
  try {
    const response = await api.post("/cong-viec", payload);
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateJobApi = async ({
  jobId,
  payload,
}: {
  jobId: number;
  payload: Partial<CongViec>;
}) => {
  try {
    const response = await api.put(`/cong-viec/${jobId}`, payload);
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteJobApi = async (id: number) => {
  try {
    const response = await api.delete(`/cong-viec/${id}`);
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getAllServicesApi = async () => {
  try {
    const response = await api.get("/thue-cong-viec");
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const addServiceApi = async (payload: {
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
}) => {
  try {
    const response = await api.post("/thue-cong-viec", payload);
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getHiredJobsApi = async () => {
  try {
    const response = await api.get("/thue-cong-viec/lay-danh-sach-da-thue");
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteHiredJobApi = async (id: any) => {
  try {
    const response = await api.delete(`/thue-cong-viec/${id}`);
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};
