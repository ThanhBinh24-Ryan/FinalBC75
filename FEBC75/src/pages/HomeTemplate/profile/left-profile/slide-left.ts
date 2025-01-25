import api from "../../../../services/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// AsyncThunk để lấy dữ liệu profile từ API
export const fetProfileLeft = createAsyncThunk(
  "profileLeft/fetchProfileLeft",
  async (id: number, { rejectWithValue }) => {
    try {
      const result = await api.get(`users/${id}`);
      return result.data.content; // Dữ liệu được trả về từ API
    } catch (err) {
      return rejectWithValue("Something went wrong");
    }
  }
);

// Định nghĩa kiểu dữ liệu cho profile
export type leftProfile = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
  bookingJob: any[];
};

// Định nghĩa kiểu dữ liệu của state
type AppState = {
  loading: boolean;
  data: leftProfile | null;
  error: null | any;
};

// Trạng thái ban đầu
const initialState: AppState = {
  loading: false,
  data: null,
  error: null,
};

// Slice để quản lý state và các reducers
const fetchProfileLeft = createSlice({
  name: "fetchProfileLeft",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetProfileLeft.pending, (state) => {
      state.loading = true;
      state.error = null; // Reset lỗi trước đó
    });
    builder.addCase(fetProfileLeft.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload; // Lưu dữ liệu thành công
      state.error = null;
    });
    builder.addCase(fetProfileLeft.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload; // Lưu lỗi
    });
  },
});

export default fetchProfileLeft.reducer;
