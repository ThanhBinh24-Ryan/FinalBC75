import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/apiServices";

// AsyncThunk để gọi API và xử lý lỗi Axios
export const fetListThue = createAsyncThunk(
  "listThue/fetchListThue",
  async ({ data, headers }: { data: any; headers: any }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return rejectWithValue({
          message: "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.",
          statusCode: 401,
        });
      }

      const requestHeaders = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };

      const response = await api.post("/thue-cong-viec", data, { headers: requestHeaders });
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      // Chuyển lỗi Axios thành dữ liệu tuần tự hóa
      const serializedError = {
        message: error.response?.data?.message || error.message || "Lỗi không xác định",
        statusCode: error.response?.status || 500,
        details: error.response?.data || null,
      };
      return rejectWithValue(serializedError);
    }
  }
);

// Loại dữ liệu của công việc được thuê
export type CongViecDuocThue = {
  id?: number;
  maCongViec?: number;
  maNguoiThue?: number;
  ngayThue?: Date;
  hoanThanh?: boolean;
};

// Kiểu dữ liệu của state
type AppState = {
  loading: boolean;
  data: CongViecDuocThue[] | null;
  error: null | { message: string; statusCode: number; details?: any };
};

// Trạng thái khởi tạo
const initialState: AppState = {
  loading: false,
  data: null,
  error: null,
};

// Slice để quản lý state
const listThueReducer = createSlice({
  name: "listThueReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetListThue.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset lỗi khi bắt đầu request mới
      })
      .addCase(fetListThue.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetListThue.rejected, (state, action) => {
        state.loading = false;
        // Lưu dữ liệu lỗi tuần tự hóa
        state.error = action.payload as { message: string; statusCode: number; details?: any };
      });
  },
});

export default listThueReducer.reducer;
