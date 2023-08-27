import axios from 'axios';

const createBannerCat = async(data) => {
    //TODO:to change dynamic url
    const createdBanner = await axios.post('http://localhost:5000/bannercategory',data);
    return createdBanner.data;
}

const getBannerCats = async() => {
    const bannerCats = await axios.get('http://localhost:5000/bannercategory');
    return bannerCats.data;
}

const updateBannerCat = async(props) => {
    const {id,data} = props;
    const updatedBannerCart = await axios.patch(`http://localhost:5000/bannercategory/${id}`,data); 
    return updatedBannerCart.data;
}

const getBannerCat = async(id) => {
    try {
        alert('arrived service')
        const banner = await axios.get(`http://localhost:5000/bannercategory/${id}`);
        return banner.data;
    }catch(err) {   
        console.log(err);
    }
} 
const deleteBannerCat = async(id) => {
    const deletedBanner = await axios.delete(`http://localhost:5000/bannercategory/${id}`);
    return deletedBanner.data;
}

export const bannerCatService = {createBannerCat,getBannerCat,getBannerCats,deleteBannerCat,updateBannerCat};