import { resetState } from "../../utils/resetState.js";
import {colorService} from "./ColorService.js";
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const getAllColors = createAsyncThunk(
    'color/get-colors', 
    async(thunkApi) => {
        try {
            return await colorService.getAllColors();
        }catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
)

export const createColor = createAsyncThunk(
    'color/create-color',
    async(color,thunkApi) => {
        try {
            return await colorService.createColor(color);
        }catch(err) {
            thunkApi.rejectWithValue(err);
        }
    }
)
export const getColor = createAsyncThunk('color/get-color',
    async(id,thunkAPI) => {
        try {
            return await colorService.getColor(id);

        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const updateColor = createAsyncThunk('color/update-color',
    async(color,thunkAPI) => {
        try {
            return await colorService.updateColor(color);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const deleteColor = createAsyncThunk('color/delete-color',
    async(id,thunkAPI) => {
        try {
            return await colorService.deleteColor(id);

        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)
const initialState = {
    colors : [],
    createdColor : {},
    updatedColor : {},
    deletedColor : {},
    color : {},
    isSuccess : false,
    isError : false,
    isLoading : false,
    message : ''
}

const colorSlice = createSlice({
    initialState,
    name : 'color',
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getAllColors.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllColors.fulfilled,(state,action) => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.colors = action.payload;
        })
        .addCase(getAllColors.rejected,(state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.error;
            state.isSuccess = false;
        })
        .addCase(createColor.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(createColor.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdColor = action.payload;
        })
        .addCase(createColor.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getColor.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getColor.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.color = action.payload;
        })
        .addCase(getColor.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateColor.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(updateColor.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedColor = action.payload;
        })
        .addCase(updateColor.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteColor.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(deleteColor.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedColor = action.payload;
        })
        .addCase(deleteColor.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () =>initialState)
    }
})

export default colorSlice.reducer;