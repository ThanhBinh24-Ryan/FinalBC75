import api from "./../../../../services/apiServices";
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
export const fetchDetailMenu = createAsyncThunk(
    "detailMenu/fetchDetailMenu",
    async (id: number, { rejectWithValue }) => {
        try {
        const result = await api.get(`cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`);
        return result.data.content;
        } catch (err) {
        console.error("API Error:", err);
        return rejectWithValue(err);
        }
    }
)
export type detailMenu = {
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
    data: detailMenu[] | null;
    error: null | any;
};
const initialState: AppState ={
    loading: false,
    data: null,
    error: null,
}
const detailMenuReducer = createSlice({
    name: "detailMenuReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDetailMenu.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDetailMenu.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchDetailMenu.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    },
});
export default detailMenuReducer.reducer;