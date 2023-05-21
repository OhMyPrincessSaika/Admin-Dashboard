import axios from 'axios';
import { base_url } from '../../utils/base_url';

const login = async(userData) => {
    try {
        const response = await axios.post(`${base_url}login`,userData);
        localStorage.setItem('user',JSON.stringify(response.data));
        return response.data;
    }catch(err) {
        console.log(err);
        throw new Error('Password is incorrect!Try Again')
    }
}


const authService = {
    login,
}

export default authService;