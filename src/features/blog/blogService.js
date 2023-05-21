import axios from 'axios';
import {base_url} from '../../utils/base_url';
import { config } from '../../utils/axios_headers';

const getAllBlogs = async() => {
    try {
        const response = await axios.get(`${base_url}blog`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const createBlog = async(blog) => {
    try {
        const response = await axios.post(`${base_url}blog`,blog);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
const getBlog = async(id) => {
    try {
        const response = await axios.get(`${base_url}blog/${id}`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const updateBlog = async(props) => {
    const {id,blogData} = props;
    try {
        const response = await axios.patch(`${base_url}blog/${id}`,blogData,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const deleteBlog = async(id) => {
    try {
        const response = await axios.delete(`${base_url}blog/${id}`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
export const blogService = {
    createBlog,
    getAllBlogs,
    updateBlog,
    getBlog,
    deleteBlog
}