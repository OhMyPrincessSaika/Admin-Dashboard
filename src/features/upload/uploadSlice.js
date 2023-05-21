import { uploadService } from "./uploadService";
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';


const initialState = {
    images : [],
    isSuccess : false,
    isError : false,
    isLoading: false,
    msg : ''
}

export const uploadImages = createAsyncThunk('upload/upload-images',async(data,thunkApi)=> {
    try {
     
        const formData = new FormData();
        for(let i=0; i<data.length ; i++) {
            formData.append("images",data[i]);
        }
       
        return await uploadService.uploadImages(formData);
    }catch(err) {
        thunkApi.rejectWithValue(err)
    }
})

export const deleImages = createAsyncThunk('delete/images',async(id,thunkApi) => {
    try {
        return await uploadService.deleteImages(id);
    }catch(err){
        thunkApi.rejectWithValue(err);
    }
})

const uploadSlice = createSlice({
    initialState,
    name: 'upload',
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(uploadImages.pending,(state) => {
            state.isLoading = true
        })
        .addCase(uploadImages.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess= true;
            state.images = action.payload;
        })
        .addCase(uploadImages.rejected,(state,action)=> {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.error;
        })
        
    }
})

const deleteSlice = createSlice({
    initialState,
    name:'delete',
    reducers : {},
    extraReducers: (builder) => {
        builder
        .addCase(deleImages.pending,(state) => {
            state.isLoading = true
        })
        .addCase(deleImages.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess= true;
            state.images = [];
        })
        .addCase(deleImages.rejected,(state,action)=> {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.error;
        })
    }
})

export  {uploadSlice,deleteSlice};