import axios from 'axios';
import {base_url} from '../../utils/base_url';
import { config } from '../../utils/axios_headers';


const getAllProducts =async() => {
    console.log('get all products')
    const response = await axios.get(`${base_url}product`);
    const headers = Object.fromEntries(Object.entries(response.headers));
    const data = response.data;

    return {data,headers};
}
const createProduct = async(data) => {
    try{
        const response = await axios.post(`http://localhost:5000/product`,data,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
const getProduct = async(id) => {
    try {
        const response = await axios.get(`${base_url}product/${id}`,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
const updateProduct = async(props) => {
    const {id,productData} = props;
    try {
        const response = await axios.patch(`${base_url}product/${id}`,productData,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
const deleteProduct = async(id) => {
    try {
        const response = await axios.delete(`${base_url}product/${id}`,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const addSize = async(props) => {
    const {size,id} = props;
    try {   
        return await axios.post(`http://localhost:5000/product/size/${id}`,size);
    }catch(err) {
        console.log(err);
    }
}
export const productService = {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    addSize
}