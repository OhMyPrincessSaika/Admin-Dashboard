import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { adminService } from "./adminService";

const initialState = {
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : '',
    admins : [],
    updatedAdmin : {},
    deletedAdmin : {},
    admin : {},
    notification: {},
    updatedNotification: {},
    notifications : '',
    
}

export const getAllAdmins = createAsyncThunk('admin/get-all-admins',async(_,thunkAPI) => {
    try {
        return await adminService.getAllAdmins();
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})
export const getAdmin = createAsyncThunk('admin/get-admin',async(id,thunkAPI) => {
    try {
        return await adminService.getAdmin(id);
    }catch(err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err);
    }
})
export const updateAdmin = createAsyncThunk('admin/update-admin',async(props,thunkAPI) => {
    try {
        return await adminService.updateAdmin(props);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})
export const deleteAdmin = createAsyncThunk('admin/delete-admin',async(id,thunkAPI) => {
    try {
        return await adminService.deleteAdmin(id);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})
export const addNotification = createAsyncThunk('admin/add-notification',async(props,thunkAPI) => {
    try {
        return await adminService.addNotification(props);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})
export const getAllNotifications = createAsyncThunk('admin/all-notifications',async(_,thunkAPI) => {
    try {
        return await adminService.getAllNotifications();
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const updateNotification = createAsyncThunk('admin/update-notification',async(id,thunkAPI) => {
    try {
        return await adminService.updateNotification(id);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
        .addCase(getAllAdmins.pending,(state) => {
            state.isLoading =true;
           
        })
        .addCase(getAllAdmins.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.admins = action.payload;
        })
        .addCase(getAllAdmins.rejected,(state,action) => {
            state.admins = [];
            state.updatedAdmin = {};
            state.deletedAdmin = {};
            state.admin = {};
            state.message = '';
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getAdmin.pending,(state) => {
            state.isLoading =true;
           
        })
        .addCase(getAdmin.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.admin = action.payload;
        })
        .addCase(getAdmin.rejected,(state,action) => {
            state.admins = [];
            state.updatedAdmin = {};
            state.deletedAdmin = {};
            state.admin = {};
            state.message = '';
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateAdmin.pending,(state) => {
            state.isLoading =true;
           
        })
        .addCase(updateAdmin.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updatedAdmin = action.payload;
        })
        .addCase(updateAdmin.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            state.admins = [];
            state.updatedAdmin = {};
            state.deletedAdmin = {};
            state.admin = {};
            state.message = '';
        })
        .addCase(deleteAdmin.pending,(state) => {
            state.isLoading =true;
           
        })
        .addCase(deleteAdmin.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deletedAdmin = action.payload;
        })
        .addCase(deleteAdmin.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            state.admins = [];
            state.updatedAdmin = {};
            state.deletedAdmin = {};
            state.admin = {};
            state.message = '';
        })
        .addCase(addNotification.pending,(state) => {
            state.isLoading =true;
           
        })
        .addCase(addNotification.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.notification = action.payload;
        })
        .addCase(addNotification.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            state.admins = [];
            state.updatedAdmin = {};
            state.deletedAdmin = {};
            state.admin = {};
            state.message = '';
        })
        .addCase(getAllNotifications.pending,(state) => {
            state.isLoading =true;
           
        })
        .addCase(getAllNotifications.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.notifications = action.payload;
        })
        .addCase(getAllNotifications.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            state.admins = [];
            state.updatedAdmin = {};
            state.deletedAdmin = {};
            state.admin = {};
            state.message = '';
        })
        .addCase(updateNotification.pending,(state) => {
            state.isLoading =true;
           
        })
        .addCase(updateNotification.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updatedNotification = action.payload;
        })
        .addCase(updateNotification.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            state.admins = [];
            state.updatedAdmin = {};
            state.deletedAdmin = {};
            state.admin = {};
            state.message = '';
        })
    }
})

export default adminSlice.reducer;