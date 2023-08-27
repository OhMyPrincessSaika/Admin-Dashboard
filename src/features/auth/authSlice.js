import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';
import { resetState } from '../../utils/resetState';
// const user = localStorage.getItem('user') ? JSON.stringify(localStorage.getItem('user')) : null;

const initialState = {
    user : {},
    isError : false,
    isLoading : false,
    isSucceed : false,
    message : "",
    registered : {}
}
export const login = createAsyncThunk('auth/login',async(user, thunkAPI) => {
    try {
        return  await authService.login(user);
    }catch(err) {
        
        return thunkAPI.rejectWithValue(err)
    }
})

export const register = createAsyncThunk('auth/register',async(data,thunkAPI) => {
    try {
        return await authService.register(data);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(login.pending,(state) => {
            state.isLoading= true;
        })
        .addCase(login.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isSucceed = true;
            state.isError = false;
            state.user = action.payload;
        })
        .addCase(login.rejected,(state,action) => {
            state.isLoading= false;
            state.isSucceed = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(register.pending,(state) => {
            state.isLoading= true;
        })
        .addCase(register.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isSucceed = true;
            state.isError = false;
            state.registered = action.payload;
        })
        .addCase(register.rejected,(state,action) => {
            state.isLoading= false;
            state.isSucceed = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState,() => initialState)
        
    }

})

export default authSlice.reducer;