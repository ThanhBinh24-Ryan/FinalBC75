import api from "./../../../services/apiServices";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
export const fetListForID = createAsyncThunk(
    "ListID/fetListForID",
    async (id: number, {rejectWithValue}) => {
        try {
            const result = await api.get(`cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`);
            return result.data.content;
        } catch (err) {
            console.error("API Error:", err);
            return rejectWithValue(err);
        }
    }
)
export type ForID = {
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
  };
  
type AppState = {   
    loading: boolean;
    data: ForID[] | null;
    error: null | any;
};
const initialState: AppState ={
    loading: false,
    data: null,
    error: null,
}
const listForIDReducer = createSlice({  
    name: "listForIDReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetListForID.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetListForID.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetListForID.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    },
});
export default listForIDReducer.reducer