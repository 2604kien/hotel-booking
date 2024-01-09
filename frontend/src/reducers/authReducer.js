import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {server} from "../config/serverURL"
import axios from "axios"
const authAdapter=createEntityAdapter();
const initialState=authAdapter.getInitialState({
    token:"",
    currUser:"",
    isAuthenticated:false,
    roles:[],
    serverMessage:""
});

export const login=createAsyncThunk('auth/login', async(data)=>{
    const response= await axios.post(server+"auth/login", data, {withCredentials:true})
    return response.data;
})
export const logout=createAsyncThunk('auth/logout', async()=>{
    const response=await axios.post(server+"auth/logout",{}, {withCredentials:true});
    return response.data;
})
export const refresh=createAsyncThunk('auth/refresh', async ()=>{
    const response=await axios.post(server+"auth/refresh",{},{withCredentials:true});
    return response.data;
})
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        resetMessage:(state)=>{
            state.serverMessage=""
        }
    },
    extraReducers: builder=>{
        builder.addCase(login.fulfilled, (state, action)=>{
            state.token=action.payload.accessToken;
            state.roles=JSON.parse(window.atob(state.token.split('.')[1])).UserInfo.roles
            state.isAuthenticated=true;
        })
        .addCase(logout.fulfilled, (state, action)=>{
            state.isAuthenticated=false;
            state.roles=[];
            state.token="";
        })
        .addCase(refresh.fulfilled,(state, action)=>{
            state.token=action.payload.accessToken;
            state.isAuthenticated=true;
            state.roles=(state.token && state.token.length>0)?JSON.parse(window.atob(state.token.split('.')[1])).UserInfo.roles:[""]
        })
    }
})
export const {resetMessage}=authSlice.actions;
export default authSlice.reducer;