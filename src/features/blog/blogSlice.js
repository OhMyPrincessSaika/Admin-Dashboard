import { blogService } from "./blogService";
import { createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {resetState} from '../../utils/resetState';
const initialState = {
    blogs : [],
    createdBlog : '',
    blog : {},
    updatedBlog : {},
    deletedBlog : {},
    isSuccess : false,
    isError : false,
    isLoading: false,
    msg : ''
}

export const createBlog = createAsyncThunk('blog/create-blog',
    async(blogData,thunkApi) => {
        try {
            return await blogService.createBlog(blogData)
        }catch(err) {
            thunkApi.rejectWithValue(err);
        }
    }
)
export const getAllBlogs = createAsyncThunk('blog/get-all-blogs',
    async(thunkApi) => {
        try {
            return await blogService.getAllBlogs();
        }catch(err) {
            thunkApi.rejectWithValue(err);
        }
    }
)
export const getBlog = createAsyncThunk('blog/get-blog',
    async(id,thunkAPI) => {
        try {
            return await blogService.getBlog(id);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)
export const updateBlog = createAsyncThunk('blog/update-blog',
    async(props,thunkApi) => {
        try {
            return await blogService.updateBlog(props);
        }catch(err) {
            thunkApi.rejectWithValue(err);
        }
    }
)
export const deleteBlog = createAsyncThunk('blog/delete-blog', 
    async(id,thunkAPI) => {
        try {
            return await blogService.deleteBlog(id);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)
const blogSlice = createSlice({
    initialState,
    reducers : {},
    name : 'blog',
    extraReducers : (builder) => {
        builder 
        .addCase(createBlog.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(createBlog.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBlog = action.payload;
        })
        .addCase(createBlog.rejected ,(state,action) => {
            state.isLoading = false;
            state.isSuccess =false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(getAllBlogs.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllBlogs.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogs = action.payload;
        })
        .addCase(getAllBlogs.rejected ,(state,action) => {
            state.isLoading = false;
            state.isSuccess =false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(getBlog.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getBlog.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blog = action.payload;
        })
        .addCase(getBlog.rejected ,(state,action) => {
            state.isLoading = false;
            state.isSuccess =false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(updateBlog.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(updateBlog.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBlog = action.payload;
        })
        .addCase(updateBlog.rejected ,(state,action) => {
            state.isLoading = false;
            state.isSuccess =false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(deleteBlog.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(deleteBlog.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBlog = action.payload;
        })
        .addCase(deleteBlog.rejected ,(state,action) => {
            state.isLoading = false;
            state.isSuccess =false;
            state.isError = true;
            state.msg = action.error;
        })
        .addCase(resetState,() => initialState)
    }
})

export default blogSlice.reducer;