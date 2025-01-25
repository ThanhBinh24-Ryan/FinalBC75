import api from "../../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Tạo async thunk để xử lý đăng nhập
export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Gửi yêu cầu POST đến server với email và password
      const result = await api.post(`auth/signin`, credentials);

  
     const userData = result.data.content;
  
     localStorage.setItem("userData", JSON.stringify(userData)); 

     console.log("Login successful:", userData); // Log dữ liệu trả về
     return userData; // Trả về dữ liệu user và token
   
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

// Định nghĩa kiểu Login
export interface Login {
   
      user: {
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
      token: string;
  
  };
  


// Định nghĩa state ban đầu
interface AppState {
  loading: boolean;
  data: Login | null;
  error: string | null;
}

const initialState: AppState = {
  loading: false,
  data: null,
  error: null,
};

// Tạo slice
const loginReducer = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true; // Đang xử lý
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Lưu dữ liệu user và token
        console.log("Login successful:", action.payload); // Log dữ liệu user và token
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });
  },
});

export default loginReducer.reducer;
