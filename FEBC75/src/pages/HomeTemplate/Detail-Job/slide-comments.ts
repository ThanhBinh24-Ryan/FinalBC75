import api from "../../../services/apiServices";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
export const fetListComments = createAsyncThunk(
    "listComments/fetchListComments",
    async (id: number, {rejectWithValue}) => {     
        try {
            const result = await api.get(`binh-luan/lay-binh-luan-theo-cong-viec/${id}`);
            return result.data.content;
        } catch (err) {
          
            return rejectWithValue(err);
        }
    }
);
export interface Comment {
    id: string; // ID của bình luận
    ngayBinhLuan: string; // Ngày bình luận
    noiDung: string; // Nội dung bình luận
    saoBinhLuan: number; // Số sao của bình luận
    tenNguoiBinhLuan: string; // Tên người bình luận
    avatar: string; // Avatar của người bình luận
  }
  
  
interface AppState {
  loading: boolean;
  data: Comment[] | null;
  error: string | null;
}

const initialState: AppState = {
  loading: false,
  data: [],
  error: null ,
};
const listCommentsReducer = createSlice({   
    name: "listCommentsReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetListComments.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(fetListComments.fulfilled, (state, action) => {
          console.log("Payload received in fulfilled:", action.payload);
          state.loading = false;
          state.data = action.payload; // Dữ liệu phải là mảng
        });
        builder.addCase(fetListComments.rejected, (state, action) => {
          console.error("Error in fetchListComments:", action.payload);
          state.loading = false;
          state.error = action.payload as string;
        });
      },
      
});
export default listCommentsReducer.reducer;