import { couponService } from "./couponService";
import { createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {resetState} from '../../utils/resetState';
const initialState = {
    coupons : [],
    createdCoupon : '',
    isSuccess : false,
    isError : false,
    isLoading: false,
    coupon : {},
    updatedCoupon : {},
    deletedCoupon : {},
    msg : ''
}

export const createCoupon = createAsyncThunk('coupon/create-coupon',
    async(couponData,thunkApi) => {
        try {
            return await couponService.createCoupon(couponData)
        }catch(err) {
            thunkApi.rejectWithValue(err);
        }
    }
)
export const getAllCoupons = createAsyncThunk('coupon/get-all-coupons',
    async(thunkApi) => {
        try {
            return await couponService.getAllCoupons();
        }catch(err) {
            thunkApi.rejectWithValue(err);
        }
    }
)
export const getCoupon = createAsyncThunk('coupon/get-coupon', 
    async(id,thunkAPI) =>{
        try {
            return await couponService.getCoupon(id);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)
export const updateCoupon = createAsyncThunk('coupon/update-coupon',
    async(props,thunkAPI) => {
        try {
            return await couponService.updateCoupon(props);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const deleteCoupon = createAsyncThunk('coupon/delete-coupon',
    async(id,thunkAPI) => {
        try {
            return await couponService.deleteCoupon(id);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

const couponSlice = createSlice({
    initialState,
    reducers : {},
    name : 'coupon',
    extraReducers : (builder) => {
        builder 
        .addCase(createCoupon.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(createCoupon.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdCoupon = action.payload;
        })
        .addCase(createCoupon.rejected ,(state,action) => {
            state.isLoading = false;
            state.isSuccess =false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(getAllCoupons.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllCoupons.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.coupons = action.payload;
        })
        .addCase(getAllCoupons.rejected ,(state,action) => {
            state.isLoading = false;
            state.isSuccess =false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(getCoupon.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getCoupon.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.coupon = action.payload;
        })
        .addCase(getCoupon.rejected ,(state,action) => {
            state.isLoading = false;
            state.isSuccess =false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(updateCoupon.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(updateCoupon.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedCoupon = action.payload;
        })
        .addCase(updateCoupon.rejected ,(state,action) => {
            state.isLoading = false;
            state.isSuccess =false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(deleteCoupon.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(deleteCoupon.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedCoupon = action.payload;
        })
        .addCase(deleteCoupon.rejected ,(state,action) => {
            state.isLoading = false;
            state.isSuccess =false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(resetState,() => initialState)
    }
})

export default couponSlice.reducer;