import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../config/serverURL";

export let message;
const userAdapter=createEntityAdapter({});
const initialState=userAdapter.getInitialState({
    serverMessage:"",
    selectedUser:{
        id:"",
        fullName:"",
        username:"",
        email:"",
        mobilePhone:"",
        refreshToken:"",
        roles:[]
    }
});
export const getAllUser=createAsyncThunk('user/getAllUser', async(token)=>{
    const config={headers:{
        authorization: `Bearer ${token}`
    }}
    const response = await axios.get(server+'user', config);
    return response.data
})
export const getUserById=createAsyncThunk('user/getUserById', async({id, token})=>{
    const config={headers:{
        authorization:`Bearer ${token}`
    }}
    const response =await axios.get(server+`user/${id}`, config);
    return response.data;
})
export const createUser=createAsyncThunk('user/createUser', async(data)=>{
    const response=await axios.post(server+'user', data).catch(error=>{message=error.response.data.message})
    return response.data;
})
export const deleteUser=createAsyncThunk('user/deleteUser', async ({id, token})=>{
    const config={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.delete(server+`user/${id}`,config)
    return response.data;
})
export const updateUserById=createAsyncThunk('user/updateUserById', async({id, data, token})=>{
    const config={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.patch(server+`user/${id}`, data, config);
    return response.data;
}
)
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
        .addCase(getUserById.fulfilled, (state, action)=>{
            state.selectedUser=action.payload;
        })
    }
})
export default userSlice.reducer;
export const {resetMessage}=userSlice.actions;