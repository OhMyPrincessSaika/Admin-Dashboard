import axios from 'axios';
import {config} from '../../utils/axios_headers';
import {base_url} from '../../utils/base_url';

const getAllBrands = async() => {
    try {
        const response = await axios.get(`${base_url}brand`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const createBrand = async(brand) => {
    try {
        console.log(brand);
        const response = await axios.post(`${base_url}brand`,brand,config)
        return response.data;
    }catch(err) {
        console.log(err);
    } 
}

const getBrand = async(id) => {
    try {
        const response = await axios.get(`${base_url}brand/${id}`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const updateBrand = async(brand) => {
    const {id,brandData} = brand; 
    try {
        const response = await axios.patch(`${base_url}brand/${id}`,brandData,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const deleteBrand = async(id) => {
    try {
        const response = await axios.delete(`${base_url}brand/${id}`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
export const brandService =  {
    getAllBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
}