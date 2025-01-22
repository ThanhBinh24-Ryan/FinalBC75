import api from "../../../services/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetProfileLeft = createAsyncThunk( 
    "profileLeft/fetchProfileLeft",
    async (_, {rejectWithValue}) => {
        try {
            const result = await api.get(`thue-cong-viec/lay-danh-sach-da-thue`);
            return result.data.content;
        } catch (err) {
        
            return rejectWithValue( "Something went wrong");
        }
    }
);
