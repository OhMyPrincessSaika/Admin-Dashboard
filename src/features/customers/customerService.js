import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_headers';
const getAllUsers = async() => {
    console.log('get all users')
    console.log(config);
    const response = await axios.get(`${base_url}admin/users`,config);
    console.log(response.data);
    return response.data;
}

export const customerService = {
    getAllUsers
}

