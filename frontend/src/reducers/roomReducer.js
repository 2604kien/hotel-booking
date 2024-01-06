import { createEntityAdapter, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../config/serverURL";

const roomAdapter=createEntityAdapter();
const initialState=roomAdapter.getInitialState({});

export const getAllRoom=createAsyncThunk('room/getAllRoom', async()=>{
    const response=await axios.get(server+"room");
    return response.data;
})
const roomSlice=createSlice({
    name:'room',
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getAllRoom.fulfilled, (state, action)=>{
            state.entities=action.payload;
        })
    }
})
export default roomSlice.reducer;