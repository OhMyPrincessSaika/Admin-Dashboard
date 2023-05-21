import axios from 'axios';
import { base_url } from '../../utils/base_url';
const getAllUsers = async() => {
    console.log('get all users')
    const response = await axios.get(`${base_url}admin/users`);
    console.log(response);
    return response;
}

export const customerService = {
    getAllUsers
}

