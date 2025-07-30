import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL="https://asset-management-system-server.onrender.com"

export const fetchAssets = createAsyncThunk('asset/fetchAssets', async (search = '') => {
    const token = sessionStorage.getItem('token')
    // console.log(token);
    const response = await axios.get(`${SERVER_URL}/allAssets?search=${search}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
})

// add asset
export const addAssets = createAsyncThunk('asset/addAssets', async (assetData) => {
    const token = sessionStorage.getItem('token')
    const response = await axios.post(`${SERVER_URL}/addAsset`, assetData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
})

// edit assets
export const editAssets = createAsyncThunk('asset/editAssets', async ({ assetData, id }) => {
    const token = sessionStorage.getItem('token')
    const response = await axios.put(`${SERVER_URL}/editAsset/${id}`, assetData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
})
// Delete asset
export const deleteAsset = createAsyncThunk('asset/deleteAsset', async (id) => {
    const token = sessionStorage.getItem('token');
    const response = await axios.delete(`${SERVER_URL}/deleteAsset/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return id; // we just need the ID to remove from state
});

const assetSlice=createSlice({
    name:'asset',
     initialState: {
        assetList: [],
        loading: false,
        error: null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        // fetchAssets
        builder.addCase(fetchAssets.pending, (state) => {
                    state.loading = true
                    state.error = null
                })
                    .addCase(fetchAssets.fulfilled, (state, action) => {
                        state.loading = false
                        state.assetList = action.payload
                    })
                    .addCase(fetchAssets.rejected, (state, action) => {
                        state.loading = false
                        state.error = action.error.message
                    })
            // add asset
            .addCase(addAssets.pending, (state) => {
                            state.loading = true
                            state.error = null
                        })
                        .addCase(addAssets.fulfilled, (state, action) => {
                            state.loading = false
                            state.assetList.push(action.payload)
                        })
                        .addCase(addAssets.rejected, (state, action) => {
                            state.loading = false
                            state.error = action.error.message
                        })
                // edit assets
                .addCase(editAssets.pending, (state) => {
                                state.loading = true;
                                state.error = null;
                            })
                            .addCase(editAssets.fulfilled, (state, action) => {
                                state.loading = false;
                                const index = state.assetList.findIndex((v) => v._id === action.payload._id);
                                if (index !== -1) {
                                    state.assetList[index] = action.payload;
                                }
                            })
                            .addCase(editAssets.rejected, (state, action) => {
                                state.loading = false;
                                state.error = action.payload;
                            })
                // delete asset
                .addCase(deleteAsset.pending, (state) => {
                                state.loading = true;
                                state.error = null;
                            })
                        .addCase(deleteAsset.fulfilled, (state, action) => {
                            state.loading = false;
                            state.assetList = state.assetList.filter(asset => asset._id !== action.payload);
                        })
                        .addCase(deleteAsset.rejected, (state, action) => {
                            state.loading = false;
                            state.error = action.error.message;
                        })
            
    }
})


export default assetSlice.reducer