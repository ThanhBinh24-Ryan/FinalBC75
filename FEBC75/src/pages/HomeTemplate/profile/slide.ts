import api from "../../../services/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchProfileRight = createAsyncThunk(
    "profileR/fetchProfileRight",
    async (id: number, { rejectWithValue }) => {
        try {
        const result = await api.get(`user/${id}`);
        return result.data.content;
        } catch (err: any) {
        console.error("Fetch profile right failed:", err.response?.data || err.message);
        return rejectWithValue(err.response?.data?.message || "Something went wrong");
        }
    }
    );
export interface ProfileRight {
    statusCode: number;
    content: {
        user: {
        id: number;
        name: string;
        email: string;
        phone: string;
        birthday: string;
        avatar: string; 
            
        };
    };
    dateTime: string;
}
interface AppState {
    loading: boolean;
    data: ProfileRight | null;
    error: string | null;
}
const initialState: AppState = {
    loading: false,
    data: null,
    error: null,
};
const profileRightSlice = createSlice({
    name: "profileR",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProfileRight.pending, (state) => {
        state.loading = true;
        });
        builder.addCase(fetchProfileRight.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        });
        builder.addCase(fetchProfileRight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        });
    },
});
export default profileRightSlice.reducer;