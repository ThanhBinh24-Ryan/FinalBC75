import api from "../../../services/apiServices";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
export const fetListDetailJob = createAsyncThunk(
    "detailJob/fetchListDetailJob",
    async (id: number, {rejectWithValue}) => {     
        try {
            const result = await api.get(`/cong-viec/lay-cong-viec-chi-tiet/${id}`);
            return result.data.content;
        } catch (err) {
            console.error("API Error:", err);
            return rejectWithValue(err);
        }
    }
);
export interface DetaiJob {
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
  
interface AppState {
  loading: boolean;
  data: DetaiJob[] | null;
  error: string | null;
}

const initialState: AppState = {
  loading: false,
  data: [],
  error: null,
};

const detailJobReducer = createSlice({
    name: "detailJobReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetListDetailJob.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetListDetailJob.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetListDetailJob.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error =  action.payload instanceof Error
            ? action.payload.message
            : "Unknown error occurred";;
        });
    },
});
export default detailJobReducer.reducer;
