import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import customerSlice from '../features/customers/customerSlice'
import productSlice from '../features/product/productSlice'
import colorSlice from '../features/color/colorSlice'
import brandSlice from '../features/brand/brandSlice';
import enquriySlice from '../features/enquiry/enquirySlice';
import orderSlice from '../features/order/orderSlice';
import {uploadSlice,deleteSlice} from '../features/upload/uploadSlice'
import pCategorySlice from '../features/pcategory/pCategorySlice'
import blogSlice from '../features/blog/blogSlice'
import blogcatSlice from '../features/blog-cat/blogcatSlice'
import couponSlice from '../features/coupon/couponSlice';
import bannerSlice from '../features/banner/bannerSlice';
import bannerCatSlice from '../features/banner-cat/bannerCatSlice';
import adminSlice from '../features/admin/adminSlice';
export const store = configureStore({
    
    reducer : {
    'auth' : authSlice,
    'customer' : customerSlice,
    'product' : productSlice,
    'color' : colorSlice,
    'brand' : brandSlice,
    'enquiry': enquriySlice,
    'order' : orderSlice,
    'category': pCategorySlice,
    'upload' : uploadSlice.reducer,
    'delete' : deleteSlice.reducer,
    'blog' : blogSlice,
    'blogcat' : blogcatSlice,
    'coupon' : couponSlice,
    'banner' : bannerSlice,
    'banner_cat': bannerCatSlice,
    'admin' : adminSlice
},
});