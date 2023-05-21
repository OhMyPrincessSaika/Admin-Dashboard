import axios  from 'axios';
import { base_url } from '../../utils/base_url';
import {config} from '../../utils/axios_headers';
const getAllColors = async() => {
    const response = await axios.get(`${base_url}color`);
    return response.data;
}
const createColor = async(color) => {
    try {
        const response = await axios.post(`${base_url}color`,color,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
    
}
const getColor = async(id) => {
    try {
        const response = await axios.get(`${base_url}color/${id}`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const updateColor = async(color) => {
    const {id,colorData} = color; 
    try {
        const response = await axios.patch(`${base_url}color/${id}`,colorData,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const deleteColor = async(id) => {
    try {
        const response = await axios.delete(`${base_url}color/${id}`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
export const colorService = { 
    getAllColors,
    createColor,
    getColor,
    updateColor,
    deleteColor
}