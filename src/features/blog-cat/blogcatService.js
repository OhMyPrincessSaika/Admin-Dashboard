import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axios_headers';
const getAllBlogCategories = async() => {
    try {
        const response = await axios.get(`${base_url}blog-category`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const createBlogCategory = async(blogCat) => {
    try {
        const response = await axios.post(`${base_url}blog-category`,blogCat);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
const getBlogCategory = async(id) => {
    try {
        const response = await axios.get(`${base_url}blog-category/${id}`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const updateBlogCategory = async(blogcat) => {
    const {id,blogcatData} = blogcat; 
    try {
        const response = await axios.patch(`${base_url}blog-category/${id}`,blogcatData,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const deleteBlogCategory = async(id) => {
    try {
        const response = await axios.delete(`${base_url}blog-category/${id}`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

export const blogcatService = {
    getAllBlogCategories,
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    getBlogCategory
}