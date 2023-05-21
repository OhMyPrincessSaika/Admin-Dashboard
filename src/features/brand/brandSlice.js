import { brandService } from "./brandService";
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { resetState } from "../../utils/resetState";

export const getAllBrands = createAsyncThunk(
    "brand/get-brands",async(thunkApi) => {
        try {
           return await brandService.getAllBrands();
        }catch(err) {
            thunkApi.rejectWithValue(err);
        }
    }
)
export const createBrand = createAsyncThunk(
    "brand/create-brand",async(brand,thunkApi) => {
        try {
            return await brandService.createBrand(brand)
        }catch(err) {
            thunkApi.rejectWithValue(err);
        }
    }
)

export const getBrand = createAsyncThunk('brand/get-brand',
    async(id,thunkAPI) => {
        try {
            return await brandService.getBrand(id);

        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const updateBrand = createAsyncThunk('brand/update-brand',
    async(brand,thunkAPI) => {
        try {
            return await brandService.updateBrand(brand);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const deleteBrand = createAsyncThunk('brand/delete-brand',
    async(id,thunkAPI) => {
        try {
            return await brandService.deleteBrand(id);

        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)
const initialState =  {
    brands : [],
    isSuccess : false,
    isError  : false,
    isLoading : false,
    message : "",
    brand : '',
    updatedBrand : {},
    createdBrand : {},
    deletedBrand : {}
}

const brandSlice = createSlice(
    {
        initialState,
        name : "brand",
        reducers : {},
        extraReducers :(builder) => {
            builder
            .addCase(getAllBrands.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(getAllBrands.fulfilled,(state,action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.brands = action.payload;
            })
            .addCase(getAllBrands.rejected,(state,action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.message = action.error;
            })
            .addCase(createBrand.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(createBrand.fulfilled,(state,action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.createdBrand = action.payload;
            })
            .addCase(createBrand.rejected,(state,action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getBrand.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(getBrand.fulfilled,(state,action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.brand = action.payload.brand;
            })
            .addCase(getBrand.rejected,(state,action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(updateBrand.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(updateBrand.fulfilled,(state,action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.updatedBrand = action.payload;
            })
            .addCase(updateBrand.rejected,(state,action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(deleteBrand.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(deleteBrand.fulfilled,(state,action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.deletedBrand = action.payload;
            })
            .addCase(deleteBrand.rejected,(state,action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(resetState,()=> initialState)
        }
    }
)

export default brandSlice.reducer;