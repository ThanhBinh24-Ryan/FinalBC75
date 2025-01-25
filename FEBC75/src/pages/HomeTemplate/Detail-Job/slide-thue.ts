import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/apiServices";

// AsyncThunk để gọi API thuê công việc
export const fetListThue = createAsyncThunk(
  "listThue/fetchListThue",
  async (data: any, { rejectWithValue }) => {
    try {
      // Lấy token từ localStorage
      const userData = localStorage.getItem("userData");
      if (!userData) {
        throw new Error("User data không tồn tại trong localStorage.");
      }

      const parsedUserData = JSON.parse(userData);
      const token = parsedUserData?.token;

      if (!token) {
        throw new Error("Token không hợp lệ hoặc đã hết hạn.");
      }

      // Headers cho request
      const headers = {
        token: token, // Sử dụng "Token" theo yêu cầu API
        "Content-Type": "application/json",
      };

      console.log("Headers gửi lên server:", headers);
      console.log("Payload gửi lên server:", data);

      // Gửi request POST đến API
      const response = await api.post("thue-cong-viec", data, { headers });

      // Trả về dữ liệu từ server
      console.log("API Response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);

      // Xử lý lỗi và trả về reject
      return rejectWithValue({
        message: error.response?.data?.message || error.message || "Lỗi không xác định",
        statusCode: error.response?.status || 500,
        details: error.response?.data || null,
      });
    }
  }
);

// Loại dữ liệu của công việc được thuê
export type CongViecDuocThue = {
  id: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: Date;
  hoanThanh: boolean;
};

// Kiểu dữ liệu của state
type AppState = {
  loading: boolean;
  data: CongViecDuocThue[] ;
  error: null | { message: string; statusCode: number; details?: any };
};

// Trạng thái khởi tạo
const initialState: AppState = {
  loading: false,
  data: [],
  error: null,
};

// Slice để quản lý state
const listThueReducer = createSlice({
  name: "listThueReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái khi bắt đầu request
      .addCase(fetListThue.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset lỗi trước đó
      })
      // Xử lý trạng thái khi request thành công
      .addCase(fetListThue.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data ? [...state.data, action.payload] : [action.payload]; // Append công việc mới vào danh sách
        state.error = null; // Reset lỗi
      })
      // Xử lý trạng thái khi request thất bại
      .addCase(fetListThue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { message: string; statusCode: number; details?: any }; // Lưu lỗi tuần tự hóa
      });
  },
});

export default listThueReducer.reducer;
