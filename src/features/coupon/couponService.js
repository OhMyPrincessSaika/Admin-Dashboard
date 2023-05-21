import axios from 'axios';
import {base_url} from '../../utils/base_url';
import { config } from '../../utils/axios_headers';
const getAllCoupons = async() => {
    console.log(config);
    try {
        const response = await axios.get(`${base_url}admin/coupon`,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const createCoupon = async(coupon) => {
    try {
        const response = await axios.post(`${base_url}admin/coupon`,coupon,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const getCoupon = async(id) => {
    try {
        const response = await axios.get(`${base_url}admin/coupon/${id}`,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const updateCoupon = async(props) => {
    const {id,couponData} = props;
    try {   
        const response = await axios.patch(`${base_url}admin/coupon/${id}`,couponData,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const deleteCoupon = async(id) => {
    try{    
        const response = await axios.delete(`${base_url}admin/coupon/${id}`,config);
        return response.data;
    }catch(err) {   
        console.log(err);
    }
}
export const couponService = {
    createCoupon,
    getAllCoupons,
    updateCoupon,
    getCoupon,
    deleteCoupon
}