import axios from 'axios';
import { base_url } from '../../utils/base_url';
import {config} from '../../utils/axios_headers';

const getAllCategories = async() => {
    const response = await axios.get(`${base_url}category`)
    return response.data;
}
const createProductCategory = async(category) => {
    try{
        const response = await axios.post(`${base_url}category`,category,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }   
  
}
const getProductCategory = async(id) => {
    try {
        const response = await axios.get(`${base_url}category/${id}`,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const updateProductCategory = async(props) => {
    const {id,data} = props;
    try {
        const response = await axios.patch(`${base_url}category/${id}`,data,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
const deleteProductCategory = async(id) => {
    try {
        const response = await axios.delete(`${base_url}category/${id}`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
export const pCategoryService = {
    getAllCategories,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    getProductCategory
}