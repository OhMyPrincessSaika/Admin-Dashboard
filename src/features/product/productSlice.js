import { productService } from "./productService";
import {resetState} from '../../utils/resetState';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';


const initialState = {
    isError : false,
    isSuccess : false,
    isLoading : false,
    products : [],
    message : '',
    createdProduct : {},
    product : {},
    updatedProduct : {},
    deletedProduct : {}
}

export const  getAllProducts= createAsyncThunk('product/get-all-products',
    async(thunkAPI) => {
    try {
        const allprods = await productService.getAllProducts();
        return allprods;
    }catch (err) {
        thunkAPI.rejectWithValue(err);
    }
})
export const createProduct = createAsyncThunk('product/create-product',
    async(data,thunkAPI) => {
        try {
            return await productService.createProduct(data);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    })
export const getProduct = createAsyncThunk('product/get-product',
    async(id,thunkAPI) => {
        try {
            return await productService.getProduct(id);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)
export const updateProduct = createAsyncThunk('product/update-product',
    async(props, thunkAPI) => {
        try {
            return await productService.updateProduct(props);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)
export const deleteProduct = createAsyncThunk('product/delete-product',
    async(id,thunkAPI) => {
        try {
            return await productService.deleteProduct(id);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const addSize = createAsyncThunk('product/add-size' , 
    async(props,thunkAPI) => {
        try {
            return await productService.addSize(props);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)
const productSlice = createSlice({
    name:'product',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getAllProducts.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllProducts.fulfilled,(state,action) => {
            state.isError = false;
            state.isSuccess= true;
            state.isLoading = false;
            state.products = action.payload;
        })
        .addCase(getAllProducts.rejected,(state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(createProduct.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(createProduct.fulfilled,(state,action) => {
            state.isError = false;
            state.isSuccess= true;
            state.isLoading = false;
            state.createdProduct = action.payload;
        })
        .addCase(createProduct.rejected,(state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(getProduct.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getProduct.fulfilled,(state,action) => {
            state.isError = false;
            state.isSuccess= true;
            state.isLoading = false;
            state.product = action.payload;
        })
        .addCase(getProduct.rejected,(state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(updateProduct.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(updateProduct.fulfilled,(state,action) => {
            state.isError = false;
            state.isSuccess= true;
            state.isLoading = false;
            state.updatedProduct = action.payload;
        })
        .addCase(updateProduct.rejected,(state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(deleteProduct.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(deleteProduct.fulfilled,(state,action) => {
            state.isError = false;
            state.isSuccess= true;
            state.isLoading = false;
            state.deletedProduct = action.payload;
        })
        .addCase(deleteProduct.rejected,(state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(addSize.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(addSize.fulfilled,(state,action) => {
            state.isError = false;
            state.isSuccess= true;
            state.isLoading = false;
        })
        .addCase(addSize.rejected,(state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(resetState,()=> {
           return initialState
        })
    }
})

export default productSlice.reducer;
