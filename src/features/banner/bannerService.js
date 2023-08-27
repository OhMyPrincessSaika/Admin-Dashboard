import axios from 'axios';


 const createBanner = async(data) => {
    console.log(data);
    const response = await axios.post('http://localhost:5000/banner',data);
    return response.data;
}

 const getAllBanners = async() =>  {
    const response = await axios.get('http://localhost:5000/banner');
    return response.data;
}

const getBanner = async(id) => {
    const response = await axios.get(`http://localhost:5000/banner/${id}`);
    return response.data;
}

 const updateBanner = async(props) => {
    const {id,data} = props;
    alert(JSON.stringify(data));
    try { 
        const response = await axios.patch(`http://localhost:5000/banner/${id}`,data);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

 const deleteBanner = async(id) => {
    const response = await axios.delete(`http://localhost:5000/banner/${id}`);
    return response.data;
}

export const bannerService = {createBanner,getBanner,getAllBanners,updateBanner,deleteBanner}