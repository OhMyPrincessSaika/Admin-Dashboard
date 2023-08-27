import axios from 'axios';
import { base_url } from '../../utils/base_url';

const login = async(userData) => {
    try {
        //TODO: change dynamic url
        const response = await axios.post(`http://localhost:5000/admin-login`,userData);
        localStorage.setItem('admin',JSON.stringify(response.data));
        return response.data;
    }catch(err) {
        console.log(err);
        throw new Error('Password is incorrect!Try Again')
    }
}

const register = async(data) => {
    try {
        const response = await axios.post(`http://localhost:5000/admin-register`,data);
        localStorage.setItem('admin',JSON.stringify(response.data));
        return response.data;
    }catch(err) {
        console.log(err);
        throw new Error('Error');
    }
}

const authService = {
    login,
    register
}

export default authService;