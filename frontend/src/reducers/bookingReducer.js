import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const bookingAdapter=createEntityAdapter();
const initialState=bookingAdapter.getInitialState();

const bookingSlice=createSlice({
    name:'booking',
    initialState, 
    reducers:{

    }
})
export default bookingSlice.reducer;