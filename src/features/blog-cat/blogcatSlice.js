import { blogcatService } from "./blogcatService";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import {resetState} from '../../utils/resetState';
const initialState = {
    blogCategories : [],
    blogCategory : {},
    deletedBlogCat : {},
    updatedBlogCat : {},
    isSuccess : false,
    isError : false,
    isLoading : false,
    msg : '',
    createdBlogCategory : ''
}
export const getAllBlogCategories = createAsyncThunk('blogcat/get-all-blog-categories',
    async(thunkAPI) => {
        try {
            return await blogcatService.getAllBlogCategories();
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)
export const createBlogCategory = createAsyncThunk('blogcat/create-blog-category',
    async(blogCat,thunkAPI) => {
        try {
            return await blogcatService.createBlogCategory(blogCat);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
) 
export const getBlogCategory = createAsyncThunk('blogcat/get-blogcat',
    async(id,thunkAPI) => {
        try {
            return await blogcatService.getBlogCategory(id);

        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const updateBlogCategory = createAsyncThunk('blogcat/update-blogcat',
    async(blogcat,thunkAPI) => {
        try {
            return await blogcatService.updateBlogCategory(blogcat);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const deleteBlogCategory = createAsyncThunk('blogcat/delete-blogcat',
    async(id,thunkAPI) => {
        try {
            return await blogcatService.deleteBlogCategory(id);

        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

const blogcatSlice = createSlice({
    initialState,
    name : 'blogcat',
    reducers : {},
    extraReducers: (builder) => {
        builder 
        .addCase(getAllBlogCategories.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(getAllBlogCategories.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogCategories = action.payload;
        })
        .addCase(getAllBlogCategories.rejected, (state,action) =>{ 
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = action.error;
        })
        .addCase(createBlogCategory.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createBlogCategory.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBlogCategory = action.payload;
        })
        .addCase(createBlogCategory.rejected, (state,action) =>{ 
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = action.error;
        })
        .addCase(getBlogCategory.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(getBlogCategory.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogCategory = action.payload;
        })
        .addCase(getBlogCategory.rejected, (state,action) =>{ 
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = action.error;
        })
        .addCase(updateBlogCategory.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(updateBlogCategory.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBlogCat = action.payload;
        })
        .addCase(updateBlogCategory.rejected, (state,action) =>{ 
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = action.error;
        })
        .addCase(deleteBlogCategory.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(deleteBlogCategory.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBlogCat = action.payload;
        })
        .addCase(deleteBlogCategory.rejected, (state,action) =>{ 
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = action.error;
        })
        .addCase(resetState,()=> initialState)
    }
})

export default blogcatSlice.reducer;