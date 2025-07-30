import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL="https://asset-management-system-server.onrender.com"

// fetchAllvendors

export const fetchVendors = createAsyncThunk('vendor/fetchVendors', async (search = '') => {
    const token = sessionStorage.getItem('token')
    // console.log(token);
    const response = await axios.get(`${SERVER_URL}/allVendors?search=${search}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
})
// Add vendors
export const addVendors = createAsyncThunk('vendor/addVendors', async (vendorData) => {
    const token = sessionStorage.getItem('token')
    const response = await axios.post(`${SERVER_URL}/addVendor`, vendorData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
})

// edit vendors
export const editVendors = createAsyncThunk('vendor/editVendors', async ({ vendorData, id }) => {
    const token = sessionStorage.getItem('token')
    const response = await axios.put(`${SERVER_URL}/editVendor/${id}`, vendorData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.data
})

// Delete Vendor
export const deleteVendor = createAsyncThunk('vendor/deleteVendor', async (id) => {
    const token = sessionStorage.getItem('token');
    const response = await axios.delete(`${SERVER_URL}/deleteVendor/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return id; // we just need the ID to remove from state
});


const vendorSlice = createSlice({
    name: 'vendor',
    initialState: {
        vendorList: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // fethAllVendor
        builder.addCase(fetchVendors.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(fetchVendors.fulfilled, (state, action) => {
                state.loading = false
                state.vendorList = action.payload
            })
            .addCase(fetchVendors.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // add vendors
            .addCase(addVendors.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addVendors.fulfilled, (state, action) => {
                state.loading = false
                state.vendorList.push(action.payload)
            })
            .addCase(addVendors.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

        // edit vendor
        builder
            .addCase(editVendors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editVendors.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.vendorList.findIndex((v) => v._id === action.payload._id);
                if (index !== -1) {
                    state.vendorList[index] = action.payload;
                }
            })
            .addCase(editVendors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

      // deleteVendor
        .addCase(deleteVendor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
        .addCase(deleteVendor.fulfilled, (state, action) => {
            state.loading = false;
            state.vendorList = state.vendorList.filter(vendor => vendor._id !== action.payload);
        })
        .addCase(deleteVendor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

}
})

export default vendorSlice.reducer
