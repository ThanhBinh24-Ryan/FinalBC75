import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit";
import api from "./../../../../services/apiServices";
export const fetchListMenu = createAsyncThunk(  "listMenu/fetchListMenu",  async (_, { rejectWithValue }) => { 
    try {
        const result = await api.get("cong-viec/lay-menu-loai-cong-viec");
        return result.data.content;

    }catch (err) {
        console.error("API Error:", err);
        return rejectWithValue(err);
    }
 });
 export type Menu = {
    id: number;
    tenLoaiCongViec: string;
    dsNhomChiTietLoai: {
      id: number;
      tenNhom: string;
      hinhAnh: string;
      maLoaiCongviec: number;
      dsChiTietLoai: {
        id: number;
        tenChiTiet: string;
      }[];
    }[];
  };

type AppState = {   
    loading: boolean;
    data: Menu[] | null;
    error: null | any;
};
const initialState: AppState ={
    loading: false,
    data: null,
    error: null,
}
const listMenuReducer = createSlice({
    name: "listMenuReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchListMenu.pending, (state) => {
                state.loading = true;
             
            });
            builder.addCase(fetchListMenu.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            });
            builder.addCase(fetchListMenu.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export default listMenuReducer.reducer;