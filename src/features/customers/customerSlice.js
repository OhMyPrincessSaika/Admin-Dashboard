import { customerService } from "./customerService";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const getAllUsers = createAsyncThunk('customer/getcustomers',
    async(thunkApi) => {
    try{
        return await customerService.getAllUsers();
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
    }
)
const initialState = {
    customers : [],
    isSuccess : false,
    isLoading : false,
    isError  : false,
    message : ''
}
const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending,(state) => {
             state.isLoading = true;
        })
        builder.addCase(getAllUsers.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.customers = action.payload;
        })
        builder.addCase(getAllUsers.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
    }
})

export default customerSlice.reducer;