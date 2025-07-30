import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL="https://asset-management-system-server.onrender.com"

export const fetchDashboardCount = createAsyncThunk('dashboard/fetchDashboardCount', async () => {
    const token = sessionStorage.getItem('token')
    // console.log(token);
    const response = await axios.get(`${SERVER_URL}/countDashboard`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
})

const dashboardSlice=createSlice({
    name:'dashboard',
    initialState:{
        vendorCount: 0,
        assetCount: 0,
        grnCount: 0,
        loading: false,
        error: null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchDashboardCount.pending,(state)=>{
                    state.loading=true
                    state.error=null
                })
                .addCase(fetchDashboardCount.fulfilled,(state,action)=>{
                    state.loading=false
                    state.vendorCount = action.payload.vendorCount;
                    state.assetCount = action.payload.assetCount;
                    state.grnCount = action.payload.grnCount;
                })
                .addCase(fetchDashboardCount.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.error.message
                })
    }
})

export default dashboardSlice.reducer