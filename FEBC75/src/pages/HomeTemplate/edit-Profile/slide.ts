import api from "../../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetEditProfile = createAsyncThunk(
  "editProfile/fetchEditProfile",
  async (data: any, { rejectWithValue }) => {
    try {
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

      const result = await api.put(`users/${data.id}`, data, { headers });
      return result.data.content;
    } catch (err: any) {
      console.error("API Error:", err);
      // Chỉ trả về thông báo lỗi thay vì đối tượng lỗi đầy đủ
      return rejectWithValue(err?.response?.data || err.message || "Đã xảy ra lỗi");
    }
  }
);

export type EditProfile = {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: true;
  role: string;
  skill: string[];
  certification: string[];
};

type AppState = {
  loading: boolean;
  data: EditProfile[];
  error: null | string; // Lưu thông báo lỗi dưới dạng string
};

const initialState: AppState = {
  loading: false,
  data: [],
  error: null,
};

export const editProfileReducer = createSlice({
  name: "editProfileReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetEditProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetEditProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetEditProfile.rejected, (state, action) => {
      state.loading = false;
      // Lưu chỉ thông báo lỗi dạng chuỗi
      state.error = action.payload as string;
    });
  },
});

export default editProfileReducer.reducer;
