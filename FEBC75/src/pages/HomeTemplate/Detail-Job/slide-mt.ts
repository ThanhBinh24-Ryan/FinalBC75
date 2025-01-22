import api from "../../../services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetAddComments = createAsyncThunk(
    "addComments/fetchAddComments",
    async (data: any, { rejectWithValue }) => {
      try {
        const userData = localStorage.getItem("userData");
        if (!userData) {
          console.error("User data không tồn tại trong localStorage.");
          return rejectWithValue("User data không tồn tại trong localStorage.");
        }
  
        const parsedUserData = JSON.parse(userData);
        const token = parsedUserData?.token;
  
        if (!token) {
          console.error("Token không hợp lệ hoặc đã hết hạn.");
          return rejectWithValue("Token không hợp lệ hoặc đã hết hạn.");
        }
        
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
  
        console.log("Headers:", headers);
        console.log("Payload:", data);
  
        const result = await api.post("binh-luan", data, { headers });
        console.log("API Response:", result.data);
        return result.data.content;
      } catch (err: any) {
        console.error("API Error:", err.response || err.message);
        return rejectWithValue(
          err.response?.data?.message || "Something went wrong"
        );
      }
    }
  );

export interface AddComments {
  id: number;
  maCongViec: any;
  maNguoiBinhLuan: number;
  ngayBinhLuan: Date;
  noiDung: string;
  saoBinhLuan: number;
}

type AppState = {
  loading: boolean;
  data: AddComments[] | null;
  error: null | { message: string; statusCode: number };
};

const initialState: AppState = {
  loading: false,
  data: null,
  error: null,
};

const addCommentsReducer = createSlice({
  name: "addCommentsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetAddComments.pending, (state) => {
      state.loading = true;
      state.error = null; // Reset error when starting a new request
    });
    builder.addCase(fetAddComments.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data ? [...state.data, action.payload] : [action.payload]; // Append new comment to existing data
      state.error = null;
    });
    builder.addCase(fetAddComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: string; statusCode: number }; // Store serialized error
      console.error("Rejected action payload:", action.payload);
    });
  },
});

export default addCommentsReducer.reducer;
