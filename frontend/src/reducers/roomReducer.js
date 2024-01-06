import { createEntityAdapter, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../config/serverURL";

const roomAdapter=createEntityAdapter();
const initialState=roomAdapter.getInitialState({});

export const getAllRoom=createAsyncThunk('room/getAllRoom', async()=>{
    const response=await axios.get(server+"room");
    return response.data;
})
export const createNewRoom=createAsyncThunk('room/createNewRoom', async(data)=>{
    const response=await axios.post(server+'room', data);
    return response.data;
})
const roomSlice=createSlice({
    name:'room',
    initialState,
    reducers:{
        filterRoom(state, action){
            state.entities=action.payload;
        }
    },
    extraReducers:builder=>{
        builder.addCase(getAllRoom.fulfilled, (state, action)=>{
            state.entities=action.payload;
            state.clone=action.payload;
        })
    }
})
export default roomSlice.reducer;
export const {filterRoom}=roomSlice.actions;