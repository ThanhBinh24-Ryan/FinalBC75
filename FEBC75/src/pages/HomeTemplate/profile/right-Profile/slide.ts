import api from "../../../../services/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetProfileRight = createAsyncThunk(
    "profileRight/fetchProfileRight",
    async (_, { rejectWithValue }:any) => {
        try {
            const userData = localStorage.getItem("userData");
            if (!userData) {
              throw new Error("User chưa đăng nhập.");
            }
      
            const parsedUserData = JSON.parse(userData);
            const token = parsedUserData?.token;
      
            if (!token) {
              throw new Error("Token không hợp lệ hoặc đã hết hạn.");
            }
      
            const headers = {
              token: token, // Thêm token vào headers
              "Content-Type": "application/json",
            };
      
        const result = await api.get(`thue-cong-viec/lay-danh-sach-da-thue`,{headers});
        return result.data.content;
        } catch (err) {
        return rejectWithValue("err");
        }
    }
    );
    export type rightProfile = {
        id: number;
        ngayThue: string; // Ngày thuê (dạng ISO string)
        hoanThanh: boolean; // Trạng thái hoàn thành
        congViec: {
          id: number; // ID của công việc
          tenCongViec: string; // Tên công việc
          danhGia: number; // Đánh giá công việc (từ 0 đến 100)
          giaTien: number; // Giá tiền cho công việc (USD)
          nguoiTao: number; // ID của người tạo công việc
          hinhAnh: string; // URL hình ảnh của công việc
          moTa: string; // Mô tả chi tiết công việc
          maChiTietLoaiCongViec: number; // Mã chi tiết loại công việc
          moTaNgan: string; // Mô tả ngắn về công việc
          saoCongViec: number; // Số sao của công việc
        };
    };
    type AppState = {
        loading: boolean;
        data: rightProfile[] ;
        error: null | any;
    };
    const initialState : AppState = {
        loading: false,
        data: [],
        error: null,
    };
    export const profileRightProfile = createSlice({
        name: "profileRightProfile",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(fetProfileRight.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
            builder.addCase(fetProfileRight.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            });
            builder.addCase(fetProfileRight.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        },
    });
    export default profileRightProfile.reducer;