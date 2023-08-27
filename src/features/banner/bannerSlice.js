import {bannerService} from './bannerService';

import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';

const initialState =  {
    isSuccess : false,
    isLoading : false,
    isError  : false,
    msg : '',
    createdBanner : {},
    banners : [],
    getBanner : {},
    updatedBanner : {},
    deletedBanner : {}
}

export const createBanner = createAsyncThunk('banner/create-banner',async(data,thunkAPI) => {
   try {
       
       return await bannerService.createBanner(data);
   }catch(err) {
    return thunkAPI.rejectWithValue(err);
   }
})

export const getAllBanners = createAsyncThunk('banner/getAllBanners',async(_,thunkAPI) => {
    try {
        return await bannerService.getAllBanners();
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const updateBanner = createAsyncThunk('banner/update-banner',async(props,thunkAPI) => {
    try {
        return await bannerService.updateBanner(props);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const deleteBanner = createAsyncThunk('banner/delete-banner',async(id,thunkAPI) => {
    try {
        return await bannerService.deleteBanner(id);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const getBanner = createAsyncThunk('banner/get-banner' , async(id,thunkAPI) => {
    try {
        return await bannerService.getBanner(id);
    }catch(err) {
        return thunkAPI.rejectWithValue(err.message);
    }
})
const bannerSlice = createSlice({
    initialState,
    name : 'banner',
    reducers : {},
    extraReducers : (build) => {
        build
        .addCase(createBanner.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createBanner.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdBanner = action.payload;
        })
        .addCase(createBanner.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(updateBanner.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateBanner.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updatedBanner = action.payload;
        })
        .addCase(updateBanner.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(getAllBanners.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllBanners.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.banners = action.payload;
        })
        .addCase(getAllBanners.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(deleteBanner.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteBanner.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deletedBanner = action.payload;
        })
        .addCase(deleteBanner.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(getBanner.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBanner.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.getBanner = action.payload;
        })
        .addCase(getBanner.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.msg = action.error;
        })
    }
})

export default bannerSlice.reducer;