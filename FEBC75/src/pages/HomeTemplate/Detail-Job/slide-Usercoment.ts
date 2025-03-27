// export default addCommentsReducer.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/apiServices"; // Đảm bảo file API service được cấu hình đúng

// Interface cho bình luận
export interface AddComments {
  id: number;
  maCongViec: any;
  maNguoiBinhLuan: number;
  ngayBinhLuan: Date;
  noiDung: string;
  saoBinhLuan: number;
}

// Kiểu trạng thái của Redux store
type AppState = {
  loading: boolean;
  data: AddComments[]; // Khởi tạo là mảng, không phải null
  error: null | { message: string; statusCode: number }; // Lỗi phải có đầy đủ thông tin
};

// Trạng thái ban đầu
const initialState: AppState = {
  loading: false,
  data: [], // Khởi tạo là mảng rỗng để tránh lỗi null
  error: null,
};

// Async thunk để thêm bình luận
export const fetAddComments = createAsyncThunk(
  "addComments/fetchAddComments",
  async (commentData: any, { rejectWithValue }) => {
    try {
      // Lấy thông tin user từ localStorage
      const userData = localStorage.getItem("userData");
      if (!userData) {
        throw new Error("User data không tồn tại trong localStorage.");
      }

      const parsedUserData = JSON.parse(userData);
      const token = parsedUserData?.token;

      if (!token) {
        throw new Error("Token không hợp lệ hoặc đã hết hạn.");
      }

      // Tạo headers cho request
      const headers = {
        token: token, // Đúng theo tài liệu API
        "Content-Type": "application/json",
      };

      console.log("Headers:", headers);
      console.log("Payload:", commentData);

      // Gửi yêu cầu POST đến API
      const response = await api.post("binh-luan", commentData, { headers });

      // Trả về nội dung phản hồi từ API
      console.log("API Response:", response.data);
      return response.data.content;
    } catch (error: any) {
      console.error("API Error:", error.response || error.message);
      // Trả về lỗi dưới dạng rejectWithValue để lưu trong Redux
      return rejectWithValue(
        error.response?.data?.message || "Đã xảy ra lỗi khi thêm bình luận."
      );
    }
  }
);

// Slice để quản lý trạng thái thêm bình luận
const addCommentsReducer = createSlice({
  name: "addCommentsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái khi gọi API đang chờ
      .addCase(fetAddComments.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset lỗi trước đó
      })
      // Xử lý trạng thái khi API thành công
      .addCase(fetAddComments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload]; // Append comment mới
        state.error = null; // Reset lỗi
      })
      // Xử lý trạng thái khi API thất bại
      .addCase(fetAddComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as { message: string; statusCode: number })
          : {
              message: "Unknown error occurred",
              statusCode: 500,
            }; // Cung cấp lỗi mặc định
        console.error("Rejected action payload:", action.payload);
      });
  },
});

export default addCommentsReducer.reducer;
