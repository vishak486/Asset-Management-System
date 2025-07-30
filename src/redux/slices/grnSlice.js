import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL="https://asset-management-system-server.onrender.com"

export const fetchGrns = createAsyncThunk('grn/fetchGrns', async (search = '') => {
    const token = sessionStorage.getItem('token')
    // console.log(token);
    const response = await axios.get(`${SERVER_URL}/allGrns?search=${search}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
})
// add grns
export const addGrns = createAsyncThunk('grn/addGrns', async (GrnData) => {
    const token = sessionStorage.getItem('token')
    const response = await axios.post(`${SERVER_URL}/addGrn`, GrnData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
})
// edit status
export const editGrnStatus = createAsyncThunk('grn/editGrnStatus', async ({ Status, id }) => {
    const token = sessionStorage.getItem('token')
    const response = await axios.put(`${SERVER_URL}/editGrnStatus/${id}`, Status,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
})

// delete grns
export const deleteGrns = createAsyncThunk('grn/deleteGrns', async (id) => {
    const token = sessionStorage.getItem('token');
    const response = await axios.delete(`${SERVER_URL}/deleteGrn/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return id; // we just need the ID to remove from state
});


const grnSlice=createSlice({
    name:'grn',
    initialState:{
        grnList:[],
        loading:false,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchGrns.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchGrns.fulfilled,(state,action)=>{
            state.loading=false
            state.grnList=action.payload
        })
        .addCase(fetchGrns.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        // add grn
        .addCase(addGrns.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(addGrns.fulfilled,(state,action)=>{
            state.loading=false
            state.grnList.push(action.payload)
        })
        .addCase(addGrns.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        // edit grn status
        .addCase(editGrnStatus.pending, (state) => {
                        state.loading = true;
                        state.error = null;
                    })
                    .addCase(editGrnStatus.fulfilled, (state, action) => {
                        state.loading = false;
                        const index = state.grnList.findIndex((v) => v._id === action.payload._id);
                        if (index !== -1) {
                            state.grnList[index] = action.payload;
                        }
                    })
                    .addCase(editGrnStatus.rejected, (state, action) => {
                        state.loading = false;
                        state.error = action.payload;
                    })
            // delete grn
             .addCase(deleteGrns.pending, (state) => {
                                            state.loading = true;
                                            state.error = null;
                                        })
                                    .addCase(deleteGrns.fulfilled, (state, action) => {
                                        state.loading = false;
                                        state.grnList = state.grnList.filter(grn => grn._id !== action.payload);
                                    })
                                    .addCase(deleteGrns.rejected, (state, action) => {
                                        state.loading = false;
                                        state.error = action.error.message;
                                    })
    }
})

export default grnSlice.reducer