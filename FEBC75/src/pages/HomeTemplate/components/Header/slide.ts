import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../../services/apiServices";

// Định nghĩa kiểu dữ liệu cho công việc
export interface Job {
  id: number;
  congViec: {
    id: number;
    tenCongViec: string;
    danhGia: number;
    giaTien: number;
    nguoiTao: number;
    hinhAnh: string;
    moTa: string;
    maChiTietLoaiCongViec: number;
    moTaNgan: string;
    saoCongViec: number;
  };
  tenLoaiCongViec: string;
  tenNhomChiTietLoai: string;
  tenChiTietLoai: string;
  tenNguoiTao: string;
  avatar: string;
}

// Thunk để lấy danh sách công việc theo tên
export const fetchListJob = createAsyncThunk(
    "listJob/fetchListJob",
    async (TenCongViec: string, { rejectWithValue }) => {
      try {
        const result = await api.get(`cong-viec/lay-danh-sach-cong-viec-theo-ten/${TenCongViec}`);
        console.log("API Response:", result.data); // Thêm log để kiểm tra phản hồi
        return result.data.content;
      } catch (err) {
        console.error("API Error:", err);
        return rejectWithValue(err);
      }
    }
  );
  
// Định nghĩa kiểu dữ liệu cho state
interface AppState {
  loading: boolean;
  data: Job[] | null;
  error: string | null;
}

const initialState: AppState = {
  loading: false,
  data: [],
  error: null,
};

const listJobReducer = createSlice({
    name: "listJobReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchListJob.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchListJob.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload || [];
        })
        .addCase(fetchListJob.rejected, (state, action) => {
          state.loading = false;
          state.error =
            action.payload instanceof Error
              ? action.payload.message
              : "Unknown error occurred";
        });
    },
  });
  
  export default listJobReducer.reducer;
  