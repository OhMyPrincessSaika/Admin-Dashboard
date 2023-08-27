import { bannerCatService } from "./bannerCatService";
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';


const initialStates = {
    isLoading : false,
    isError : false,
    isSuccess : false,
    msg : '',
    createdCatBanner: {},
    updatedCatBanner : {},
    catBanners : [],
    catBanner : {},
    deletedCatBanner : {}
}

export const createCatBanner = createAsyncThunk('cat-banner/create-banner',async(data,thunkAPI) => {
    try {
        return await bannerCatService.createBannerCat(data);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const getAllCatBanners = createAsyncThunk('cat-banner/get-all-banners',async(_,thunkAPI) => {
    try {
        return await bannerCatService.getBannerCats();
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
} )

export const getCatBanner = createAsyncThunk('cat-banner/get-banner',async(id,thunkAPI) => {
    try {
        alert('arrived slice')
        return await bannerCatService.getBannerCat(id);
    }catch(err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err);
    }
})

export const updateCatBanner = createAsyncThunk('cat-banner/update-banner',async(props,thunkAPI) => {
    try {
        return await bannerCatService.updateBannerCat(props);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const deleteCatBanner = createAsyncThunk('cat-banner/delete-banner',async(id,thunkAPI) => {
    try {
        return await bannerCatService.deleteBannerCat(id);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

const bannerCatSlice = createSlice({
    initialState: initialStates,
    name : "banner_cat",
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createCatBanner.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(createCatBanner.fulfilled,(state,action) => {
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.createdCatBanner = action.payload;
        })
        .addCase(createCatBanner.rejected,(state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.msg = action.error;
            state.isSuccess= false;
        })
        .addCase(getAllCatBanners.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllCatBanners.fulfilled,(state,action) => {
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.catBanners = action.payload;
        })
        .addCase(getAllCatBanners.rejected,(state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.msg = action.error;
            state.isSuccess= false;
        })
        .addCase(updateCatBanner.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(updateCatBanner.fulfilled,(state,action) => {
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.updatedCatBanner = action.payload;
        })
        .addCase(updateCatBanner.rejected,(state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.msg = action.error;
            state.isSuccess= false;
        })
        .addCase(getCatBanner.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getCatBanner.fulfilled,(state,action) => {
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.catBanner = action.payload;
        })
        .addCase(getCatBanner.rejected,(state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.msg = action.error;
            state.isSuccess= false;
        })
        .addCase(deleteCatBanner.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(deleteCatBanner.fulfilled,(state,action) => {
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.deletedCatBanner = action.payload;
        })
        .addCase(deleteCatBanner.rejected,(state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.msg = action.error;
            state.isSuccess= false;
        })

    }
})

export default bannerCatSlice.reducer;