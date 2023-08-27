import { orderService } from "./orderService";
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { resetState } from "../../utils/resetState";

const initialState = {
   
    ordersByUserId : [],
    isSuccess : false,
    isLoading : false,
    isError   : false,
    message   : '',
    monthlyData : {},
    yearlyData : {},
    allOrders : [],
    updatedOrderStatus : ''
}






export const getMonthlyOrderIncome = createAsyncThunk('order/get-monthly-income',async(token,thunkAPI) => {
    try {
        return await orderService.getMonthlyOrderIncome(token);
    }catch(err) {   
        return thunkAPI.rejectWithValue(err);
    }
})

export const getYearlyOrderIncome = createAsyncThunk('order/get-yearly-income',async(token,thunkAPI) => {
    try {
        return await orderService.getYearlyOrderIncome(token);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const getAllOrders = createAsyncThunk('order/get-all-orders',async(token,thunkAPI) => {
    try {
        return await orderService.getAllOrders(token);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})
export const getOrderById = createAsyncThunk('order/get-orderby-id',async(id,thunkAPI) => {
    try {
        return await orderService.getOrderById(id);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})
export const updateOrderStatus = createAsyncThunk('order/update-order-status',async(data,thunkAPI) => {
    try {
        return await orderService.updateOrderStatus(data);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const orderSlice = createSlice({
    initialState,
    name : 'order',
    reducers :  {},
    extraReducers :(builder) => {
        builder
        .addCase(getMonthlyOrderIncome.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getMonthlyOrderIncome.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess= true;
            state.monthlyData = action.payload;
        })
        .addCase(getMonthlyOrderIncome.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
            state.isSuccess = false;
        })
        .addCase(getYearlyOrderIncome.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getYearlyOrderIncome.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess= true;
            state.yearlyData = action.payload;
        })
        .addCase(getYearlyOrderIncome.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
            state.isSuccess = false;
        })
        .addCase(getAllOrders.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllOrders.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess= true;
            state.allOrders = action.payload;
        })
        .addCase(getAllOrders.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
            state.isSuccess = false;
        })
        .addCase(getOrderById.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getOrderById.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess= true;
            state.ordersByUserId = action.payload;
        })
        .addCase(getOrderById.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
            state.isSuccess = false;
        })
        .addCase(updateOrderStatus.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(updateOrderStatus.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess= true;
            state.message = '';
            state.updatedOrderStatus = action.payload;
        })
        .addCase(updateOrderStatus.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
            state.isSuccess = false;
        })
        .addCase(resetState ,() => initialState)
    }
})

export default orderSlice.reducer;