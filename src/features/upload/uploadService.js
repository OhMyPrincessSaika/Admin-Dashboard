import axios from 'axios';
import { base_url } from '../../utils/base_url';
import {config} from '../../utils/axios_headers';
const uploadImages = async(data) => {
    try{
        const response = await axios.post(`http://localhost:5000/upload/uploadImages`,data,
        {headers : {
            Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjI0ZmExNmRkOWRlMTMyZTExZThkNSIsImlhdCI6MTY4MTU0ODgwMywiZXhwIjoxNjgxODA4MDAzfQ.dlImkQQwKbg_fCWEdjNBuKqKUTgf2MpiQXu_w3kGdic`,
            Accept : 'application/json'
        }}
        );
        return response.data;
    }catch(err) {
        console.log(err)
    }
}
const deleteImages = async(id) => {
    try {
        console.log('reached here')
        const response = await axios.delete(`${base_url}upload/delete-img/${id}`,config)
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

export const uploadService= {
    uploadImages,
    deleteImages
}