import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../config/serverURL";

const bookingAdapter=createEntityAdapter();
const initialState=bookingAdapter.getInitialState();

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
const bookingSlice=createSlice({
    name:'booking',
    initialState, 
    reducers:{}
})

export default bookingSlice.reducer;