import { pCategoryService } from './pCategoryService';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { resetState } from '../../utils/resetState';
const initialState = {
    categories : [],
    createdCategory : {},
    updatedCategory : {},
    deletedCategory : {},
    category : {},
    isSuccess : false,
    isError : false,
    isLoading : false,
    msg : ''
}

export const getAllCategories = createAsyncThunk('category/get-all-categories',async(thunkApi) => {
    try {
        console.log('reached get all categories')
        return await pCategoryService.getAllCategories();
    }catch(err) {
        thunkApi.rejectWithValue(err);
    }
})
export const createProductCategory = createAsyncThunk('category/create-product-category',async(category,thunkApi)=> {
    try {
        return await pCategoryService.createProductCategory(category);
    }catch(err) {
        thunkApi.rejectWithValue(err);
    }
})

export const getProductCategory = createAsyncThunk('category/get-category',async(id,thunkAPI) => {
    try {
        return await pCategoryService.getProductCategory(id);
    }catch(err) {
        thunkAPI.rejectWithValue(err);
    }
})
export const updateProductCategory = createAsyncThunk('category/update-category',async(props,thunkApi) => {
    try {
        return await pCategoryService.updateProductCategory(props)
    }catch(err){
        thunkApi.rejectWithValue(err);
    }   
} )
export const deleteProductCategory = createAsyncThunk('category/delete-category',async(id,thunkAPI) => {
    try {
        return await pCategoryService.deleteProductCategory(id);
    }catch(err) {
        thunkAPI.rejectWithValue(err);
    }
})
const pCategorySlice = createSlice( {
    initialState,
    name :'category',
    reducers : {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllCategories.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllCategories.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.categories= action.payload;
        })
        .addCase(getAllCategories.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.error;
        })
        .addCase(createProductCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createProductCategory.fulfilled,(state,action)=> {
            state.isSuccess = true;
            state.isLoading = false;
            state.createdCategory = action.payload;
        })
        .addCase(createProductCategory.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.error;
        })
        .addCase(getProductCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProductCategory.fulfilled,(state,action)=> {
            state.isSuccess = true;
            state.isLoading = false;
            state.category = action.payload;
        })
        .addCase(getProductCategory.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.error;
        })
        .addCase(updateProductCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProductCategory.fulfilled,(state,action)=> {
            state.isSuccess = true;
            state.isLoading = false;
            state.updatedCategory = action.payload;
        })
        .addCase(updateProductCategory.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.error;
        })
        .addCase(deleteProductCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteProductCategory.fulfilled,(state,action)=> {
            state.isSuccess = true;
            state.isLoading = false;
            state.deletedCategory = action.payload;
        })
        .addCase(deleteProductCategory.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.error;
        })
        .addCase(resetState, () => initialState)
    }
})

export default pCategorySlice.reducer;