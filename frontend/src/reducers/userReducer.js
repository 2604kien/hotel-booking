import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../config/serverURL";

export let message;
const userAdapter=createEntityAdapter({});
const initialState=userAdapter.getInitialState({
    serverMessage:""
});
export const getAllUser=createAsyncThunk('user/getAllUser', async()=>{
    const response = await axios.get(server+'user');
    return response.data
})
export const createUser=createAsyncThunk('user/createUser', async(data)=>{
    const response=await axios.post(server+'user', data).catch(error=>{message=error.response.data.message});
    
    return response.data;
})
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        resetMessage:(state)=>{
            state.serverMessage="";
        }
    },
    extraReducers: builder=>{
        builder.addCase(getAllUser.fulfilled, (state, action)=>{
            state.entities=action.payload;
        })
        .addCase(createUser.rejected, (state, action)=>{
            state.serverMessage=message;
        })
        .addCase(createUser.fulfilled, (state, action)=>{
            state.serverMessage="You are successfully registed, please login."
        })
    }
})
export default userSlice.reducer;
export const {resetMessage}=userSlice.actions;