import {createSlice, createEntityAdapter, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import { server } from "../config/serverURL";
const categoryAdapter=createEntityAdapter();
const initialState=categoryAdapter.getInitialState({
    currCategory:"",
    message:""
});

export const getAllCategory=createAsyncThunk('category/getAllCategory', async()=>{
    const response=await axios.get(server+"category")
    return response.data;
})
export const getOneCategory=createAsyncThunk('category/getOneCategory', async(id)=>{
    const response=await axios.get(server+`category/${id}`);
    return response.data;
})
export const createNewCategory=createAsyncThunk('category/createNewCategory',async(data)=>{
    const response=await axios.post(server+'category', data);
    return response.data;
})

const categorySlice=createSlice({
    name:'category',
    initialState: initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getAllCategory.fulfilled, (state,action)=>{
            state.entities=action.payload;
        })
        .addCase(getOneCategory.fulfilled, (state, action)=>{
            state.currCategory=action.payload
        })
        .addCase(createNewCategory.fulfilled, (state, action)=>{
            state.message="A new category created.";
        })
    }
})
export default categorySlice.reducer;