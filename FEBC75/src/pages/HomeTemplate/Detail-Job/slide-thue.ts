import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/apiServices";
 export const fetListThue = createAsyncThunk(
    "listThue/fetchListThue",
    async (id: number, {rejectWithValue}) => {     
        try {
            const result = await api.get(`/cong-viec/lay-cong-viec-chi-tiet/${id}`);
            return result.data.content;
        } catch (err) {
            console.error("API Error:", err);
            return rejectWithValue(err);
        }
    }
 )