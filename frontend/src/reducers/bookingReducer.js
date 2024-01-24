import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../config/serverURL";

const bookingAdapter=createEntityAdapter();
const initialState=bookingAdapter.getInitialState({
    currBooking:""
});

export const getAllBooking=createAsyncThunk('booking/getAllBooking', async(token)=>{
    const config={
        headers:{
            authorization: `Bearer ${token}`
        }
    }
    const response=await axios.get(server+"booking", config);
    return response.data;
})
export const getBookingById=createAsyncThunk('booking/getBookingById', async({id,token})=>{
    const config={
        headers:{
            authorization: `Bearer ${token}`
        }
    }
    const response=await axios.get(server+`booking/${id}`, config);
    return response.data;
})
export const addBooking=createAsyncThunk('booking/addBooking', async({data, token, price})=>{
    const config={
        headers:{
            authorization: `Bearer ${token}`
        }
    }
    data.price=price;
    const response=await axios.post(server+"booking", data, config);
    return response.data;
})
export const deleteBooking=createAsyncThunk('booking/deleteBooking', async({id, token})=>{
    const config={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.delete(server+`booking/${id}`, config);
    return response.data;
})
const bookingSlice=createSlice({
    name:'booking',
    initialState, 
    reducers:{},
    extraReducers: builder=>{
        builder.addCase(getAllBooking.fulfilled, (state, action)=>{
            state.entities=action.payload;
        })
        .addCase(getBookingById.fulfilled, (state, action)=>{
            state.currBooking=action.payload;
        })
    }
})

export default bookingSlice.reducer;