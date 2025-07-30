import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL="https://asset-management-system-server.onrender.com"

export const loginUser=createAsyncThunk("auth/loginUser",async(loginData)=>{
    const response=await axios.post(`${SERVER_URL}/login`,loginData)
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
    sessionStorage.setItem("token",response.data.token)
    return response.data
})

const initialToken = sessionStorage.getItem("token");
const initialUser = sessionStorage.getItem("user");

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: initialUser ? JSON.parse(initialUser) : null,
        token: initialToken || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token")
            state.user = null
            state.token = null

        },
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.loading=true
            state.error=null
        }).
        addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload.user
            state.token=action.payload.token
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false
            state.error="Invalid login credentials";
        })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer