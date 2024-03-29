import { createEntityAdapter, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../config/serverURL";

const roomAdapter=createEntityAdapter();
const initialState=roomAdapter.getInitialState({
    currRoom:""
});

export const getAllRoom=createAsyncThunk('room/getAllRoom', async()=>{
    const response=await axios.get(server+"room");
    return response.data;
})
export const getRoomById=createAsyncThunk('room/getRoomById', async ({id, token})=>{
    const config={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(server+`room/${id}`, config);
    return response.data;
})
export const createNewRoom=createAsyncThunk('room/createNewRoom', async({data, files, token})=>{
    const formData = new FormData();
    const config={
        headers:{
            authorization: `Bearer ${token}`
        }
    }
    files.forEach((file) => {
        formData.append('files', file);
    });
    console.log(data)
    
    await axios.post(server+'room/upload', formData, config);
    const response=await axios.post(server+'room', data, config);
    return response.data;
})
export const deleteRoom=createAsyncThunk('room/deleteRoom', async({id, token})=>{
    const config={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.delete(server+`room/${id}`, config);
    return response.data;
})
export const updateRoomById=createAsyncThunk('room/updateRoomById', async({id, data, token})=>{
    const config={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.put(server+`room/${id}`, data, config)
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
        .addCase(getRoomById.fulfilled, (state, action)=>{
            state.currRoom=action.payload;
        })
    }
})
export default roomSlice.reducer;
export const {filterRoom}=roomSlice.actions;