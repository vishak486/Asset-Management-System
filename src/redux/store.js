import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import vendorReducer from './slices/vendorSlice'
import assetReducer from './slices/assetSlice'
import grnReducer from './slices/grnSlice'
import dashboardReducer from './slices/dashboardSlice'

export const store=configureStore({
    reducer:{
        auth:authReducer,
        vendor:vendorReducer,
        asset:assetReducer,
        grn:grnReducer,
        dashboard:dashboardReducer,
    },
})