import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axios_headers';
const getEnquiries = async() => {
    try {
        const response = await axios.get(`${base_url}enquiry`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
const createEnquiry = async(data) => {
    try {
        const response = await axios.create(`${base_url}enquiry`,data,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
const getEnquiry = async(id) => {
    try {
        const response = await axios.get(`${base_url}enquiry/${id}`,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
const updateEnquiry = async(props) => {
    const {id,enquiryData} = props;   
    try {
        const response = await axios.patch(`${base_url}enquiry/${id}`,enquiryData,config)
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
const deleteEnquiry = async(id) => {
    try {
        const response = await axios.delete(`${base_url}enquiry/${id}`,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
export const enquiryService = {
    getEnquiries,
    getEnquiry,
    updateEnquiry,
    createEnquiry,
    deleteEnquiry
}