import {createSlice, createEntityAdapter, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import { server } from "../config/serverURL";
const categoryAdapter=createEntityAdapter();
const initialState=categoryAdapter.getInitialState({
    currCategory:{
        name:"",
        description:"",
        id:"",
        roomList:[]
    },
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
export const createNewCategory=createAsyncThunk('category/createNewCategory',async({data, token})=>{
    const config={
        headers: {Authorization: `Bearer ${token}`}
    }
    const response=await axios.post(server+'category', data, config);
    return response.data;
})
export const deleteCategory=createAsyncThunk('category/deleteCategory', async({id, token})=>{
    const config={
        headers: {Authorization: `Bearer ${token}`}
    }
    const response=await axios.delete(server+`category/${id}`, config)
    return response.data;
})
export const editCategory=createAsyncThunk('category/editCategory', async({data, token, id})=>{
    const config={
        headers:{
            authorization: `Bearer ${token}`
        }
    }
    const response=await axios.put(server+`category/${id}`, data, config);
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