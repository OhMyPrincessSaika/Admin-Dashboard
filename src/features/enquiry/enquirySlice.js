import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { enquiryService } from './enquiryService';
import { resetState } from '../../utils/resetState';


const initialState = {
    enquiries : [],
    isSuccess : false,
    isError : false,
    isLoading : false,
    message : '',
    createdEnquiry : {},
    updatedEnquiry : {},
    deletedEnquiry : {},
    enquiry : {}
}
export const createEnquiry = createAsyncThunk('enquiry/creaet-enquiry',
    async(data,thunkAPI) => {
        try{
            return enquiryService.createEnquiry(data);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)
export const getEnquiries = createAsyncThunk('enquiry/get-enquiries',async(thunkApi) => {
    try {
        return await enquiryService.getEnquiries(); 
    }catch(err) {
        thunkApi.rejectWithValue(err)
    }

})
export const getEnquiry = createAsyncThunk('enquiry/get-enquiry',
    async(id,thunkAPI) => {
        try {
            return await enquiryService.getEnquiry(id);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)
export const updateEnquiry = createAsyncThunk('enquiry/update-enquiry',
    async(props,thunkAPI) => {
        try {
            return await enquiryService.updateEnquiry(props);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }

)
export const deleteEnquiry = createAsyncThunk('enquiry/delete-enquiry',
    async(id,thunkAPI) => {
        try {
            return await enquiryService.deleteEnquiry(id);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

const enquirySlice = createSlice({
    initialState,
    name : 'enquiry',
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getEnquiries.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getEnquiries.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.enquiries = action.payload;
        })
        .addCase(getEnquiries.rejected,(state,action) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(getEnquiry.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getEnquiry.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.enquiry = action.payload;
        })
        .addCase(getEnquiry.rejected,(state,action) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(updateEnquiry.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateEnquiry.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.updatedEnquiry = action.payload;
        })
        .addCase(updateEnquiry.rejected,(state,action) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(createEnquiry.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createEnquiry.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.createdEnquiry = action.payload;
        })
        .addCase(createEnquiry.rejected,(state,action) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(deleteEnquiry.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteEnquiry.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.deletedEnquiry = action.payload;
        })
        .addCase(deleteEnquiry.rejected,(state,action) => {
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState)
    }
})


export default enquirySlice.reducer;